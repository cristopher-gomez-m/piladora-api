import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Role } from 'src/role/entity/role.entity';

dotenv.config();
@Module({
  imports: [TypeOrmModule.forFeature([User, Role]),forwardRef(() => UserModule),PassportModule,JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService,JwtModule],
})
export class AuthModule {}
