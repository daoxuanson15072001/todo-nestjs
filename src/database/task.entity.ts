import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Member from "./member.entity";
import Admin from "./admin.entity";

@Entity('task')
export default class Task {
    @PrimaryGeneratedColumn({ name : 'id' , type : 'bigint' , unsigned : true})
    id : number;

    @Column({ name: 'admin_id', type: 'bigint', unsigned: true, nullable: true })
    admin_id : number;

    @Column({name : 'title' , type : 'varchar', nullable : true})
    title : string;

    @Column({ name: 'start_time', type: 'varchar', nullable: false})
    start_time: string;

    @Column({ name: 'end_time', type: 'varchar', nullable: false})
    end_time: string;

    @Column({ name: 'start_date', type: 'varchar', length: 20 , nullable: true})
    start_date: string;

    @Column({name : 'description' , type : 'varchar' , length : 255 , nullable : true})
    description : string;

    @Column({ name: 'status', type: 'tinyint', default: 1, comment: '1: Active, 0: Inactive' })
    status?: number;

    @Column({ name: 'update_by', type: 'bigint', unsigned: true, nullable: true })
    updateBy?: number;

    @UpdateDateColumn({ name: 'update_at', type: 'datetime', nullable: true })
     updateAt?: number;

    @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: true })
    createdAt?: number;

    @ManyToOne(() => Admin)
    @JoinColumn({name : 'admin_id' , referencedColumnName : 'id'})
    admin : Admin;
    
    @ManyToMany(() => Member)
    @JoinTable()
    members : Member[];
}