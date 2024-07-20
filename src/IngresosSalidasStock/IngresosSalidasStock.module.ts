import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresosSalidasStockService } from './IngresosSalidasStock.service';
import { IngresosSalidasStockController } from './IngresosSalidasStock.controller';
import { IngresosSalidasStock } from './entity/entrada-salida-stock-entity';
import { Producto } from 'src/producto/entity/producto.entity';

@Module({
    imports: [TypeOrmModule.forFeature([IngresosSalidasStock, Producto])],
    providers: [IngresosSalidasStockService],
    controllers: [IngresosSalidasStockController],
})
export class IngresosSalidasStockModule { }
