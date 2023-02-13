import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /** 회원가입 */
  @Post('/signup')
  signup(@Body(ValidationPipe) userDto: CreateUserDto) {
    return this.authService.createUser(userDto);
  }

  /** 로그인 */
  @Post('/signin')
  signin(@Body(ValidationPipe) userDto: CreateUserDto) {}
}
