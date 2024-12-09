import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartItemDto {
  @IsNumber()
  quantity: number;
  @IsNumber()
  totalPrice: number;
  @IsNumber()
  @IsNotEmpty()
  misteryBoxId: number;
  @IsNumber()
  @IsNotEmpty()
  cartId: number;
}
