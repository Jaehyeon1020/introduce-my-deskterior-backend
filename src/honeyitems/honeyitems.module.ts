import { Module } from '@nestjs/common';
import { HoneyitemsController } from './honeyitems.controller';
import { HoneyitemsService } from './honeyitems.service';

@Module({
  controllers: [HoneyitemsController],
  providers: [HoneyitemsService]
})
export class HoneyitemsModule {}
