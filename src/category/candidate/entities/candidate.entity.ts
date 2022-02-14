import { Auth } from 'src/auth/auth.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Candidate {
  @Column({ type: 'varchar', nullable: false })
  @PrimaryColumn()
  candidate_id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  contact: string;

  @Column({ type: 'int', nullable: true })
  pin: number;

  @ManyToOne(() => Auth)
  @JoinColumn({ name: 'admin_id' })
  admin_id: string;
}
