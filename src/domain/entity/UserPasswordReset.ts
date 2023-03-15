import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
} from "typeorm";
import { Base } from "./base/BaseEntity";
import { User } from "./User";

@Entity("user_password_reset")
export class UserPasswordReset extends Base {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Column()
    token!: string;

    @Column({ type: "timestamp" })
    expirationAt!: Date;

    @Column({ default: false })
    used: boolean;

    @Column({ type: "timestamp", nullable: true })
    usedAt?: Date;

    @ManyToOne((type) => User)
    @JoinColumn({ name: "userId" })
    @Index("idx_fk_user_password_reset_userId")
    user!: User;
}
