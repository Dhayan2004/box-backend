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
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post('create')
  async createRestaurant(@Body() restaurant: CreateRestaurantDto) {
    return this.restaurantsService.createRestaurant(restaurant);
  }

  @Get('all')
  async findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  async findRestaurant(@Param('id', ParseIntPipe) id: string) {
    return this.restaurantsService.findRestaurant(+id);
  }

  @Patch('update/:id')
  async updateRestaurant(
    @Param('id', ParseIntPipe) id: string,
    @Body() restaurant: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.updateRestaurant(+id, restaurant);
  }

  @Delete('delete/:id')
  async deleteRestaurant(@Param('id', ParseIntPipe) id: string) {
    return this.restaurantsService.deleteRestaurant(+id);
  }
}
