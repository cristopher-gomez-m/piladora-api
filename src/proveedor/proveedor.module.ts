import { Module } from '@nestjs/common';
import { Proveedor } from './entity/proveedor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { User } from 'src/user/entity/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Proveedor, User])],
    providers: [ProveedorService],
    controllers: [ProveedorController],
})
export class ProveedorModule {}
