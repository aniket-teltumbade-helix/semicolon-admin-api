import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Auth } from 'src/auth/auth.entity';

@Table
export class Prog extends Model {
  @Column
  prog_id: string;

  @Column
  question: string;

  @Column
  input: string;

  @Column
  output: string;

  @Column
  time: number;

  @ForeignKey(() => Auth)
  @Column
  user_id: string

  @BelongsTo(() => Auth)
  uuid: Auth
}
