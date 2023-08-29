import { Injectable } from '@nestjs/common';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';
import User from './users.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserNotFoundException } from './exceptions/userNotFound.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaError } from 'src/utils/prismaError';

@Injectable()
export default class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  private lastUserId = 0;
  private users: User[] = [];

  async getAll() {
    return this.prismaService.user.findMany();
  }

  async getById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  async replace(id: number, user: UpdateUserDto) {
    try {
      return await this.prismaService.user.update({
        data: {
          ...user,
          id: undefined,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new UserNotFoundException(id);
      }
      throw error;
    }
  }

  async create(user: CreateUserDto) {
    return this.prismaService.user.create({
      data: user,
    });
  }

  async delete(id: number) {
    try {
      return this.prismaService.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new UserNotFoundException(id);
      }
      throw error;
    }
  }
}
