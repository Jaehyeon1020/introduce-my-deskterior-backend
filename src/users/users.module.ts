import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deskterior } from 'src/deskteriors/deskterior.entity';
import { DeskteriorsModule } from 'src/deskteriors/deskteriors.module';
import { DeskteriorsService } from 'src/deskteriors/deskteriors.service';
import { HoneyItem } from 'src/honeyitems/honeyitem.entity';
import { HoneyitemsModule } from 'src/honeyitems/honeyitems.module';
import { HoneyitemsService } from 'src/honeyitems/honeyitems.service';
import { Question } from 'src/questions/question.entity';
import { QuestionsModule } from 'src/questions/questions.module';
import { QuestionsService } from 'src/questions/questions.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Deskterior, HoneyItem, Question]),
    DeskteriorsModule,
    HoneyitemsModule,
    QuestionsModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    DeskteriorsService,
    HoneyitemsService,
    QuestionsService,
  ],
})
export class UsersModule {}
