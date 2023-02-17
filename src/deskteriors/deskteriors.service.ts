import { DeskteriorDto } from './dto/deskterior.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deskterior } from './deskterior.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class DeskteriorsService {
  constructor(
    @InjectRepository(Deskterior)
    private deskteriorRepository: Repository<Deskterior>,
  ) {}

  /** 데스크테리어 글 전체 불러오기 */
  findAll(): Promise<Deskterior[]> {
    return this.deskteriorRepository.find();
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
    user: User,
  ): Promise<Deskterior> {
    const { title, description } = deskteriorDto;

    const new_board = this.deskteriorRepository.create({
      title,
      description,
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
