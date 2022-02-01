import { Auth } from 'src/auth/auth.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Candidate {
    @Column({ type: 'varchar', nullable: false })
    @PrimaryColumn()
    candidate_id: string;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Column({ type: 'int', nullable: false })
    number: number;

    @OneToOne(() => Auth, auth => auth.user_id)
    @Column({ type: 'varchar', nullable: false })
    user_id: Auth

}
