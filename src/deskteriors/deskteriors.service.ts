import { DeskteriorDto } from './dto/deskterior.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deskterior } from './deskterior.entity';

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

  /** 데스크테리어 글 작성 */
  async createBoard(deskteriorDto: DeskteriorDto): Promise<Deskterior> {
    const { title, description } = deskteriorDto;

    const new_board = this.deskteriorRepository.create({
      title,
      description,
    });

    await this.deskteriorRepository.save(new_board);
    return new_board;
  }
}
