import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private deskteriorPosts: object[] = [
    {
      id: 1,
      username: 'user1',
      pic: 'picture1',
    },
    {
      id: 2,
      username: 'user2',
      pic: 'picture2',
    },
    {
      id: 3,
      username: 'user3',
      pic: 'picture3',
    },
  ];

  private honeyItemPosts: object[] = [
    {
      id: 1,
      username: 'user1',
      description: 'honey1',
    },
    {
      id: 2,
      username: 'user2',
      description: 'honey2',
    },
    {
      id: 3,
      username: 'user3',
      description: 'honey3',
    },
  ];

  private questionPosts: object[] = [
    {
      id: 1,
      username: 'user1',
      description: 'question1',
    },
    {
      id: 2,
      username: 'user2',
      description: 'question2',
    },
    {
      id: 3,
      username: 'user3',
      description: 'question3',
    },
  ];

  /* ****************** 데스크테리어 게시판 ****************** */
  /** 데스크테리어 게시판 모든 글 가져오기 */
  getAllDeskPosts() {
    return this.deskteriorPosts;
  }

  /** 데스크테리어 게시판 글 생성 */
  createDeskPost() {
    return '데스크테리어 게시판 글 생성';
  }

  /** 데스크테리어 게시판 글 상세보기 */
  getDeskPostById() {
    return '데스크테리어 게시판 글 상세보기';
  }

  /** 데스크테리어 게시판 글 수정 */
  patchDeskPostById() {
    return '데스크테리어 게시판 글 수정';
  }

  /** 데스크테리어 게시판 글 삭제 */
  deleteDeskPostById() {
    return '데스크테리어 게시판 글 삭제';
  }
  /* ****************** 데스크테리어 게시판 ****************** */

  /* ****************** 꿀템 추천 게시판 ****************** */
  /** 꿀템 추천 게시판 모든 글 가져오기 */
  getAllHoneyItemPosts() {
    return this.honeyItemPosts;
  }

  /** 꿀템 추천 게시판 글 생성 */
  createHoneyItemPost() {
    return '꿀템 추천 게시판 글 생성';
  }

  /** 꿀템 추천 게시판 글 상세보기 */
  getHoneyItemPostById() {
    return '꿀템 추천 게시판 글 상세보기';
  }

  /** 꿀템 추천 게시판 글 수정 */
  patchHoneyItemPostById() {
    return '꿀템 추천 게시판 글 수정';
  }

  /** 꿀템 추천 게시판 글 삭제 */
  deleteHoneyItemPostById() {
    return '꿀템 추천 게시판 글 삭제';
  }
  /* ****************** 꿀템 추천 게시판 ****************** */

  /* ****************** 질문 게시판 ****************** */
  /** 질문 게시판 모든 글 가져오기 */
  getAllQuestionPosts() {
    return this.questionPosts;
  }

  /** 질문 게시판 글 생성 */
  createQuestionPost() {
    return '질문 게시판 글 생성';
  }

  /** 질문 게시판 글 상세보기 */
  getQuestionPostById() {
    return '질문 게시판 글 상세보기';
  }

  /** 질문 게시판 글 수정 */
  patchQuestionPostById() {
    return '질문 게시판 글 수정';
  }

  /** 질문 게시판 글 삭제 */
  deleteQuestionPostById() {
    return '질문 게시판 글 삭제';
  }
  /* ****************** 질문 게시판 ****************** */
}
