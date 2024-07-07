import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './entity/DTO/create-user.dto';
import { Role } from 'src/role/entity/role.entity';
import { Status } from 'src/enums/status';
import { UserDTO } from './entity/DTO/user.dto';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UpdateUserDto } from './entity/DTO/update.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

  async findAll(query: PaginateQuery): Promise<Paginated<User>> {
    const paginatedResults = await paginate(query, this.userRepository, {
      relations: ['role'],
      sortableColumns: ['id'],
      select: [
        'id',
        'username',
        'nombre',
        'cedula',
        'password',
        'apellido',
        'status',
        'fecha_creacion',
        'creado_por',
        'role'  // Incluir el rol en la selección
      ],
      where: { status: Status.A },
    });

    // Para cada usuario, selecciona los campos necesarios del rol
    paginatedResults.data.forEach(user => {
      if (user.role) {
        user.role = {
          id: user.role.id,
          name: user.role.name
        } as Role;
      }
    });

    return paginatedResults;
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
    user.status = Status.A;
    user.fecha_creacion = new Date();
    user.creado_por = createUserDto.user_id;
    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`Usuario no encontrado`);
      }
      user.status = Status.I;
      await this.userRepository.save(user);
      return { message: 'Usuario eliminado correctamente' };
    } catch (error) {
      if (error.code === 500) {
        throw new InternalServerErrorException('Error al eliminar el usuario');
      }
      throw error;

    }
  }
  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (updateUserDto.role) {
      const role = await this.roleRepository.findOne({ where: { id: updateUserDto.role } });
      if (!role) {
        throw new NotFoundException(`Role with ID ${updateUserDto.role} not found`);
      }
      user.role = role; // Asignar la entidad de Role al usuario
    }

    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }

    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }

    if (updateUserDto.cedula) {
      user.cedula = updateUserDto.cedula;
    }

    if (updateUserDto.nombre) {
      user.nombre = updateUserDto.nombre;
    }

    if (updateUserDto.apellido) {
      user.apellido = updateUserDto.apellido;
    }

    return await this.userRepository.save(user);
  }

}
