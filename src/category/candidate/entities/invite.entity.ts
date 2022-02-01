import { Candidate } from './candidate.entity';
import { Auth } from "../../../auth/auth.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Invite {
    @Column({ type: 'string', nullable: false })
    @PrimaryColumn()
    invite_id: string;

    @Column({ type: 'varchar', nullable: false })
    magic_string: string;

    @Column()
    candidate: string;

    @Column()
    test_id: string;
}
