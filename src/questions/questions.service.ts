import { QuestionDto } from './dto/question.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import * as AWS from 'aws-sdk';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  /** 질문 게시판 전체 글 불러오기 */
  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  /** 질문 게시판 글 상세보기 */
  async findOneById(id: number): Promise<Question> {
    const found = await this.questionRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException('존재하지 않는 글입니다.');
    }

    return found;
  }

  /** 질문 게시판 글 작성 */
  async createBoard(
    questionDto: QuestionDto,
    file: Array<Express.Multer.File>,
    user: User,
  ): Promise<Question> {
    // AWS 설정
    AWS.config.update({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const { title, description } = questionDto;
    let baseUrl = 'https://jaehyeonsnewbucket.s3.ap-northeast-2.amazonaws.com/';
    let imageUrl;
    let uploadFile;

    if (file.length > 0) {
      uploadFile = file[0];

      const newFileName = Date.now() + uploadFile.originalname;
      imageUrl = baseUrl + newFileName;

      try {
        const upload = await new AWS.S3()
          .putObject({
            Key: newFileName,
            Body: uploadFile.buffer,
            Bucket: process.env.AWS_S3_BUCKET_NAME,
          })
          .promise();
        console.log(upload);
      } catch (error) {
        console.log(error);
      }
    }

    const new_board = this.questionRepository.create({
      title,
      description,
      image: imageUrl,
      user,
      authorId: user.id,
      authorName: user.username,
    });

    await this.questionRepository.save(new_board);
    return new_board;
  }

  /** 질문 게시판 글 삭제 */
  async deleteBoardById(id: number, user: User): Promise<void> {
    const found = await this.findOneById(id);

    if (found.authorId === user.id) {
      await this.questionRepository.delete({ id });
    } else {
      throw new UnauthorizedException('권한이 없습니다.');
    }
  }

  /** 질문 게시판 글 수정 */
  async updateBoardById(
    id: number,
    newDescription: string,
    user: User,
  ): Promise<Question> {
    const found = await this.findOneById(id);

    if (found.authorId === user.id) {
      found.description = newDescription;
      this.questionRepository.save(found);

      return found;
    } else {
      throw new UnauthorizedException('권한이 없습니다.');
    }
  }
}
