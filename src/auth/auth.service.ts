import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /** (테스트용) 모든 유저 보기 */
  async getAllUsers() {
    return this.userRepository.find();
  }

  /** 새로운 user 생성 */
  async createUser(userData: CreateUserDto) {
    const { username, password } = userData;

    // 아이디 중복되는 경우
    if (await this.userRepository.findOneBy({ username })) {
      throw new ConflictException('이미 존재하는 유저입니다.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      this.userRepository.save(newUser);
    } catch (err) {
      throw new InternalServerErrorException(
        '알 수 없는 에러가 발생하였습니다.',
      );
    }
  }

  /** 로그인 */
  async login(userData: CreateUserDto) {
    const { username, password } = userData;
    const checkingUser = this.userRepository.findOneBy({ username });

    if (
      checkingUser &&
      bcrypt.compare(password, (await checkingUser).password)
    ) {
      const payload = { username }; // username을 담는 payload 생성
      const accessToken = this.jwtService.sign(payload); // payload를 담는 jwt token 발행

      return { accessToken };
    } else {
      throw new UnauthorizedException('아이디 또는 비밀번호가 틀렸습니다.');
    }
  }
}
