import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresosSalidasStockService } from './IngresosSalidasStock.service';
import { IngresosSalidasStockController } from './IngresosSalidasStock.controller';
import { IngresosSalidasStock } from './entity/IngresosSalidasStock.entity';
import { Producto } from 'src/producto/entity/producto.entity';
import { User } from 'src/user/entity/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([IngresosSalidasStock, Producto, User])],
    providers: [IngresosSalidasStockService],
    controllers: [IngresosSalidasStockController],
})
export class IngresosSalidasStockModule { }
