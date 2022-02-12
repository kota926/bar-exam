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
import { Civil } from './Civil'
import { Company } from './Company'

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

    @Column({ type: 'varchar', length: 8, nullable: true })
    lastSubject: string

    @Column({ type: 'varchar', length: 2, nullable: true })
    lastUnit: string

    @Column({ type: 'int', width: 3, nullable: true })
    lastNumber: number

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

    @Column({ nullable: true})
    civilId: number

    @OneToOne(() => Civil)
    @JoinColumn()
    civil: Civil;

    @Column({ nullable: true})
    companyId: number

    @OneToOne(() => Company)
    @JoinColumn()
    company: Company;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 0, default: () => 'NOW()'})
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;
}