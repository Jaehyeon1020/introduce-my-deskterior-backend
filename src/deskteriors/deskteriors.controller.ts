import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Deskterior } from './deskterior.entity';
import { DeskteriorsService } from './deskteriors.service';
import { DeskteriorDto } from './dto/deskterior.dto';

@Controller('deskteriors')
export class DeskteriorsController {
  constructor(private deskteriorService: DeskteriorsService) {}

  /** 데스크테리어 글 전체 불러오기 */
  @Get('/')
  findAll(): Promise<Deskterior[]> {
    return this.deskteriorService.findAll();
  }

  /** 데스크테리어 글 작성 */
  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() deskteriorDto: DeskteriorDto): Promise<Deskterior> {
    return this.deskteriorService.createBoard(deskteriorDto);
  }

  /** 데스크테리어 글 삭제 */
  @Delete('/:postId')
  deleteBoardById(@Param('id', ParseIntPipe) id: number) {
    return this.deskteriorService.deleteBoardById(id);
  }
}
