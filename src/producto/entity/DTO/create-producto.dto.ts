import { IsInt, IsString, IsNumber } from "class-validator";

export class CreateProductoDTO {
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
}