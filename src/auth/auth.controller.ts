import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /** 회원가입 */
  @Post('/')
  signup(@Body() userDto: CreateUserDto) {
    return this.authService.create(userDto); // 고쳐야됨
  }
}
