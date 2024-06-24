import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './entity/DTO/create-user.dto';
import { Role } from 'src/role/entity/role.entity';
import { Status } from 'src/enums/status';
import { UserDTO } from './entity/DTO/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<UserDTO[]> {
    const users = await this.userRepository.find(
      {
        select: ["username","nombre","role"],
        relations: ["role"]
      }  
    );
    const usersDTO = users.map(user => new UserDTO(user.username,user.nombre ,user.role, ));
    return usersDTO;
  }

  async store(createUserDto: CreateUserDto): Promise<User> {
    const role = await this.roleRepository.findOne({ where: { name: createUserDto.role } });
    if (!role) {
      throw new NotFoundException(`Role with ID ${createUserDto.role} not found`);
    }

    const user = this.userRepository.create({
      ...createUserDto,
      role,  // asigna el objeto Role en lugar del ID
    });
    user.status= Status.A;
    user.fecha_creacion = new Date();
    user.creado_por = createUserDto.user_id;
    return await this.userRepository.save(user);
  }
}
