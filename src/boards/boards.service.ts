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

  /* 데스크테리어 게시판 모든 글 가져오기 */
  getAllDeskPosts() {
    return this.deskteriorPosts;
  }

  /* 꿀템 추천 게시판 모든 글 가져오기 */
  getAllHoneyItemPosts() {
    return this.honeyItemPosts;
  }

  /* 질문 게시판 모든 글 가져오기 */
  getAllQuestionPosts() {
    return this.questionPosts;
  }
}
