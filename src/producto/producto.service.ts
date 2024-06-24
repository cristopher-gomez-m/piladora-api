import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entity/producto.entity';
import { Marca } from 'src/marca/entity/marca.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { CreateProductoDTO } from './entity/DTO/create-producto.dto';
import { Status } from 'src/enums/status';
import { Categoria } from 'src/enums/categoria';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(Producto)
        private productoRepository: Repository<Producto>,
        @InjectRepository(Marca)
        private marcaRepository: Repository<Marca>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<Producto[]> {
        return this.productoRepository.find();
    }

    async store(createProductoDTO: CreateProductoDTO): Promise<ApiResponse> {
        try {
            const id_marca = await this.marcaRepository.findOne({ where: { id: createProductoDTO.id_marca } });

            if (!id_marca) {
                return {
                    data: null,
                    message: 'Marca no encontrada',
                    error: false,
                };
            }

            const producto = this.productoRepository.create({
                ...createProductoDTO,
                id_marca,
            });

            const user = await this.userRepository.findOne({ where: { id: createProductoDTO.creado_por } });
            if (!user) {
                return {
                    data: null,
                    message: 'Usuario no encontrado',
                    error: false,
                };
            }

            producto.fecha_creacion = new Date();
            producto.categoria = Categoria.blanco;
            producto.status = Status.A;
            producto.creado_por = createProductoDTO.creado_por;

            await this.productoRepository.save(producto);

            return {
                data: producto,
                message: 'Producto creado correctamente',
                error: false,
            };
        } catch (error) {
            console.error('Error al crear producto:', error);
            return {
                data: null,
                message: 'Error al crear producto',
                error: true,
            };
        }
    }
}
