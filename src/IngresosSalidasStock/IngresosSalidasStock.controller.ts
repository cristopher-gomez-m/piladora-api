import { Controller, Get } from '@nestjs/common';
import { IngresosSalidasStock } from './entity/entrada-salida-stock-entity';
import { IngresosSalidasStockService } from './IngresosSalidasStock.service';
import { get } from 'http';


@Controller('IngresosSalidasStock')
export class IngresosSalidasStockController {
    constructor(private readonly IngresosSalidasStockService: IngresosSalidasStockService) {}

    @Get()
    async getIngresosSalidasStock() {
        const products = await this.IngresosSalidasStockService.findAll();
        return products
    }
    
}
