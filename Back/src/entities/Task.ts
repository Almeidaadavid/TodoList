import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from '../enums/index'

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    name: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({type: 'enum', enum: Status, default: Status.OPEN})
    status: Status;
}