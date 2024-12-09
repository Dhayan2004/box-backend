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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('all')
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findUser(+id);
  }

  @Patch('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: string,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUser(+id, user);
  }

  @Delete('delete/:id')
  async removeUser(@Param('id', ParseIntPipe) id: string) {
    return this.userService.removeUser(+id);
  }
}
