import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'
import { Question } from './Question'

@Entity()
export class Choice {
    @PrimaryColumn("varchar", { length: 10 })
    id: string;

    @Column("varchar", { length: 5 })
    subject: string;

    @Column()
    year: number;

    @Column()
    c_num: number;

    @Column("varchar", { length: 2})
    unit: string;

    @Column("varchar", { length: 1 })
    answer: string;

    @Column("text")
    c1: string;

    @Column({nullable: true, type:"text"})
    c2: string;

    @ManyToOne(() => Question, question => question.choices)
    question: Question;
}