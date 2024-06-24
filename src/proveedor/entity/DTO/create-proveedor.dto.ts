import { IsString, IsEnum, IsDate, IsInt } from 'class-validator';


export class ProveedorDTO {
  @IsString()
  name: string;

  @IsString()
  identificacion: string;

  @IsInt()
  user_id: number;
}
