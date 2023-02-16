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

  @OneToMany((type) => Deskterior, (deskterior) => deskterior.user, {
    eager: true,
  })
  deskteriorBoards: Deskterior[];

  @OneToMany((type) => HoneyItem, (honeyItem) => honeyItem.user, {
    eager: true,
  })
  honeyItemBoards: HoneyItem[];

  @OneToMany((type) => Question, (question) => question.user, {
    eager: true,
  })
  questionBoards: Question[];
}
