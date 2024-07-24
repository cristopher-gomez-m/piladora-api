import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Marca } from 'src/marca/entity/marca.entity';
import { Status } from 'src/enums/status';
import { Categoria } from 'src/enums/categoria';
import { IngresosSalidasStock } from 'src/IngresosSalidasStock/entity/IngresosSalidasStock.entity';



@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ManyToOne(() => Marca, marca => marca.productos)
    @JoinColumn({ name: 'id_marca' })
    id_marca: Marca;

    @Column({ type: 'float' })
    peso: number;

    @Column({ type: 'float' })
    precio: number;

    @Column({
        type: 'enum',
        enum: Categoria
    })
    categoria: Categoria;

    @Column({
        type: 'enum',
        enum: Status
    })
    status: Status;

    @Column({ type: 'date' })
    fecha_creacion: Date;

    @Column({ type: 'int' })
    creado_por: number;

    @OneToMany(() => IngresosSalidasStock, ingresosSalidasStock => ingresosSalidasStock.producto)
    ingresosSalidasStock: IngresosSalidasStock[];
}
