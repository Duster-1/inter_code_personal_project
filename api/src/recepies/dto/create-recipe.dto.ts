import { IsString, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ingredients: string[];

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
