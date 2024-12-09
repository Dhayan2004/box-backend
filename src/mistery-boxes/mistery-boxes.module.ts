import { Module } from '@nestjs/common';
import { MisteryBoxesService } from './mistery-boxes.service';
import { MisteryBoxesController } from './mistery-boxes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MisteryBoxesController],
  providers: [MisteryBoxesService],
  exports: [MisteryBoxesService],
})
export class MisteryBoxesModule {}
