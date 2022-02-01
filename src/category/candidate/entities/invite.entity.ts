import { Candidate } from './candidate.entity';
import { Auth } from "../../../auth/auth.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Invite {
    @Column({ type: 'string', nullable: false })
    @PrimaryColumn()
    invite_id: string;

    @Column({ type: 'int', nullable: false })
    pin: number;

    @OneToOne(() => Candidate, candidate => candidate.candidate_id)
    candidate: Candidate;

    @OneToOne(() => Auth, auth => auth.user_id)
    test_id: Auth;
}
