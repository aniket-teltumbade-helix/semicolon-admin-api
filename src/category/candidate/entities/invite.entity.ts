import { Candidate } from './candidate.entity';
import { Auth } from '../../../auth/auth.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Invite {
  @Column({ type: 'string', nullable: false })
  @PrimaryColumn()
  invite_id: string;

  @Column({ type: 'varchar', nullable: false })
  magic_string: string;

  @Column({ type: 'tinyint', nullable: false, default: false })
  visited: boolean;

  @ManyToOne(() => Candidate)
  @JoinColumn({ name: 'email' })
  email: string;

  @ManyToOne(() => Auth)
  @JoinColumn({ name: 'admin_id' })
  test_id: string;
}
