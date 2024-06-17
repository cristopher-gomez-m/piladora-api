import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Status } from 'src/enums/status';
import { Role } from 'src/role/entity/role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @OneToOne(() => Role)
    @JoinColumn({ name: 'role' })
    role: Role;

    @Column({ type: 'varchar', length: 10 })
    cedula: string;

    @Column({ type: 'varchar', length: 200 })
    nombre: string;

    @Column({ type: 'varchar', length: 200 })
    apellido: string;

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