import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MisteryBoxesModule } from './mistery-boxes/mistery-boxes.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CartModule } from './cart/cart.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CartItemModule } from './cart-item/cart-item.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MisteryBoxesModule,
    RestaurantsModule,
    CartModule,
    PrismaModule,
    CartItemModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
