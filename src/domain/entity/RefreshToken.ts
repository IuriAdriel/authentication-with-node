import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
} from "typeorm";
import { User } from "./User";

@Entity("refresh_token")
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    key!: string;

    @Column()
    active: boolean;

    @Column()
    expirationAt!: Date;

    @Column()
    deleted!: boolean;

    @ManyToOne(() => User, (user) => user.refreshTokens)
    @JoinColumn({ name: "userId" })
    @Index("idx_fk_refreshToken_userId")
    user!: User;
}
