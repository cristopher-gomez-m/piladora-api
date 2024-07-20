import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngresosSalidasStock } from './entity/entrada-salida-stock-entity';

@Injectable()
export class IngresosSalidasStockService {
    constructor(
        @InjectRepository(IngresosSalidasStock)
        private ingresosSalidasStockRepository: Repository<IngresosSalidasStock>
    ) { }

    async findAll(): Promise<IngresosSalidasStock[]> {
        return this.ingresosSalidasStockRepository.find();
    }

}
