import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './entity/DTO/create-user.dto';
import { User } from './entity/user.entity';
import { Paginated,PaginateQuery } from 'nestjs-paginate';
import { UserDTO } from './entity/DTO/user.dto';

@Controller('user') // Establece el prefijo de ruta para todo el controlador
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // Ruta relativa a '/user'
  async getUsers(@Query() query:PaginateQuery):Promise<Paginated<User>> {
    const users = await this.userService.findAll(query);
    return users;
  }

  @Post()
  async store(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.store(createUserDto);
  }
}
