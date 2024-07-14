import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from './entity/marca.entity';
import { User } from 'src/user/entity/user.entity';
import { Proveedor } from 'src/proveedor/entity/proveedor.entity';
import { CreateMarcaDTO } from './entity/DTO/create-marca.dto';
import { Status } from 'src/enums/status';

@Injectable()
export class MarcaService {
    constructor(
        @InjectRepository(Marca)
        private marcaRepository: Repository<Marca>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Proveedor)
        private proveedorRepository: Repository<Proveedor>,

    ) { }

    async findAll(): Promise<Marca[]> {
        return this.marcaRepository.find();
    }

    async store(createMarcaDTO: CreateMarcaDTO): Promise<ApiResponse> {
        try {
            const id_proveedor = await this.proveedorRepository.findOne({ where: { id: createMarcaDTO.id_proveedor } });

            if (!id_proveedor) {
                return {
                    data: null,
                    message: 'Proveedor no encontrado',
                    error: false,
                };
            }

            const marca = this.marcaRepository.create({
                ...createMarcaDTO,
                id_proveedor,
            });

            const user = await this.userRepository.findOne({ where: { id: createMarcaDTO.creado_por } });
            if (!user) {
                return {
                    data: null,
                    message: 'Usuario no encontrado',
                    error: false,
                };
            }

            marca.fecha_creacion = new Date();
            marca.status = Status.A;
            marca.creado_por = createMarcaDTO.creado_por;

            await this.marcaRepository.save(marca);

            return {
                data: marca,
                message: 'Marca creado correctamente',
                error: false,
            };
        } catch (error) {
            console.error('Error al crear marca:', error);
            return {
                data: null,
                message: 'Error al crear marca',
                error: true,
            };
        }
    }


}