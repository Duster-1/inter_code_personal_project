import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text', { array: true })
  ingredients: string[]; 

  @ManyToOne(() => User, (user) => user.recipes, { eager: true })
  user: User;
}
