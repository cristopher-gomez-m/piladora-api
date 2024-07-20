import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDTO } from './entity/DTO/create-producto.dto';
import { CreateProductoStockDTO } from 'src/IngresosSalidasStock/entity/DTO/CreateProductoStock.dto';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) { }

    @Get()
    async getProducts() {
        const products = await this.productoService.findAll();
        return products;
    }

    @Post()
    async store(@Body() createProductDTO: CreateProductoDTO): Promise<any> {
        return this.productoService.store(createProductDTO);
    }

    @Post('add')
    async addProductAndStock(@Body() createProductoStockDTO: CreateProductoStockDTO): Promise<any> {
        return this.productoService.addNewProductAndStock(createProductoStockDTO);
    }
}
