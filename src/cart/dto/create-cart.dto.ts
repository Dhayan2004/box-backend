import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsOptional()
  @IsNumber()
  totalPrice: number;
}
