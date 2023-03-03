import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RefreshToken } from "./RefreshToken";

@Entity()
export class User {
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

    @Column({ default: false })
    deleted: boolean;

    @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
    refreshTokens?: RefreshToken[] | undefined;
}
