import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entity/producto.entity';
import { Marca } from 'src/marca/entity/marca.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { CreateProductoDTO } from './entity/DTO/create-producto.dto';
import { Status } from 'src/enums/status';
import { Categoria } from 'src/enums/categoria';
import { CreateProductoStockDTO } from 'src/IngresosSalidasStock/entity/DTO/CreateProductoStock.dto';
import { UpdateProductoDTO } from './entity/DTO/update-producto.dto';
import { IngresosSalidasStock } from 'src/IngresosSalidasStock/entity/IngresosSalidasStock.entity';
import { CreateProductoingresosalidaDTO } from 'src/IngresosSalidasStock/entity/DTO/createproductoingesostock';
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

    async findOne(id: number): Promise<ApiResponse> {
        const producto = await this.productoRepository.findOne({ where: { id: id }, relations: ['id_marca'] });
        if (!producto) {
            return {
                data: null,
                message: 'No existe producto',
                error: true,
            };
        }
        return {
            data: producto,
            message: 'Producto encontrado',
            error: false,
        };
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


    async update(id: number, updateProductoDTO: UpdateProductoDTO): Promise<ApiResponse> {
        try {
            const producto = await this.productoRepository.findOne({ where: { id: id } });

            if (!producto) {
                return {
                    data: null,
                    message: 'Producto no encontrado',
                    error: false,
                };
            }

            const id_marca = await this.marcaRepository.findOne({ where: { id: updateProductoDTO.id_marca } });

            if (!id_marca) {
                return {
                    data: null,
                    message: 'Marca no encontrada',
                    error: false,
                };
            }

            const user = await this.userRepository.findOne({ where: { id: updateProductoDTO.creado_por } });
            if (!user) {
                return {
                    data: null,
                    message: 'Usuario no encontrado',
                    error: false,
                };
            }

            producto.name = updateProductoDTO.name || producto.name;
            producto.peso = updateProductoDTO.peso || producto.peso;
            producto.precio = updateProductoDTO.precio || producto.precio;
            producto.id_marca = id_marca;
            producto.fecha_creacion = new Date();
            producto.creado_por = updateProductoDTO.creado_por;
            producto.categoria = Categoria[updateProductoDTO.categoria as keyof typeof Categoria];
            producto.status = Status[updateProductoDTO.status as keyof typeof Status];

            await this.productoRepository.save(producto);
            return {
                data: producto,
                message: 'Producto actualizado exitosamente',
                error: false,
            };
        } catch (error) {
            return {
                data: null,
                message: 'Error al actualizar el producto',
                error: true,
            };
        }
    }

    async addNewProductAndStock(createProductoStockDTO: CreateProductoingresosalidaDTO): Promise<ApiResponse> {
        const {
            name,
            proveedorId,
            marcaName,
            peso,
            precio,
            categoria,
            stock
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
                    Status.A,
                    1, //id de usuario que lo creo
                    stock,
                    'ingreso'
                ]
            );
            return {
                data: null,
                message: 'Producto y stock agregados correctamente' ,
                error: false,
            }
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
