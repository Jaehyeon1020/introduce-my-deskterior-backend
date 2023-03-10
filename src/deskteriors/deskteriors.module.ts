import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deskterior } from './deskterior.entity';
import { DeskteriorsController } from './deskteriors.controller';
import { DeskteriorsService } from './deskteriors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Deskterior]),
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
  controllers: [DeskteriorsController],
  providers: [DeskteriorsService],
})
export class DeskteriorsModule {}
