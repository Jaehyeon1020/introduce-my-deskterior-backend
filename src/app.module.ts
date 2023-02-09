import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BoardsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
