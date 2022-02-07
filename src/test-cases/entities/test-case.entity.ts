import { Program } from "src/prog/program.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('testcases')
export class TestCase {

    @Column({ type: 'varchar', nullable: false })
    @PrimaryColumn()
    testcase_id: string;

    @Column({ type: 'varchar', nullable: false })
    input: string;

    @Column({ type: 'varchar', nullable: false })
    output: string;

    @ManyToOne(() => Program)
    @JoinColumn({ name: 'program_id' })
    program_id: string;
}
