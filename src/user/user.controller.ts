import { Body, Controller, Get, Post, Delete, Query, Param, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './entity/DTO/create-user.dto';
import { User } from './entity/user.entity';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { UserDTO } from './entity/DTO/user.dto';

@Controller('user') // Establece el prefijo de ruta para todo el controlador
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // Ruta relativa a '/user'
  async getUsers(@Query() query: PaginateQuery): Promise<Paginated<User>> {
    const users = await this.userService.findAll(query);
    return users;
  }

  @Post()
  async store(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.store(createUserDto);
  }

  @Delete(':userId')
  @HttpCode(200)
  async delete(@Param('userId') id: number) {
    return this.userService.delete(id);
  }
}
