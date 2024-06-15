import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user') // Establece el prefijo de ruta para todo el controlador
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // Ruta relativa a '/user'
  async getUsers() {
    const users = await this.userService.findAll();
    return users;
  }
}
