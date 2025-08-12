import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { Recipe } from './recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
  ) {}


  async findAll(
    q?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Recipe[]; total: number; hasMore: boolean }> {
    const skip = (page - 1) * limit;
  
    const where = q && q.trim() !== ''
      ? [
          { title: ILike(`${q}%`) },
          { description: ILike(`${q}%`) }
        ]
      : {};
  
    const [data, total] = await this.recipesRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  
    const hasMore = page * limit < total;
  
    return { data, total, hasMore };
  }
  

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOne({ where: { id } });
    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }
  
  async create(createRecipeDto: CreateRecipeDto, user: any) {
    if (!createRecipeDto.imageUrl || createRecipeDto.imageUrl.trim() === '') {
      delete createRecipeDto.imageUrl;
    }
  
    const recipe = this.recipesRepository.create({
      ...createRecipeDto,
      user: { id: user.id },
    });
  
    return this.recipesRepository.save(recipe);
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
