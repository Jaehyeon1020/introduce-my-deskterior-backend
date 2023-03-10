import { User } from 'src/users/user.entity';
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

  @Column()
  authorName: string; // 작성자 이름

  @Column()
  image: string; // 이미지 메타데이터

  @ManyToOne(() => User, (user) => user.honeyItemBoards)
  user: User; // 작성자 객체
}
