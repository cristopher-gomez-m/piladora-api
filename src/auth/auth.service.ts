import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entity/user.entity';
import { UserDTO } from 'src/user/entity/DTO/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserDTO> {
    const user = await this.userService.findByUsername(username,pass);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new NotFoundException();
    }
    const role = { id: user.role.id, nombre: user.role.name };
    const payload = { id: user.id, role: role };
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
