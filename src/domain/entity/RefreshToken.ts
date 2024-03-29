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

@Entity("refresh_token")
export class RefreshToken extends Base {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    key!: string;

    @Column()
    active: boolean;

    @Column({ type: "timestamp" })
    expirationAt!: Date;

    @ManyToOne((type) => User)
    @JoinColumn({ name: "userId" })
    @Index("idx_fk_refresh_token_userId")
    user!: User;
}
