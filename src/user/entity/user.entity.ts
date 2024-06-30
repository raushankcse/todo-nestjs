
import { Todo } from "src/todo/entity/todo.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';


@Entity({name: 'User'})
export class User{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text',unique: true, nullable : false})
  username: string;

  @Column({type:'text' ,unique: true, nullable : false})
  email: string;

  @Column({type: 'text'})
  password: string;

  @OneToMany(()=> Todo, todo => todo.user)
  todos: Todo[]


}