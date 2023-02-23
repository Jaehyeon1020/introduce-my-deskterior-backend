import { HoneyItem } from 'src/honeyitems/honeyitem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HoneyitemsController } from './honeyitems.controller';
import { HoneyitemsService } from './honeyitems.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([HoneyItem]),
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
  controllers: [HoneyitemsController],
  providers: [HoneyitemsService],
})
export class HoneyitemsModule {}
