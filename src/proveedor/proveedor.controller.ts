import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { ProveedorDTO } from './entity/DTO/create-proveedor.dto';

@Controller('proveedor')
export class ProveedorController {
    constructor(private readonly proveedorService: ProveedorService) {}

    @Get()
    async getProveedores() {
        const proveedores = await this.proveedorService.findAll();
        return proveedores;
    }

    @Post()
    async store(@Body() createProveedorDto: ProveedorDTO): Promise<any> {
        return this.proveedorService.store(createProveedorDto);
    }
    
}
