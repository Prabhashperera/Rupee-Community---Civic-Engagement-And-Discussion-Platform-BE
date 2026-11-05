import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {UserRoles, UserStatus} from "../enum/user-role.enum.js";


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    userID: string

    @Column({ unique: true, length: 30 })
    username: string;

    @Column({ name: 'display_name', length: 50 })
    displayName: string;

    @Column({ name: 'user_password', select: false })
    password: string;

    @Column({
        type: 'enum',
        enum: UserRoles,
        default: UserRoles.USER,
    })
    userRole: string

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE
    })
    userStatus: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}