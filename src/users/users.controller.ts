import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import UsersService from './users.service';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';
import { FindOneParams } from 'src/utils/findOneParams';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.usersService.getById(Number(id));
  }

  @Post()
  async create(@Body() post: CreateUserDto) {
    return this.usersService.create(post);
  }

  @Put(':id')
  async replace(@Param('id') id: string, @Body() post: UpdateUserDto) {
    return this.usersService.replace(Number(id), post);
  }

  @Delete(':id')
  async delete(@Param('id') { id }: FindOneParams) {
    this.usersService.delete(Number(id));
  }
}
