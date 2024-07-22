import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductoingresosalidaDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    proveedorId: number;

    @IsString()
    @IsNotEmpty()
    marcaName: string;

    @IsNumber()
    @IsOptional()
    peso?: number;

    @IsNumber()
    @IsOptional()
    precio?: number;

    @IsEnum(['blanco', 'integral'])
    @IsOptional()
    categoria?: 'blanco' | 'integral';


    @IsInt()
    creadoPor: number;

    @IsInt()
    stock: number;
}