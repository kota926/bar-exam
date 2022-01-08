import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { Choice } from './Choice'

@Entity()
export class Question {
    @PrimaryColumn("varchar", { length: 9 })
    id: string;

    @Column()
    q_num: number;

    @Column("varchar", { length: 1 })
    type: string;

    @Column('text')
    question: string;

    @Column({nullable: true, type: 'text'})
    reference: string;

    @OneToMany(() => Choice, choice => choice.question)
    choices: Choice[];
}