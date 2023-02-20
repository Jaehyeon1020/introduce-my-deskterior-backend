import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/custom-decorators/get-user.decorator';
import { User } from 'src/users/user.entity';
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

  /** 데스크테리어 글 상세보기 */
  @Get('/:id')
  findOneById(@Param('id', ParseIntPipe) id: number): Promise<Deskterior> {
    return this.deskteriorService.findOneById(id);
  }

  /** 데스크테리어 글 작성(로그인 필요) */
  @UseInterceptors(FilesInterceptor('image'))
  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() deskteriorDto: DeskteriorDto,
    @UploadedFiles() file: Array<Express.Multer.File>,
    @GetUser() user: User,
  ): Promise<Deskterior> {
    return this.deskteriorService.createBoard(deskteriorDto, file, user);
  }

  /** 데스크테리어 글 삭제(로그인 필요 -> 작성자와 접속 유저가 일치해야 함) */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void | { message: string }> {
    return this.deskteriorService.deleteBoardById(id, user);
  }

  /** 데스크테리어 글 수정(로그인 필요 -> 작성자와 접속 유저가 일치해야 함) */
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  updateBoardById(
    @Param('id', ParseIntPipe) id: number,
    @Body('description') newDescription: string,
    @GetUser() user: User,
  ): Promise<Deskterior | { message: string }> {
    return this.deskteriorService.updateBoardById(id, newDescription, user);
  }
}
