import { Status } from "src/enums/status";
import { Proveedor } from "src/proveedor/entity/proveedor.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Marca {
    @PrimaryGeneratedColumn()
    id: number;    

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToOne(() => Proveedor )
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
}
