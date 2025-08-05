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
  } from '@nestjs/common';
  import { RecipesService } from './recepies.service';
  import { CreateRecipeDto } from './dto/create-recipe.dto';
  import { UpdateRecipeDto } from './dto/update-recipe.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('recipes')
  export class RecipesController {
    constructor(private recipesService: RecipesService) {}
  
    @Get()
    findAll() {
      return this.recipesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.recipesService.findOne(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createRecipeDto: CreateRecipeDto, @Request() req) {
      return this.recipesService.create(createRecipeDto, req.user);
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
  