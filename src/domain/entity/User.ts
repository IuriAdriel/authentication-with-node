import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Base } from "./base/BaseEntity";

@Entity()
export class User extends Base {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    age: number;
}
