import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Producto } from './entity/producto.entity';
import { Marca } from 'src/marca/entity/marca.entity';
import { User } from 'src/user/entity/user.entity';
import { IngresosSalidasStock } from 'src/IngresosSalidasStock/entity/IngresosSalidasStock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, IngresosSalidasStock, Marca, User])],
  providers: [ProductoService],
  controllers: [ProductoController],
})
export class ProductoModule {}
