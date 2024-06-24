import { Categoria } from "src/enums/categoria";
import { Status } from "src/enums/status";
import { Marca } from "src/marca/entity/marca.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;    

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column( {type: 'float'} )
    peso: number;

    @Column( {type: 'float'} )
    precio: number;

    @OneToOne(() => Marca )
    @JoinColumn({ name: 'id_marca' })
    id_marca: Marca;

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
}