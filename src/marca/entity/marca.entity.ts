import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Proveedor } from 'src/proveedor/entity/proveedor.entity';
import { Producto } from 'src/producto/entity/producto.entity';
import { Status } from 'src/enums/status';

@Entity()
export class Marca {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ManyToOne(() => Proveedor, proveedor => proveedor.marcas)
    @JoinColumn({ name: 'id_proveedor' })
    id_proveedor: Proveedor;

    @Column({
        type: 'enum',
        enum: Status
    })
    status: Status;

    @Column({ type: 'date' })
    fecha_creacion: Date;

    @Column({ type: 'int' })
    creado_por: number;

    @OneToMany(() => Producto, producto => producto.id_marca)
    productos: Producto[];
}
