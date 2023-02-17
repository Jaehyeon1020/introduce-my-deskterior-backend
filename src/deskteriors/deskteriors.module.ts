import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Deskterior } from './deskterior.entity';
import { DeskteriorsController } from './deskteriors.controller';
import { DeskteriorsService } from './deskteriors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Deskterior])],
  controllers: [DeskteriorsController],
  providers: [DeskteriorsService],
})
export class DeskteriorsModule {}
