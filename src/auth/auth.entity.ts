import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Auth extends Model {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  first_name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  last_name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  test_name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false, primaryKey: true })
  user_id: string;
}
