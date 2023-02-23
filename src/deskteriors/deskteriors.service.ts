import { DeskteriorDto } from './dto/deskterior.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deskterior } from './deskterior.entity';
import { User } from 'src/users/user.entity';
import * as AWS from 'aws-sdk';

@Injectable()
export class DeskteriorsService {
  constructor(
    @InjectRepository(Deskterior)
    private deskteriorRepository: Repository<Deskterior>,
  ) {}

  /** 데스크테리어 글 전체 불러오기 */
  async findAll(): Promise<Deskterior[]> {
    return await this.deskteriorRepository.find();
  }

  /** 데스크테리어 글 상세보기 */
  async findOneById(id: number): Promise<Deskterior> {
    const found = await this.deskteriorRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException('존재하지 않는 글입니다.');
    }

    return found;
  }

  /** 데스크테리어 글 작성 */
  async createBoard(
    deskteriorDto: DeskteriorDto,
    file: Array<Express.Multer.File>,
    user: User,
  ) {
    // AWS 설정
    AWS.config.update({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const { title, description } = deskteriorDto;
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

    const new_board = this.deskteriorRepository.create({
      title,
      description,
      image: imageUrl,
      user,
      authorId: user.id,
    });

    await this.deskteriorRepository.save(new_board);
    return new_board;
  }

  /** 데스크테리어 글 삭제 */
  async deleteBoardById(
    id: number,
    user: User,
  ): Promise<void | { message: string }> {
    const found = await this.findOneById(id);

    if (found.authorId === user.id) {
      await this.deskteriorRepository.delete({ id });
    } else {
      return { message: '권한이 없습니다.' };
    }
  }

  /** 데스크테리어 글 수정 */
  async updateBoardById(
    id: number,
    newDescription: string,
    user: User,
  ): Promise<Deskterior | { message: string }> {
    const found = await this.findOneById(id);

    if (found.authorId === user.id) {
      found.description = newDescription;
      this.deskteriorRepository.save(found);

      return found;
    } else {
      return { message: '권한이 없습니다.' };
    }
  }
}
