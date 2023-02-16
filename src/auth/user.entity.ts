import { Deskterior } from './../deskteriors/deskterior.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { HoneyItem } from 'src/honeyitems/honeyitem.entity';
import { Question } from 'src/questions/question.entity';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Deskterior, (deskterior) => deskterior.user)
  deskteriorBoards: Deskterior[];

  @OneToMany(() => HoneyItem, (honeyItem) => honeyItem.user)
  honeyItemBoards: HoneyItem[];

  @OneToMany(() => Question, (question) => question.user)
  questionBoards: Question[];
}
