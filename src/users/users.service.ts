import { Question } from 'src/questions/question.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Deskterior } from 'src/deskteriors/deskterior.entity';
import { HoneyItem } from 'src/honeyitems/honeyitem.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Deskterior)
    private deskteriorRepository: Repository<Deskterior>,
    @InjectRepository(HoneyItem)
    private honeyItemRepository: Repository<HoneyItem>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  /** (테스트용) 모든 유저 정보 조회 */
  async getAllUsers() {
    return await this.userRepository.find();
  }

  /** (테스트용) 회원 정보 조회 */
  async getUserByUsername(username: string) {
    const found = await this.userRepository.findOneBy({ username });

    if (!found) {
      return { message: '회원 정보를 찾을 수 없습니다.' };
    }

    return found;
  }

  /** 특정 유저가 작성한 모든 글 조회 */
  async getAllBoardsByUser(username: string) {
    const found = await this.userRepository.findOneBy({ username });

    if (!found) {
      return { message: '존재하지 않는 유저입니다.' };
    }

    return {
      deskteriorBoards: found.deskteriorBoards,
      honeyItemBoards: found.honeyItemBoards,
      questionBoards: found.questionBoards,
    };
  }

  /** 회원 정보 수정(비밀번호 수정) */
  async updateUserPassword(user: User, username: string, newPassword: string) {
    // 유저 자신의 정보를 수정하려고 시도하는 것이 맞는지 확인
    if (user.username !== username) {
      return { message: '권한이 없습니다.' };
    }

    // 암호화된 비밀번호 생성
    const salt = await bcrypt.genSalt();
    const saltedNewPassword = await bcrypt.hash(newPassword, salt);

    // 비밀번호 변경 후 DB에 저장
    user.password = saltedNewPassword;
    this.userRepository.save(user);

    return { message: '비밀번호가 변경되었습니다.' };
  }

  /** 회원 정보 삭제 */
  async deleteUser(user: User, username: string) {
    // 삭제 권한이 있는지 확인
    if (user.username !== username) {
      return { message: '권한이 없습니다.' };
    }

    // 회원 탈퇴 전 이 회원이 작성했던 글도 함께 삭제
    await this.deskteriorRepository.delete({ authorId: user.id });
    await this.honeyItemRepository.delete({ authorId: user.id });
    await this.questionRepository.delete({ authorId: user.id });

    // 회원 정보 삭제
    await this.userRepository.remove(user);

    return { message: '회원 탈퇴가 완료되었습니다.' };
  }
}
