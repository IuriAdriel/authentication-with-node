import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RefreshToken } from "./RefreshToken";
import { UserPasswordReset } from "./UserPasswordReset";

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
    refreshToken?: RefreshToken[] | undefined;

    @OneToMany(
        () => UserPasswordReset,
        (userPasswordReset) => userPasswordReset.user
    )
    userPasswordReset?: UserPasswordReset[] | undefined;
}
