import { Controller, Get } from '@nestjs/common';
import { IngresosSalidasStock } from './entity/IngresosSalidasStock.entity';
import { IngresosSalidasStockService } from './IngresosSalidasStock.service';
import { get } from 'http';


@Controller('ingresosSalidasStock')
export class IngresosSalidasStockController {
    constructor(private readonly   ingresosSalidasStockService: IngresosSalidasStockService) {}

    @Get()
    async getIngresosSalidasStock() {
        const products = await this.ingresosSalidasStockService.findAll();
        return products
    }
    
}
