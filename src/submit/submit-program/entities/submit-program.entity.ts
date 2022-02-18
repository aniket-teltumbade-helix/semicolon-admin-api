import { Candidate } from 'src/category/candidate/entities/candidate.entity';
import { Program } from 'src/prog/program.entity';
import { Test } from 'src/test/entities/test.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class SubmitProgram {
    @Column({ type: 'varchar', nullable: false })
    @PrimaryColumn()
    sub_id: string;

    @Column({ type: 'varchar', nullable: false })
    script: string;

    @Column({ type: 'int', nullable: false })
    points: number;

    @ManyToOne(() => Test)
    @JoinColumn({ name: 'contest_id' })
    contest_id: string;

    @ManyToOne(() => Program)
    @JoinColumn({ name: 'prog_id' })
    prog_id: string;

    @ManyToOne(() => Candidate)
    @JoinColumn({ name: 'candidate_id' })
    candidate_id: string;
}
