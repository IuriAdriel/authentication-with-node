import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Base {
    @CreateDateColumn({ type: "timestamp", name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;

    @Column({ default: false })
    deleted!: boolean;
}
