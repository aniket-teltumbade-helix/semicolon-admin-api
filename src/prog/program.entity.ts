import { Auth } from 'src/auth/auth.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

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

  @OneToOne(() => Auth, auth => auth.user_id)
  @JoinColumn()
  user_id: string
}
