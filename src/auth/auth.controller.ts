import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /** 회원가입 */
  @Post('/signup')
  signup(@Body() userDto: CreateUserDto) {
    return this.authService.createUser(userDto);
  }

  /** 로그인 */
  @Post('/signin')
  signin(@Res() res: Response, @Body() userDto: CreateUserDto) {
    return this.authService.login(res, userDto);
  }

  /** 로그아웃 */
  @Post('/logout')
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }

  /** 로그인 여부 체크 */
  @UseGuards(AuthGuard('jwt'))
  @Get('/logincheck')
  loginCheck() {
    return { status: true };
  }
}
