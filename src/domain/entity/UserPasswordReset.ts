import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
} from "typeorm";
import { User } from "./User";

@Entity("user_password_reset")
export class UserPasswordReset {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token!: string;

    @Column({ type: "timestamp" })
    expirationAt!: Date;

    @Column({ default: false })
    used: boolean;

    @Column({ type: "timestamp", nullable: true })
    usedAt?: Date;

    @Column({ default: false })
    deleted: boolean;

    @ManyToOne(() => User, (user) => user.userPasswordReset)
    @JoinColumn({ name: "userId" })
    @Index("idx_fk_user_password_reset_userId")
    user!: User;
}
