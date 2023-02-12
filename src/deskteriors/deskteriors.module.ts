import { Module } from '@nestjs/common';
import { DeskteriorsController } from './deskteriors.controller';
import { DeskteriorsService } from './deskteriors.service';

@Module({
  controllers: [DeskteriorsController],
  providers: [DeskteriorsService]
})
export class DeskteriorsModule {}
