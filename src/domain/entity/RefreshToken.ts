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

    @Column({ type: "timestamp" })
    expirationAt!: Date;

    @Column()
    deleted!: boolean;

    @ManyToOne(() => User, (user) => user.refreshToken)
    @JoinColumn({ name: "userId" })
    @Index("idx_fk_refresh_token_userId")
    user!: User;
}
