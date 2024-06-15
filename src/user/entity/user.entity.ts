import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryColumn()
    id:number;

    userName:string;
    password:string;
}