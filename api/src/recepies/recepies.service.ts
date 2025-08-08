import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { Recipe } from './recipe.entity';
import { InjectRepository} from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
  ) {}

  async findAll(q?: string): Promise<Recipe[]> {
    if (q && q.trim() !== '') {
      return this.recipesRepository.find({
        where: [
          { title: ILike(`${q}%`) },
          { description: ILike(`${q}%`) }
        ],
      });
    }
    return this.recipesRepository.find();
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOne({ where: { id } });
    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }

  async  create(createRecipeDto: CreateRecipeDto, user: any){
     return  this.recipesRepository.save({
      ...createRecipeDto,
      user: {
          id: user.userId
      },
    });
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto, user: User): Promise<Recipe> {
    const recipe = await this.findOne(id);
    if (recipe.user.id !== user.id) {
      throw new ForbiddenException('You can update only your own recipes');
    }
    Object.assign(recipe, updateRecipeDto);
    return this.recipesRepository.save(recipe);
  }

  async remove(id: number, user: User): Promise<void> {
    const recipe = await this.findOne(id);
    if (recipe.user.id !== user.id) {
      throw new ForbiddenException('You can delete only your own recipes');
    }
    await this.recipesRepository.delete(id);
  }
}
