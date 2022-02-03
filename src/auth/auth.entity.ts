import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('admin')
export class Auth {
  @Column({ type: 'varchar', nullable: false })
  @PrimaryColumn()
  admin_id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  last_name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar' })
  test_name: string;
}
