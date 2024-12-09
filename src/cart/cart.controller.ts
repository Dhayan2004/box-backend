import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('create')
  async create(@Body() cart: CreateCartDto) {
    return this.cartService.create(cart);
  }

  @Get(':userId')
  async getCart(@Param('userId', ParseIntPipe) id: string) {
    return this.cartService.getCart(+id);
  }
}
