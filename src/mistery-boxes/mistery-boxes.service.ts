/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMisteryBoxDto } from './dto/create-mistery-box.dto';
import { MisteryBoxes } from '@prisma/client';
import { UpdateMisteryBoxDto } from './dto/update-mistery-box.dto';

@Injectable()
export class MisteryBoxesService {
  constructor(private readonly prisma: PrismaService) { }
  async createBox(box: CreateMisteryBoxDto): Promise<MisteryBoxes> {
    try {
      return this.prisma.misteryBoxes.create({ data: box });
    } catch (e) {
      throw new InternalServerErrorException('UNEXPECTED_ERROR', e);
    }
  }

  async findAll(): Promise<MisteryBoxes[]> {
    try {
      return this.prisma.misteryBoxes.findMany({
        include: {
          cartItem: true,
          restaurant: true,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException('UNEXPECTED_ERROR', e);
    }
  }

  async findBox(id: number): Promise<MisteryBoxes> {
    try {
      const findBox = await this.prisma.misteryBoxes.findUnique({
        where: { id }, 
        include: {
          cartItem: true,
          restaurant: true,
        },
      });

      if (!findBox) {
        throw new NotFoundException('BOX_NOT_FOUND')
      }
      return findBox;
    } catch (e) {
      throw new InternalServerErrorException('UNEXPECTED_ERROR', e);
    }
  }

  async updateBox(
    id: number,
    box: UpdateMisteryBoxDto,
  ): Promise<MisteryBoxes> {
    try {
      const findBox = await this.findBox(id);
      if (!findBox) {
        throw new NotFoundException('BOX_NOT_FOUND');
      }
      return this.prisma.misteryBoxes.update({
        where: { id },
        data: { ...box }
      })
    } catch (e) {
      throw new InternalServerErrorException('UNEXPECTED_ERROR', e);
    }
  }

  async deleteBox(id: number): Promise<void> {
    try {
      const findBox = await this.findBox(id);
      if (!findBox) {
        throw new NotFoundException('BOX_NOT_FOUND');
      }
      await this.prisma.misteryBoxes.delete({ where: { id } })
    } catch (e) {
      throw new InternalServerErrorException('UNEXPECTED_ERROR', e);
    }
  }

}
