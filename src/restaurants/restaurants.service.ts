/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaService) { }
  async createRestaurant(restaurant: CreateRestaurantDto): Promise<Restaurant> {
    try {
      return this.prisma.restaurant.create({ data: restaurant });
    } catch (e) {
      throw new InternalServerErrorException('UNEXPECTED_ERROR', e);
    }
  }

  async findAll(): Promise<Restaurant[]> {
    try {
      return this.prisma.restaurant.findMany({
        include: {
          misteryBox: true,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException('UNEXPECTED_ERROR', e);
    }
  }

  async findRestaurant(id: number): Promise<Restaurant> {
    try {
      const findRestaurant = await this.prisma.restaurant.findUnique({
        where: { id }, include: {
          misteryBox: true,
        }
      });

      if (!findRestaurant) {
        throw new NotFoundException('RESTAURANT_NOT_FOUND')
      }
      return findRestaurant;
    } catch (e) {
      throw new InternalServerErrorException('UNEXPECTED_ERROR', e);
    }
  }

  async updateRestaurant(
    id: number,
    restaurant: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    try {
      const findRestaurant = await this.prisma.restaurant.findUnique({ where: { id } });
      if (!findRestaurant) {
        throw new NotFoundException('RESTAURANT_NOT_FOUND');
      }
      return this.prisma.restaurant.update({
        where: { id },
        data: { ...restaurant }
      })
    } catch (e) {
      throw new InternalServerErrorException('UNEXPECTED_ERROR', e);
    }
  }

  async deleteRestaurant(id: number): Promise<void> {
    try {
      const findRestaurant = await this.findRestaurant(id)
      if (!findRestaurant) {
        throw new NotFoundException('RESTAURANT_NOT_FOUND');
      }
      await this.prisma.restaurant.delete({ where: { id } })
    } catch (e) {
      throw new InternalServerErrorException('UNEXPECTED_ERROR', e);
    }
  }

}
