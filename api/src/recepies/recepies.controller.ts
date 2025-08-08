import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    UseGuards,
    Request,
    ParseIntPipe,
    Query
  } from '@nestjs/common';
  import { RecipesService } from './recepies.service';
  import { CreateRecipeDto } from './dto/create-recipe.dto';
  import { UpdateRecipeDto } from './dto/update-recipe.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
  import { Recipe } from './recipe.entity'
  
  @Controller('recipes')
  export class RecipesController {
    constructor(private recipesService: RecipesService) {}
  
    @Get()
    findAll(@Query('q') q?: string): Promise<Recipe[]> {
      return this.recipesService.findAll(q);
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.recipesService.findOne(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createRecipeDto: any, @Request() req) {
      return await this.recipesService.create(createRecipeDto, req.user);
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateRecipeDto: UpdateRecipeDto,
      @Request() req,
    ) {
      return this.recipesService.update(id, updateRecipeDto, req.user);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
      return this.recipesService.remove(id, req.user);
    }
  }
  