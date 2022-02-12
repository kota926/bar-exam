import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Company {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ type: 'int', default: 0 })
    1: number;
    
    @Column({ type: 'int', default: 0 })
    2: number;

    @Column({ type: 'int', default: 0 })
    3: number;

    @Column({ type: 'int', default: 0 })
    4: number;

    @Column({ type: 'int', default: 0 })
    5: number;

    @Column({ type: 'int', default: 0 })
    6: number;
    
    @Column({ type: 'int', default: 0 })
    7: number;

    @Column({ type: 'int', default: 0 })
    8: number;

    @Column({ type: 'int', default: 0 })
    9: number;

    @Column({ type: 'int', default: 0 })
    10: number;

    @Column({ type: 'int', default: 0 })
    11: number;

    @Column({ type: 'int', default: 0 })
    12: number;

    @Column({ type: 'int', default: 0 })
    13: number;

    @Column({ type: 'int', default: 0 })
    14: number;

    @Column({ type: 'int', default: 0 })
    15: number;

    @Column({ type: 'int', default: 0 })
    16: number;

    @Column({ type: 'int', default: 0 })
    17: number;
}