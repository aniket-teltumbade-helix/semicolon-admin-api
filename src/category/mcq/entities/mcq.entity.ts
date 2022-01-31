import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Auth } from 'src/auth/auth.entity';

@Table
export class Mcq extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    mcq_id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    question_number: number;

    @Column({ type: DataType.STRING, allowNull: false })
    question: string;

    @Column({ type: DataType.STRING, allowNull: false })
    option1: string;

    @Column({ type: DataType.STRING, allowNull: false })
    option2: string;

    @Column({ type: DataType.STRING, allowNull: false })
    option3: string;

    @Column({ type: DataType.STRING, allowNull: false })
    option4: string;

    @Column({ type: DataType.STRING, allowNull: false })
    answer: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    time: number;

    @ForeignKey(() => Auth)
    @Column({ type: DataType.STRING, allowNull: false })
    user_id: string

    @BelongsTo(() => Auth)
    uuid: Auth
}
