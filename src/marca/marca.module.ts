import { Module } from '@nestjs/common';
import { Proveedor } from 'src/proveedor/entity/proveedor.entity';
import { User } from 'src/user/entity/user.entity';
import { Marca } from './entity/marca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Proveedor, User, Marca])],
    providers: [MarcaService],
    controllers: [MarcaController],
})
export class MarcaModule {}
