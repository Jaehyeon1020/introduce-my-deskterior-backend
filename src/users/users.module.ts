import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deskterior } from 'src/deskteriors/deskterior.entity';
import { HoneyItem } from 'src/honeyitems/honeyitem.entity';
import { Question } from 'src/questions/question.entity';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Deskterior, HoneyItem, Question])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
