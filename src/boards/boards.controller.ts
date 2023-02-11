import { BoardsService } from './boards.service';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  /* ****************** 데스크테리어 게시판 ****************** */
  /** 데스크테리어 게시글 모두 불러오기 */
  @Get('/showmethedesk')
  getAllDeskPosts() {
    return this.boardsService.getAllDeskPosts();
  }

  /** 데스크테리어 게시판 글 상세보기 */
  @Get('/showmethedesk/:postId')
  getDeskPostById() {
    return this.boardsService.getDeskPostById();
  }

  /** 데스크테리어 게시판 글 생성 */
  @Post('/showmethedesk')
  createDeskPost() {
    return this.boardsService.createDeskPost();
  }

  /** 데스크테리어 게시판 글 수정 */
  @Patch('/showmethedesk/:postId')
  patchDeskPostById() {
    return this.boardsService.patchDeskPostById();
  }

  /** 데스크테리어 게시판 글 삭제 */
  @Delete('/showmethedesk/:postId')
  deleteDeskPostById() {
    return this.boardsService.deleteDeskPostById();
  }
  /* ****************** 데스크테리어 게시판 ****************** */

  /* ****************** 꿀템 추천 게시판 ****************** */
  /** 꿀템 추천 게시글 모두 불러오기 */
  @Get('/recommenditems')
  getAllHoneyItemPosts() {
    return this.boardsService.getAllHoneyItemPosts();
  }

  /** 꿀템 추천 게시판 글 생성 */
  @Post('/recommenditems')
  createHoneyItemPost() {
    return this.boardsService.createHoneyItemPost();
  }

  /** 꿀템 추천 게시판 글 상세보기 */
  @Get('/recommenditems/:postId')
  getHoneyItemPostById() {
    return this.boardsService.getHoneyItemPostById();
  }

  /** 꿀템 추천 게시판 글 수정 */
  @Patch('/recommenditems/:postId')
  patchHoneyItemPostById() {
    return this.boardsService.patchHoneyItemPostById();
  }

  /** 꿀템 추천 게시판 글 삭제 */
  @Delete('/recommenditems/:postId')
  deleteHoneyItemPostById() {
    return this.boardsService.deleteHoneyItemPostById();
  }
  /* ****************** 데스크테리어 게시판 ****************** */

  /* ****************** 질문 게시판 ****************** */
  /** 질문 게시글 모두 불러오기 */
  @Get('/questions')
  getAllQuestionPosts() {
    return this.boardsService.getAllQuestionPosts();
  }

  /** 질문 게시판 글 생성 */
  @Post('/questions')
  createQuestionPost() {
    return this.boardsService.createQuestionPost();
  }

  /** 질문 게시판 글 상세보기 */
  @Get('/questions/:postId')
  getQuestionPostById() {
    return this.boardsService.getQuestionPostById();
  }

  /** 질문 게시판 글 수정 */
  @Patch('/questions/:postId')
  patchQuestionPostById() {
    return this.boardsService.patchQuestionPostById();
  }

  /** 질문 게시판 글 삭제 */
  @Delete('/questions/:postId')
  deleteQuestionPostById() {
    return this.boardsService.deleteDeskPostById();
  }
  /* ****************** 데스크테리어 게시판 ****************** */
}
