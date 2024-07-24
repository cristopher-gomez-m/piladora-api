import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IngresosSalidasStockService } from './IngresosSalidasStock.service';
import { CreateProductoStockDTO } from './entity/DTO/CreateProductoStock.dto';


@Controller('ingresosSalidasStock')
export class IngresosSalidasStockController {
    constructor(private readonly   ingresosSalidasStockService: IngresosSalidasStockService) {}

    @Get()
    async getIngresosSalidasStock() {
        const products = await this.ingresosSalidasStockService.findAll();
        return products
    }

    @Post()
    async store(@Body() createIngresosSalidasStock: CreateProductoStockDTO): Promise<any> {
        return this.ingresosSalidasStockService.store(createIngresosSalidasStock);
    }

    @Get('ultimo-ingreso/:id_producto')
    async findLastIngreso(@Param('id_producto') id_producto: number) {
        return this.ingresosSalidasStockService.findLastIngresoByProductoId(id_producto);
    }

    @Get('ultima-salida/:id_producto')
    async findLastSalida(@Param('id_producto') id_producto: number) {
        return this.ingresosSalidasStockService.findLastSalidaByProductoId(id_producto);
    }
    
    @Get('ingresos/:id_producto')
    async findAlldIngresos(@Param('id_producto') id_producto: number) {
        return this.ingresosSalidasStockService.findAllIngresoByProductoId(id_producto);
    }

    @Get('salidas/:id_producto')
    async findAlldSalidas(@Param('id_producto') id_producto: number) {
        return this.ingresosSalidasStockService.findAllSalidaByProductoId(id_producto);
    }
    
}
