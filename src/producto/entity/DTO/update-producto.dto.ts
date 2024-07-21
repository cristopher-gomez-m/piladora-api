import { IsInt, IsString, IsNumber } from "class-validator";

export class UpdateProductoDTO {
    @IsString()
    name: string;

    @IsInt()
    id_marca: number;

    @IsNumber()
    peso: number;

    @IsNumber()
    precio: number;
    
    @IsInt()
    creado_por: number;

    @IsString()
    categoria: string;

    @IsString()
    status: string;
}