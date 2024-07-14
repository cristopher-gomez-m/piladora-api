import { IsInt, IsString } from "class-validator";

export class CreateMarcaDTO {
    @IsString()
    name: string;

    @IsInt()
    id_proveedor: number;

    @IsInt()
    creado_por: number;
}