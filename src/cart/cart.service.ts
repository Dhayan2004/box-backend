import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cart } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}
  async create(cart: CreateCartDto) {
    try {
      const { userId } = cart;
      const verifyCart = await this.prisma.cart.findUnique({
        where: { userId },
      });
      if (verifyCart) {
        throw new BadRequestException('CART_ALREADY_EXIST');
      }
      return this.prisma.cart.create({ data: { ...cart } });
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException('ERROR_INNESPERADO', e);
    }
  }

  async getCart(userId: number): Promise<Cart> {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { userId },
        include: {
          user: {
            select: {
              name: true,
            },
          },
          cartItem: true,
        },
      });
      if (!cart) {
        throw new NotFoundException('CART_NOT_FOUND');
      }
      return cart;
    } catch (e) {
      throw new InternalServerErrorException('ERROR_INNESPERADO', e);
    }
  }
}
