import { Body, Controller, Get, Post } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDTO } from './entity/DTO/create-marca.dto';
//import { CreateMarcaDTO } from './entity/dto/create-marca.dto';

@Controller('marca')
export class MarcaController {
    constructor(private readonly marcaService: MarcaService) {}

    @Get()
    async getMarcas() {
        const marcas = await this.marcaService.findAll();
        return marcas;
    }

    @Post()
    async store(@Body() createMarcaDto: CreateMarcaDTO): Promise<any> {
        return this.marcaService.store(createMarcaDto);
    }
}
