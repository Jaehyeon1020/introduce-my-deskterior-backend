import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Question } from './question.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    MulterModule.register({
      limits: {
        fileSize: 52428800,
      },
      fileFilter: (req, file, cb) => {
        const ext = file.mimetype;
        if (
          ext === 'image/jpeg' ||
          ext === 'image/jpg' ||
          ext === 'image/png'
        ) {
          return cb(null, true);
        }
        return cb(null, false);
      },
    }),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
