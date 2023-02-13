import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호에 영문 알파벳과 숫자만 사용이 가능합니다.',
  })
  password: string;
}
