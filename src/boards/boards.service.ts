import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private deskPosts: object[] = [
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

  getAllDeskPosts() {
    return this.deskPosts;
  }
}
