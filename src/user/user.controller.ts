import { Body, Controller, Get, Post, Delete, Query, Param, HttpCode, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './entity/DTO/create-user.dto';
import { User } from './entity/user.entity';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { UserDTO } from './entity/DTO/user.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UpdateUserDto } from './entity/DTO/update.user.dto';

@Controller('user') // Establece el prefijo de ruta para todo el controlador
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Get() // Ruta relativa a '/user'
  async getUsers(@Query() query: PaginateQuery): Promise<Paginated<User>> {
    const users = await this.userService.findAll(query);
    return users;
  }

  @Post()
  async store(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.store(createUserDto);
  }

  @Put(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return await this.userService.update(id, updateUserDto);
    }

  @Delete(':userId')
  @HttpCode(200)
  async delete(@Param('userId') id: number) {
    return this.userService.delete(id);
  }
}
