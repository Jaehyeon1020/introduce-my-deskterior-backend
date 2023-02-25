import { HoneyItemDto } from './dto/honeyitem.dto';
import { HoneyItem } from 'src/honeyitems/honeyitem.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import * as AWS from 'aws-sdk';

@Injectable()
export class HoneyitemsService {
  constructor(
    @InjectRepository(HoneyItem)
    private honeyItemRepository: Repository<HoneyItem>,
  ) {}

  /** 꿀템 게시판 글 전체 불러오기 */
  async findAll(): Promise<HoneyItem[]> {
    return await this.honeyItemRepository.find();
  }

  /** 꿀템 게시판 글 상세보기 */
  async findOneById(id: number): Promise<HoneyItem> {
    const found = await this.honeyItemRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException('존재하지 않는 글입니다.');
    }

    return found;
  }

  /** 꿀템 게시판 글 작성 */
  async createBoard(
    honeyItemDto: HoneyItemDto,
    file: Array<Express.Multer.File>,
    user: User,
  ): Promise<HoneyItem> {
    // AWS 설정
    AWS.config.update({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const { title, description } = honeyItemDto;
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

    const new_board = this.honeyItemRepository.create({
      title,
      description,
      image: imageUrl,
      user,
      authorId: user.id,
      authorName: user.username,
    });

    await this.honeyItemRepository.save(new_board);
    return new_board;
  }

  /** 꿀템 추천 게시판 글 삭제 */
  async deleteBoardById(id: number, user: User): Promise<void> {
    const found = await this.findOneById(id);

    if (found.authorId === user.id) {
      await this.honeyItemRepository.delete({ id });
    } else {
      throw new UnauthorizedException('권한이 없습니다.');
    }
  }

  /** 꿀템 추천 게시판 글 수정 */
  async updateBoardById(
    id: number,
    newDescription: string,
    user: User,
  ): Promise<HoneyItem> {
    const found = await this.findOneById(id);

    if (found.authorId === user.id) {
      found.description = newDescription;
      this.honeyItemRepository.save(found);

      return found;
    } else {
      throw new UnauthorizedException('권한이 없습니다.');
    }
  }
}
