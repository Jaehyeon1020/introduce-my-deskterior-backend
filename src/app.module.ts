import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoneyitemsModule } from './honeyitems/honeyitems.module';
import { QuestionsModule } from './questions/questions.module';
import { DeskteriorsModule } from './deskteriors/deskteriors.module';
import { Deskterior } from './deskteriors/deskterior.entity';
import { HoneyItem } from './honeyitems/honeyitem.entity';
import { Question } from './questions/question.entity';
import { User } from './users/user.entity';
import { APP_PIPE } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    DeskteriorsModule,
    HoneyitemsModule,
    QuestionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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
