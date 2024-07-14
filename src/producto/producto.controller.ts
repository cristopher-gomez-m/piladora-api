import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDTO } from './entity/DTO/create-producto.dto';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}

    @Get()
    async getProducts() {
        const products = await this.productoService.findAll();
        return products;
    }

    @Post()
    async store(@Body() createProductDTO: CreateProductoDTO): Promise<any> {
        return this.productoService.store(createProductDTO);
      }
}
