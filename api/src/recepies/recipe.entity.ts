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

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    nullable: true,
    default: 'https://media.istockphoto.com/id/1409329028/uk/векторні-зображення/немає-доступного-зображення-заповнювача-ескіз-ескізу-ілюстрація-дизайн.jpg?s=1024x1024&w=is&k=20&c=f-Hw4GgpXiZ7-aneLLoVCJZn2nO49o8NSgoGFIqhDEY='
  })
  imageUrl?: string;

  @ManyToOne(() => User, (user) => user.recipes, { eager: true })
  user: User;
}
