import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductoStockDTO {
    @IsInt()
    id_producto: number;

    @IsInt()
    stock: number;

    @IsString()
    tipo: string;

    @IsNumber()
    creado_por: number;
}


