import { BoardsService } from './boards.service';
import { Controller, Get } from '@nestjs/common';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  /* 데스크테리어 게시글 모두 불러오기 */
  @Get('/showmethedesk')
  getAllDeskPosts() {
    return this.boardsService.getAllDeskPosts();
  }

  /* 꿀템 추천 게시글 모두 불러오기 */
  @Get('/recommenditems')
  getAllHoneyItemPosts() {
    return this.boardsService.getAllHoneyItemPosts();
  }

  /* 질문 게시글 모두 불러오기 */
  @Get('/questions')
  getAllQuestionPosts() {
    return this.boardsService.getAllQuestionPosts();
  }
}
