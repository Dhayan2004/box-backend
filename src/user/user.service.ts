import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(user: CreateUserDto): Promise<User> {
    try {
      const hashPassword = await bcrypt.hash(user.password, 10);
      const overwritePassword = { ...user, password: hashPassword };
      return await this.prisma.user.create({ data: { ...overwritePassword } });
    } catch (e) {
      throw new InternalServerErrorException('ERROR_INNESPERADO', e);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.prisma.user.findMany({
        include: {
          cart: true,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException('ERROR_INNESPERADO', e);
    }
  }

  async findUser(id: number): Promise<User> {
    try {
      const findUser = await this.prisma.user.findUnique({
        where: { id },
        include: {
          cart: true,
        },
      });
      if (!findUser) {
        throw new NotFoundException('USUARIO_NO_ENCONTRADO');
      }
      return findUser;
    } catch (e) {
      throw new InternalServerErrorException('ERROR_INNESPERADO', e);
    }
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    try {
      const findUser = await this.findUser(id);
      if (!findUser) {
        throw new NotFoundException('USUARIO_NO_ENCONTRADO');
      }
      return this.prisma.user.update({ where: { id }, data: { ...user } });
    } catch (e) {
      throw new InternalServerErrorException('ERROR_INNESPERADO', e);
    }
  }

  async removeUser(id: number): Promise<void> {
    try {
      const findUser = await this.findUser(id);
      if (!findUser) {
        throw new NotFoundException('USUARIO_NO_ENCONTRADO');
      }
      await this.prisma.user.delete({ where: { id } });
    } catch (e) {
      throw new InternalServerErrorException('UNEXPECTED_ERROR', e);
    }
  }
}
