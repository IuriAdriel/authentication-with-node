import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Base } from "./base/BaseEntity";
import { User } from "./User";

@Entity()
export class Mood extends Base {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name!: string;

    @Column({ default: true })
    active!: boolean;

    @ManyToOne((type) => User)
    @JoinColumn({ name: "userId" })
    @Index("idx_fk_mood_userId")
    user!: User;
}
