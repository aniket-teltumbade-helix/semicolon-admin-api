import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import { Auth } from 'src/auth/auth.entity';

@Table
export class Candidate extends Model {
    @Column
    cadidate_id: string;

    @Column
    name: string;

    @Column
    email: string;

    @Column
    number: number;
    @Column

    @ForeignKey(() => Auth)
    @Column({ type: DataType.STRING, allowNull: false })
    user_id: string

    @BelongsTo(() => Auth)
    uuid: Auth
}
