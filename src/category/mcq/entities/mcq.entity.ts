import { Auth } from 'src/auth/auth.entity';
import { Test } from 'src/test/entities/test.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Mcq {
    @Column({ type: 'varchar', nullable: false })
    @PrimaryColumn()
    mcq_id: string;

    @Column({ type: 'varchar', nullable: false })
    question_number: number;

    @Column({ type: 'varchar', nullable: false })
    question: string;

    @Column({ type: 'varchar', nullable: false })
    a: string;

    @Column({ type: 'varchar', nullable: false })
    b: string;

    @Column({ type: 'varchar', nullable: false })
    c: string;

    @Column({ type: 'varchar', nullable: false })
    d: string;

    @Column({ type: 'varchar', nullable: false })
    answer: string;

    @Column({ type: 'int', nullable: false })
    points: number;

    @ManyToOne(() => Test)
    @JoinColumn({ name: 'contest_id' })
    contest_id: string
}
