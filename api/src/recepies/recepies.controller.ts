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
    async findAll(
      @Query('q') q?: string,
      @Query('page') page = '1',
      @Query('limit') limit = '10',
    ) {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
    
      const { data, total } = await this.recipesService.findAll(q, pageNum, limitNum);
    
      return {
        data,
        total,
        hasMore: pageNum * limitNum < total,
      };
    }
    
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.recipesService.findOne(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createRecipeDto: any, @Request() req) {
      console.log(JSON.stringify(createRecipeDto))  
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
  