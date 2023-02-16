import { User } from 'src/auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class HoneyItem {
  @PrimaryGeneratedColumn()
  id: number; // 게시글 id

  @CreateDateColumn()
  createdAt: Date; // 게시글 생성 시각

  @Column()
  title: string; // 게시글 제목

  @Column('longtext')
  description: string; // 게시글 내용

  @Column()
  authorId: number; // 작성자(user의 id)

  @ManyToOne(() => User, (user) => user.honeyItemBoards)
  user: User; // 작성자 객체
}
