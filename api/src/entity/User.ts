import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm'
import { Constitution } from './Constitution';
import { Government } from './Government';

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

    @Column({ nullable: true})
    constitutionId: number

    @OneToOne(() => Constitution)
    @JoinColumn()
    constitution: Constitution;

    @Column({ nullable: true})
    governmentId: number

    @OneToOne(() => Government)
    @JoinColumn()
    government: Government;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 0, default: () => 'NOW()'})
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;
}