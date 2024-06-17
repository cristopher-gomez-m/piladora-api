import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Status } from "src/enums/status"; // Asegúrate de importar el enum Status

@Entity({ name: 'role' }) // Opcionalmente, puedes especificar el nombre de la tabla si es diferente
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

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
