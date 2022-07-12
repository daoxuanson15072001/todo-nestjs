import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Task from './task.entity';

@Entity('admin')
export default class Admin {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email?: string;

  @Column({ name: 'password', type: 'varchar', length: 100, select: true })
  password?: string;

  @Column({
    name: 'status',
    type: 'tinyint',
    default: 1,
    comment: '1: Active, 0: Inactive, 2: Not verify',
  })
  status?: number;

  @Column({ name: 'is_super_admin', type: 'tinyint', default: 0 })
  isSuperAdmin?: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Full name of the user.',
  })
  name?: string;

  @Column({ name: 'role_id', type: 'tinyint' , default : 2})
  roleId : number;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 500,
    nullable: true,
    select: false,
  })
  refreshToken?: string;

  @UpdateDateColumn({ name: 'update_at', type: 'datetime' })
  updateAt?: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt?: string;

  @OneToMany(() => Task , (task) => task.admin_id)
  tasks : Task[];
}
