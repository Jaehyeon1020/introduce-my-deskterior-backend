import { extractExtender } from 'src/lib/extractExtender';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeskteriorDto } from 'src/deskteriors/dto/deskterior.dto';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { modifyFileNameIncludeExtender } from 'src/lib/modifyFileNameIncludeExtender';

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
    deskteriorDto: DeskteriorDto,
    file: Array<Express.Multer.File>,
    user: User,
  ): Promise<Question> {
    const { title, description } = deskteriorDto;
    let filename = '';

    if (file.length > 0) {
      const uploadFile = file[0];
      const extender = extractExtender(uploadFile.mimetype);
      modifyFileNameIncludeExtender(uploadFile.filename, extender);

      filename = uploadFile.filename + '.' + extender;
    }

    const new_board = this.questionRepository.create({
      title,
      description,
      image: filename,
      user,
      authorId: user.id,
    });

    await this.questionRepository.save(new_board);
    return new_board;
  }

  /** 질문 게시판 글 삭제 */
  async deleteBoardById(
    id: number,
    user: User,
  ): Promise<void | { message: string }> {
    const found = await this.findOneById(id);

    if (found.authorId === user.id) {
      await this.questionRepository.delete({ id });
    } else {
      return { message: '권한이 없습니다.' };
    }
  }

  /** 질문 게시판 글 수정 */
  async updateBoardById(
    id: number,
    newDescription: string,
    user: User,
  ): Promise<Question | { message: string }> {
    const found = await this.findOneById(id);

    if (found.authorId === user.id) {
      found.description = newDescription;
      this.questionRepository.save(found);

      return found;
    } else {
      return { message: '권한이 없습니다.' };
    }
  }
}
