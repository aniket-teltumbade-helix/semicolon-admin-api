import { Auth } from "src/auth/auth.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('contest')
export class Test {
    @Column({ type: 'varchar' })
    @PrimaryColumn()
    contest_id: string;

    @Column({ type: 'int' })
    duration: number;

    @ManyToOne(() => Auth)
    @JoinColumn({ name: 'admin_id' })
    admin_id: string;
}
