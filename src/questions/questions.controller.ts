import { QuestionDto } from './dto/question.dto';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { QuestionsService } from './questions.service';
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
import { Question } from './question.entity';
import { GetUser } from 'src/custom-decorators/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  /** 질문 게시판 글 전체 불러오기 */
  @Get('/')
  findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  /** 질문 게시판 글 상세보기 */
  @Get('/:id')
  findOneById(@Param('id', ParseIntPipe) id: number): Promise<Question> {
    return this.questionService.findOneById(id);
  }

  /** 질문 게시판 글 작성(로그인 필요) */
  @UseInterceptors(FilesInterceptor('image'))
  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() questionDto: QuestionDto,
    @UploadedFiles() file: Array<Express.Multer.File>,
    @GetUser() user: User,
  ): Promise<Question> {
    return this.questionService.createBoard(questionDto, file, user);
  }

  /** 질문 게시판 글 삭제(로그인 필요) */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void | { message: string }> {
    return this.questionService.deleteBoardById(id, user);
  }

  /** 질문 게시판 글 수정(로그인 필요) */
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  updateBoardById(
    @Param('id', ParseIntPipe) id: number,
    @Body('description') newDescription: string,
    @GetUser() user: User,
  ) {
    return this.questionService.updateBoardById(id, newDescription, user);
  }
}
