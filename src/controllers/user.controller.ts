import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/createuser.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    return await this.userService.createUser(body.username);
  }
}
