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
}
