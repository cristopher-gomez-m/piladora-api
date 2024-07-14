import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';

import { ProductoModule } from './producto/producto.module';

import { ProveedorModule } from './proveedor/proveedor.module';
import { MarcaModule } from './marca/marca.module';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [path.join(__dirname, '**', 'entity', '*.entity.{ts,js}')],
      synchronize: false,
    }),
    AuthModule,
    UserModule,
    ProductoModule,
    ProveedorModule,
    MarcaModule,
  ],
  controllers: [AppController],
  providers: [AppService], // UserService is not needed to be listed here
})
export class AppModule {}
