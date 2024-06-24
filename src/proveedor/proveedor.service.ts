import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Proveedor } from './entity/proveedor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/enums/status';
import { ProveedorDTO } from './entity/dto/create-proveedor.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class ProveedorService {
    constructor(
        @InjectRepository(Proveedor)
        private proveedorRepository: Repository<Proveedor>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}

    async findAll(): Promise<Proveedor[]> {
        return this.proveedorRepository.find();
    }

    async store(createProveedorDto: ProveedorDTO): Promise<ApiResponse> {
        try {
          const proveedor = this.proveedorRepository.create({
            ...createProveedorDto,
          });

          const user = await this.userRepository.findOne({ where: { id: createProveedorDto.user_id } });
            if (!user) {
                return {
                data: null,
                message: 'Usuario no encontrado',
                error: false,
                };
            }
      
          proveedor.fecha_creacion = new Date();
          proveedor.status = Status.A;
          proveedor.creado_por = createProveedorDto.user_id;
      
          await this.proveedorRepository.save(proveedor);
      
          return {
            data: proveedor,
            message: 'Proveedor creado correctamente',
            error: false,
          };
        } catch (error) {
          console.error('Error al crear proveedor:', error); 
          return {
            data: null, 
            message: 'Error al crear proveedor', 
            error: true,
          };
        }
      }

    async update(id: number, updateProveedorDto: Proveedor): Promise<Proveedor> {
        const proveedor = await this.proveedorRepository.findOne({ where: { id } });
        if (!proveedor) {
            throw new NotFoundException(`Proveedor with ID ${id} not found`);
        }
        this.proveedorRepository.merge(proveedor, updateProveedorDto);
        return await this.proveedorRepository.save(proveedor);
    }

    async delete(id: number): Promise<Proveedor> {
        const proveedor = await this.proveedorRepository.findOne({ where: { id } });
        if (!proveedor) {
            throw new NotFoundException(`Proveedor with ID ${id} not found`);
        }
        return await this.proveedorRepository.remove(proveedor);
    }

    async show(id: number): Promise<Proveedor> {
        const proveedor = await this.proveedorRepository.findOne({ where: { id } });
        if (!proveedor) {
            throw new NotFoundException(`Proveedor with ID ${id} not found`);
        }
        return proveedor;
    }
    
}
