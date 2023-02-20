import { IsNotEmpty } from 'class-validator';

/**
 * 질문 게시판 생성할 때 받을 DTO
 * 글 제목, 글 내용, 이미지 받음
 */
export class QuestionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
