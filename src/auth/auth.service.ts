import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
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

  /** 새로운 user 생성 */
  async createUser(userData: CreateUserDto) {
    const { username, password } = userData;

    // 아이디 중복되는 경우
    if (this.userRepository.findOneBy({ username })) {
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
}
