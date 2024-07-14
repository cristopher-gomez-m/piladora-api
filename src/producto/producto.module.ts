import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './entity/producto.entity';
import { User } from 'src/user/entity/user.entity';
import { Marca } from 'src/marca/entity/marca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoController } from './producto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, User, Marca])],
  providers: [ProductoService],
  controllers: [ProductoController],
})
export class ProductoModule {}
