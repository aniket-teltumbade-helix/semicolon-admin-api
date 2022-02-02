import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class Auth {
  @Column({ type: 'varchar', nullable: false })
  @PrimaryColumn()
  user_id: string;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  first_name: string;

  @Column({ type: 'varchar', nullable: false })
  last_name: string;

  @Column({ type: 'varchar' })
  test_name: string;
}
