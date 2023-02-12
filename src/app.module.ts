import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoneyitemsModule } from './honeyitems/honeyitems.module';
import { QuestionsModule } from './questions/questions.module';
import { DeskteriorsModule } from './deskteriors/deskteriors.module';
import { Deskterior } from './deskteriors/deskterior.entity';
import { HoneyItem } from './honeyitems/honeyitem.entity';
import { Question } from './questions/question.entity';

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
      entities: [Deskterior, HoneyItem, Question],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
