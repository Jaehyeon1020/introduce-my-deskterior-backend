import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number; // 게시글 id

  @CreateDateColumn()
  createdAt: Date; // 게시글 생성 시각

  @Column()
  title: string; // 게시글 제목

  @Column('longtext')
  description: string; // 게시글 내용
}
