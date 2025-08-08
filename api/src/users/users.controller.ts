import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    ParseIntPipe,
    UseGuards
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
  
  
  @Controller('users')
  export class UsersController {
    constructor(private usersService: UsersService) {}
  
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.findById(id);
    }
  
  
    @Patch(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.usersService.update(id, updateUserDto);
    }
  }
  