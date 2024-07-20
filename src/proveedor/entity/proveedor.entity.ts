import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Marca } from 'src/marca/entity/marca.entity';
import { Status } from 'src/enums/status';

@Entity()
export class Proveedor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    identificacion: string;

    @Column({ type: 'date' })
    fecha_creacion: Date;

    @Column({ type: 'int' })
    creado_por: number;

    @Column({
        type: 'enum',
        enum: Status
    })
    status: Status;

    @OneToMany(() => Marca, marca => marca.id_proveedor)
    marcas: Marca[];
}