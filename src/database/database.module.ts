import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Configuración de conexión de TypeORM
      type: 'mysql', // Tipo de base de datos (puedes ajustarlo según tu configuración)
      host: 'localhost', // Host de la base de datos
      port: 3306, // Puerto de la base de datos
      username: 'root', // Nombre de usuario de la base de datos
      password: '2668194', // Contraseña de la base de datos
      database: 'piladora', // Nombre de la base de datos
      entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Rutas a las entidades de TypeORM
      synchronize: false, // Sincroniza automáticamente las entidades con la base de datos (solo para desarrollo)
    }),
  ],
  exports: [TypeOrmModule], // Exporta TypeOrmModule para ser usado por otros módulos
})
export class DatabaseModule {}
