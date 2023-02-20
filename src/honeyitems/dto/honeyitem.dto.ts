import { IsNotEmpty } from 'class-validator';

/**
 * 꿀템 추천 게시판 생성 시 받을 dto
 */
export class HoneyItemDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
