import { Body, Controller, Delete, Get, Param, Patch, Request, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth';
import { GetUserDto, UpdateUserDto } from './dtos';
import { UserJwtPayload } from './interfaces';
import { User } from './types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersControllers {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getByToken(@Request() req: UserJwtPayload): Promise<User> {
    return this.usersService.getUserById(req.user.id);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param() getUserDto: GetUserDto): Promise<User> {
    return this.usersService.getUserById(getUserDto.id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateUserByToken(@Request() req: UserJwtPayload, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(req.user.id, updateUserDto);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateUserById(@Param('id', ParseUUIDPipe) id, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteUserByToken(@Request() req: UserJwtPayload): Promise<void> {
    await this.usersService.deleteUser(req.user.id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUserById(@Param('id', ParseUUIDPipe) id): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
