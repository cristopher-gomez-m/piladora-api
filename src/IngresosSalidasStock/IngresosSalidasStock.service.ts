import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngresosSalidasStock } from './entity/IngresosSalidasStock.entity';
import { CreateProductoStockDTO } from './entity/DTO/CreateProductoStock.dto';
import { Producto } from 'src/producto/entity/producto.entity';
import { User } from 'src/user/entity/user.entity';
import { Status } from 'src/enums/status';
import { tipostock } from 'src/enums/tipostock';

@Injectable()
export class IngresosSalidasStockService {
    constructor(
        @InjectRepository(IngresosSalidasStock)
        private ingresosSalidasStockRepository: Repository<IngresosSalidasStock>,
        @InjectRepository(Producto)
        private productoRepository: Repository<Producto>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<IngresosSalidasStock[]> {
        return this.ingresosSalidasStockRepository.find(); //agregar producto join
    }

    async store(createIngresosSalidasStock: CreateProductoStockDTO): Promise<ApiResponse> {
        try {
            const producto = await this.productoRepository.findOne({ where: { id: createIngresosSalidasStock.id_producto } });

            if (!producto) {
                return {
                    data: null,
                    message: 'Producto no encontrada',
                    error: false,
                };
            }

            const ingresoSalidaStock = this.ingresosSalidasStockRepository.create({
                ...createIngresosSalidasStock,
                producto,
                tipo: createIngresosSalidasStock.tipo as tipostock,
            });

            const user = await this.userRepository.findOne({ where: { id: createIngresosSalidasStock.creado_por } });
            if (!user) {
                return {
                    data: null,
                    message: 'Usuario no encontrado',
                    error: false,
                };
            }

            ingresoSalidaStock.fecha_creacion = new Date();
            ingresoSalidaStock.status = Status.A;
            ingresoSalidaStock.creado_por = createIngresosSalidasStock.creado_por;

            await this.ingresosSalidasStockRepository.save(ingresoSalidaStock);

            return {
                data: ingresoSalidaStock,
                message: 'Ingreso y salida de stock creado correctamente',
                error: false,
            };
        } catch (error) {
            console.error('Error al crear ingreso y salida de stock:', error);
            return {
                data: null,
                message: 'Error al crear ingreso y salida de stock',
                error: true,
            };
        }
    }


    async findLastIngresoByProductoId(id_producto: number): Promise<ApiResponse> {
        const ingreso = await this.ingresosSalidasStockRepository.findOne({
            where: {
                producto: { id: id_producto },
                tipo: tipostock.ingreso,
            },
            order: {
                fecha_creacion: 'DESC',
                id: 'DESC'
            },
        });

        if (!ingreso) {
            return {
                data: null,
                message: 'No se encuentra el ultimo ingreso',
                error: true,
            };
        }

        return {
            data: ingreso,
            message: `Ultimo ingreso del producto ${id_producto}`,
            error: false,
        };
    }

    async findLastSalidaByProductoId(id_producto: number): Promise<ApiResponse> {
        const ingreso = await this.ingresosSalidasStockRepository.findOne({
            where: {
                producto: { id: id_producto },
                tipo: tipostock.salida,
            },
            order: {
                fecha_creacion: 'DESC',
                id: 'DESC',
            },
        });

        if (!ingreso) {
            return {
                data: null,
                message: 'No se encuentra la ultimo salida',
                error: true,
            };
        }

        return {
            data: ingreso,
            message: `Ultima salida del producto ${id_producto}`,
            error: false,
        };
    }

    async findAllIngresoByProductoId(id_producto: number): Promise<ApiResponse> {
        const ingreso = await this.ingresosSalidasStockRepository.find({
            where: {
                producto: { id: id_producto },
                tipo: tipostock.ingreso,
            }
        });

        if (!ingreso) {
            return {
                data: null,
                message: 'No se encuetran registros de ingresos',
                error: true,
            };
        }

        return {
            data: ingreso,
            message: `Registros de ingresos del producto con ${id_producto}`,
            error: false,
        };
    }

    async findAllSalidaByProductoId(id_producto: number): Promise<ApiResponse> {
        const ingreso = await this.ingresosSalidasStockRepository.find({
            where: {
                producto: { id: id_producto },
                tipo: tipostock.salida,
            }
        });

        if (!ingreso) {
            return {
                data: null,
                message: 'No se encuetran registros de salidas',
                error: true,
            };
        }

        return {
            data: ingreso,
            message: `Registros de salidas del producto con ${id_producto}`,
            error: false,
        };
    }

}
