import { HoneyItemDto } from './dto/honeyitem.dto';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { HoneyitemsService } from './honeyitems.service';
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
import { HoneyItem } from './honeyitem.entity';
import { GetUser } from 'src/custom-decorators/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('honeyitems')
export class HoneyitemsController {
  constructor(private honeyitemsService: HoneyitemsService) {}

  /** 꿀템 추천 게시판 글 전체 불러오기 */
  @Get('/')
  findAll(): Promise<HoneyItem[]> {
    return this.honeyitemsService.findAll();
  }

  /** 꿀템 추천 게시판 글 상세보기 */
  @Get('/:id')
  findOneById(@Param('id', ParseIntPipe) id: number): Promise<HoneyItem> {
    return this.honeyitemsService.findOneById(id);
  }

  /** 꿀템 추천 게시판 글 작성 (로그인 필요) */
  @UseInterceptors(FilesInterceptor('image'))
  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() honeyItemDto: HoneyItemDto,
    @UploadedFiles() file: Array<Express.Multer.File>,
    @GetUser() user: User,
  ) {
    return this.honeyitemsService.createBoard(honeyItemDto, file, user);
  }

  /** 꿀템 추천 게시판 글 삭제 (로그인 필요) */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.honeyitemsService.deleteBoardById(id, user);
  }

  /** 꿀템 추천 게시판 글 수정 (로그인 필요) */
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  updateBoardById(
    @Param('id', ParseIntPipe) id: number,
    @Body('description') newDescription: string,
    @GetUser() user: User,
  ): Promise<HoneyItem> {
    return this.honeyitemsService.updateBoardById(id, newDescription, user);
  }
}
