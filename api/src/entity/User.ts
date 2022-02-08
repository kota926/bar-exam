import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: "varchar", length: 50, unique: true })
    name: string;

    @Column({ type: "text" })
    email: string;

    @Column({ type: "text" })
    password: string;

    @Column({ type: 'varchar', length: 9, nullable: true })
    lastQuestion: string

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 0, default: () => 'NOW()'})
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;
}