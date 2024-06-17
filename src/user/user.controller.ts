import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './entity/DTO/create-user.dto';
import { User } from './entity/user.entity';

@Controller('user') // Establece el prefijo de ruta para todo el controlador
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // Ruta relativa a '/user'
  async getUsers() {
    const users = await this.userService.findAll();
    return users;
  }

  @Post()
  async store(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.store(createUserDto);
  }
}
