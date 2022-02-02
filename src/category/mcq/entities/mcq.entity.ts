import { Auth } from 'src/auth/auth.entity';
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
    option1: string;

    @Column({ type: 'varchar', nullable: false })
    option2: string;

    @Column({ type: 'varchar', nullable: false })
    option3: string;

    @Column({ type: 'varchar', nullable: false })
    option4: string;

    @Column({ type: 'varchar', nullable: false })
    answer: string;

    @Column({ type: 'int', nullable: false })
    time: number;

    @Column({ type: 'int', nullable: false })
    points: number;

    @ManyToOne(() => Auth)
    @JoinColumn({ name: 'user_id' })
    user_id: string
}
