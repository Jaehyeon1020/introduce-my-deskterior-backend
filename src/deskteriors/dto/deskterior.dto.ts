import { IsNotEmpty } from 'class-validator';

/**
 * 데스크테리어 게시판 생성할 때 받을 DTO
 * 글 제목, 글 내용, 이미지 받음
 */
export class DeskteriorDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
