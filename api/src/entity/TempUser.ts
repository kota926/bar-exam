import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class TempUser {
    @PrimaryColumn({ type: "varchar", length: 50, unique: true })
    name: string;

    @Column({ type: "text" })
    email: string;

    @Column({ type: "text" })
    password: string;

    @Column({ type: "text"})
    token: string

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 0, default: () => 'NOW()'})
    createdAt: Date;
}