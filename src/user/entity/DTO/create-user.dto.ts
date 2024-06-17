import { IsString, IsEnum, IsDate, IsInt } from 'class-validator';


export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsString()
  cedula: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsInt()
  user_id: number;
}
