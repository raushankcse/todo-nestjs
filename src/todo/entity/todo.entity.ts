import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Todo'})
export class Todo{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type: 'text' ,nullable: false})
  title: string;

  @Column({default: false})
  completed: boolean;

  @Column()
  userId: number;

  @ManyToOne(()=> User, user=>user.todos)
  @JoinColumn({name: 'userId'})
  user: User;
}