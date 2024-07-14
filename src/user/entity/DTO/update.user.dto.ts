import { IsString, IsEnum, IsDate, IsInt, IsOptional } from 'class-validator';


export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsInt()
    role?: number;

    @IsOptional()
    @IsString()
    cedula: string;

    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    apellido?: string;

    @IsOptional()
    @IsString()
    user_id?: number;
}