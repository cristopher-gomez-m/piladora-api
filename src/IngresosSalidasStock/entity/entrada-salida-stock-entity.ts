import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, JoinTable } from 'typeorm';
import { Producto } from 'src/producto/entity/producto.entity';
import { Status } from 'src/enums/status';
import { tipostock } from 'src/enums/tipostock';

@Entity()
export class IngresosSalidasStock {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => Producto, producto => producto.ingresosSalidasStock)
    // @JoinTable({ name: 'id_producto' })
    // id_producto: Producto;

    @Column({ type: 'int' })
    stock: number;

    @Column({
        type: 'enum',
        enum: tipostock
    })
    tipo: tipostock;

    @Column({ type: 'date' })
    fecha_creacion: Date;

    @Column({ type: 'int' })
    creado_por: number;

    @Column({
        type: 'enum',
        enum: Status
    })
    status: Status;
}