import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /** 새로운 user 생성 */
  async createUser(userData: CreateUserDto) {
    const { username, password } = userData;

    // 아이디 중복되는 경우
    if (await this.userRepository.findOneBy({ username })) {
      return { message: '이미 존재하는 아이디입니다.' };
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      this.userRepository.save(newUser);
      return { message: `${newUser.username}님 회원가입을 축하드립니다!` };
    } catch (err) {
      return {
        message: '알 수 없는 에러가 발생하였습니다. 다시 시도해주세요.',
      };
    }
  }

  /** 로그인 */
  async login(res: Response, userData: CreateUserDto) {
    const { username, password } = userData;
    const checkingUser = await this.userRepository.findOneBy({ username });

    if (
      checkingUser &&
      (await bcrypt.compare(password, (await checkingUser).password))
    ) {
      const payload = { username }; // username을 담는 payload 생성
      const accessToken = this.jwtService.sign(payload); // payload를 담는 jwt token 발행

      res.cookie('jwt', accessToken);
      return res.send({ message: '로그인 성공' });
    } else {
      return res.send({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
    }
  }

  /** 로그아웃 */
  async logout(res: Response) {
    res.cookie('jwt', null, {
      maxAge: 0,
    });

    res.send({ message: '로그아웃 성공' });
  }
}
