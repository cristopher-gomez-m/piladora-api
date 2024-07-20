import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
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

    @Get('proveedor')
    async getMarcasByProveedor(@Query('proveedorId', ParseIntPipe) proveedorId: number) {
        const marcas = await this.marcaService.findByProveedor(proveedorId);
        return marcas;
    }

    @Post()
    async store(@Body() createMarcaDto: CreateMarcaDTO): Promise<any> {
        return this.marcaService.store(createMarcaDto);
    }
}
