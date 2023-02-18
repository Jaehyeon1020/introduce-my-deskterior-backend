import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/custom-decorators/get-user.decorator';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  /** (테스트용) 모든 유저 정보 조회 */
  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  /** (테스트용) 회원 정보 조회 */
  @Get('/:username')
  getUserByUsername(@Param('username') username: string) {}

  /** 특정 유저가 작성한 모든 글 조회 */
  @Get('/:username/boards')
  getAllBoardsByUser(@Param('username') username: string) {
    return this.userService.getAllBoardsByUser(username);
  }

  /** 회원 정보 수정 (비밀번호 수정) */
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:username')
  updateUserPassword(
    @GetUser() user: User,
    @Param('username') username: string,
    @Body('password') newPassword: string,
  ) {
    return this.userService.updateUserPassword(user, username, newPassword);
  }

  /** 회원 정보 삭제 (회원 탈퇴) */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:username')
  deleteUser(@GetUser() user: User, @Param('username') username: string) {
    return this.userService.deleteUser(user, username);
  }
}
