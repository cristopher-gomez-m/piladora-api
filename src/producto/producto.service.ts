import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entity/producto.entity';
import { Marca } from 'src/marca/entity/marca.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { CreateProductoDTO } from './entity/DTO/create-producto.dto';
import { Status } from 'src/enums/status';
import { Categoria } from 'src/enums/categoria';
import { IngresosSalidasStock } from 'src/IngresosSalidasStock/entity/entrada-salida-stock-entity';
import { CreateProductoStockDTO } from 'src/IngresosSalidasStock/entity/DTO/CreateProductoStock.dto';
@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(Producto)
        private productoRepository: Repository<Producto>,
        @InjectRepository(Marca)
        private marcaRepository: Repository<Marca>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(IngresosSalidasStock)
        private ingresosSalidasStockRepository: Repository<IngresosSalidasStock>,
        private readonly entityManager: EntityManager,
    ) { }

    async findAll(): Promise<Producto[]> {
        return this.productoRepository.find({ relations: ['id_marca'] });
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

    async addNewProductAndStock(createProductoStockDTO: CreateProductoStockDTO): Promise<any> {
        const {
            name,
            proveedorId,
            marcaName,
            peso,
            precio,
            categoria,
            status,
            creadoPor,
            stock,
            tipo
        } = createProductoStockDTO;

        try {
            await this.entityManager.query(
                `CALL AddNewProductAndStock(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    name,
                    proveedorId,
                    marcaName,
                    peso,
                    precio,
                    categoria,
                    status,
                    creadoPor,
                    stock,
                    tipo
                ]
            );
            return { message: 'Producto y stock agregados correctamente' };
        } catch (error) {
            console.error('Error al agregar producto y stock:', error);
            throw new Error('Error al agregar producto y stock');
        }
    }


}
