import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    userName:string;
    password:string;
}