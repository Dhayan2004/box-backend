import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsNotEmpty()
  family_name: string;

  @IsNotEmpty()
  @IsString()
  given_name: string;

  @IsOptional()
  @IsString()
  picture: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  verified_email: boolean;

  @IsNotEmpty()
  @IsString()
  password: string;
}
