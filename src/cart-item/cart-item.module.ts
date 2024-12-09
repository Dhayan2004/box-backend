import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MisteryBoxesModule } from 'src/mistery-boxes/mistery-boxes.module';

@Module({
  imports: [PrismaModule, MisteryBoxesModule],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
