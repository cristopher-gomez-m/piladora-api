import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDTO } from './entity/DTO/create-producto.dto';
import { CreateProductoStockDTO } from 'src/IngresosSalidasStock/entity/DTO/CreateProductoStock.dto';
import { UpdateProductoDTO } from './entity/DTO/update-producto.dto';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) { }

    @Get()
    async getProducts() {
        const products = await this.productoService.findAll();
        return products;
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.productoService.findOne(id);
    }

    @Post()
    async store(@Body() createProductDTO: CreateProductoDTO): Promise<any> {
        return this.productoService.store(createProductDTO);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateProductoDTO: UpdateProductoDTO): Promise<ApiResponse> {
        return this.productoService.update(id, updateProductoDTO);
  }

    @Post('add')
    async addProductAndStock(@Body() createProductoStockDTO: CreateProductoStockDTO): Promise<any> {
        return this.productoService.addNewProductAndStock(createProductoStockDTO);
    }
}
