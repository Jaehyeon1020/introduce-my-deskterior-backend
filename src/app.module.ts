import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoneyitemsModule } from './honeyitems/honeyitems.module';
import { QuestionsModule } from './questions/questions.module';
import { DeskteriorsModule } from './deskteriors/deskteriors.module';
import { Deskterior } from './deskteriors/deskterior.entity';
import { HoneyItem } from './honeyitems/honeyitem.entity';
import { Question } from './questions/question.entity';
import { User } from './auth/user.entity';
import { APP_PIPE } from '@nestjs/core';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    DeskteriorsModule,
    HoneyitemsModule,
    QuestionsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'qwer1234',
      database: 'intro_my_desk',
      entities: [Deskterior, HoneyItem, Question, User],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
