import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { RecipesService } from './recepies.service';
import { RecipesController } from './recepies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  providers: [RecipesService],
  controllers: [RecipesController],
})
export class RecipesModule {}
