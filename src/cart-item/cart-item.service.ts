import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartItem } from '@prisma/client';
import { MisteryBoxesService } from 'src/mistery-boxes/mistery-boxes.service';

@Injectable()
export class CartItemService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly box: MisteryBoxesService,
  ) {}
  async addItem(item: CreateCartItemDto) {
    try {
      return this.prisma.cartItem.create({ data: { ...item } });
    } catch (e) {
      throw new InternalServerErrorException('ERROR_INNESPERADO', e);
    }
  }

  async findItem(id: number): Promise<CartItem> {
    try {
      const item = await this.prisma.cartItem.findUnique({
        where: { id },
        include: {
          cart: true,
          misteryBox: true,
        },
      });
      if (!item) {
        throw new NotFoundException('ITEM_NOT_FOUND');
      }
      return item;
    } catch (e) {
      throw new InternalServerErrorException('ITEM_NOT_FOUND', e);
    }
  }

  async findAll(): Promise<CartItem[]> {
    try {
      return this.prisma.cartItem.findMany({
        include: {
          cart: true,
          misteryBox: true,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException('ERROR_INNESPERADO', e);
    }
  }

  async addQuantity(id: number): Promise<CartItem> {
    try {
      const item = await this.findItem(id);
      if (!item) {
        throw new NotFoundException('ITEM_NOT_FOUND');
      }
      const { misteryBoxId } = item;
      const misteryBox = await this.box.findBox(misteryBoxId);
      const { quantity } = item;
      if (quantity <= misteryBox.stock) {
        return this.prisma.cartItem.update({
          where: { id },
          data: {
            quantity: { increment: 1 },
          },
        });
      }
    } catch (e) {
      throw new InternalServerErrorException('ERROR_INNESPERADO', e);
    }
  }

  async decrementQuantity(id: number): Promise<CartItem> {
    try {
      const item = await this.findItem(id);
      if (!item) {
        throw new NotFoundException('ITEM_NOT_FOUND');
      }
      if (item.quantity >= 1) {
        return this.prisma.cartItem.update({
          where: { id },
          data: {
            quantity: { decrement: 1 },
          },
        });
      }
    } catch (e) {
      throw new InternalServerErrorException('ERROR_INNESPERADO', e);
    }
  }

  async deleteItem(id: number): Promise<void> {
    try {
      const findItem = await this.findItem(id);
      if (!findItem) {
        throw new NotFoundException('ITEM_NOT_FOUND');
      }
      await this.prisma.cartItem.delete({ where: { id } });
    } catch (e) {
      throw new InternalServerErrorException('ERROR_INNESPERADO', e);
    }
  }
}
