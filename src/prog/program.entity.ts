import { Auth } from 'src/auth/auth.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Program {
  @Column({ type: 'varchar', nullable: false })
  @PrimaryColumn()
  prog_id: string;

  @Column({ type: 'varchar', nullable: false })
  question: string;

  @Column({ type: 'varchar', nullable: false })
  input: string;

  @Column({ type: 'varchar', nullable: false })
  output: string;

  @Column({ type: 'int', nullable: false })
  time: number;

  @Column({ type: 'int', nullable: false })
  points: number;

  @ManyToOne(() => Auth)
  @JoinColumn({ name: 'user_id' })
  user_id: string
}
