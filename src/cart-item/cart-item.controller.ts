import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post('add')
  async addItem(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.addItem(createCartItemDto);
  }

  @Get(':id')
  async findItem(@Param('id', ParseIntPipe) id: string) {
    return this.cartItemService.findItem(+id);
  }

  @Get('all')
  async findAll() {
    return this.cartItemService.findAll();
  }

  @Patch('addQuantity/:id')
  async addQuantity(@Param('id', ParseIntPipe) id: string) {
    return this.cartItemService.addQuantity(+id);
  }

  @Patch('decrementQuantity/:id')
  async decrementQuantity(@Param('id', ParseIntPipe) id: string) {
    return this.cartItemService.decrementQuantity(+id);
  }

  @Delete('delete/:id')
  async deleteItem(@Param('id', ParseIntPipe) id: string) {
    return this.cartItemService.deleteItem(+id);
  }
}
