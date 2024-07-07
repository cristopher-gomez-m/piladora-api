import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './entity/DTO/create-user.dto';
import { Role } from 'src/role/entity/role.entity';
import { Status } from 'src/enums/status';
import { UserDTO } from './entity/DTO/user.dto';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  /*
  async findAll(query:PaginateQuery): Promise<Paginated<User>> {
    const {search} = query;
    let where ={status: Status.A};
    if(search){
      where = {...where,}
    }
    const paginatedResults = await paginate(query, this.userRepository, {
      relations: ['role'],
      sortableColumns:['id'], 
      select:['id','username','nombre','role','status','fecha_creacion','creado_por'],
      where: { status: Status.A },
      
    });
  
    return  paginatedResults
  }
*/

async findAll(query: PaginateQuery): Promise<Paginated<User>> {
  const { search } = query;
  const qb = this.userRepository.createQueryBuilder('user');

  // Incluye relaciones
  qb.leftJoinAndSelect('user.role', 'role');

  // Condición base
  qb.where('user.status = :status', { status: Status.A });

  // Lógica de búsqueda compleja
  if (search) {
    qb.andWhere(
      new Brackets(qb => {
        qb.where('user.username LIKE :search', { search: `%${search}%` })
          .orWhere('user.nombre LIKE :search', { search: `%${search}%` })
          // Puedes añadir más condiciones OR según sea necesario
      })
    );
  }

  // Aplica paginación
  const paginatedResults = await paginate<User>(query, qb, {
    sortableColumns: ['id'],
    select: ['id', 'username', 'nombre', 'status', 'fecha_creacion', 'creado_por'],
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
    user.status= Status.A;
    user.fecha_creacion = new Date();
    user.creado_por = createUserDto.user_id;
    return await this.userRepository.save(user);
  }

  async delete(id:number){
    try {
      const user = await this.userRepository.findOneBy({id});
      if (!user) {
        throw new NotFoundException(`Usuario no encontrado`);
      }
      user.status= Status.I;
       await this.userRepository.save(user);
       return {message:'Usuario eliminado correctamente'};
    } catch (error) {
      if(error.code === 500){
        throw new InternalServerErrorException('Error al eliminar el usuario');
      }
      throw error;
      
    }
  }
}
