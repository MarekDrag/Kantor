import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDto, UserDto, UpdateUserDto } from './dtos';
import { UsersRepository } from './users.repository';
import bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async registerUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const foundUserByEmail = await this.usersRepo.getUserByEmail(createUserDto.email);
    if (foundUserByEmail) {
      throw new ConflictException('there is already a user with this email');
    }

    const foundUserByUsername = await this.usersRepo.getUserByUsername(createUserDto.username);
    if (foundUserByUsername) {
      throw new ConflictException('there is already a user with this username');
    }

    const hash: string = await bcrypt.hash(createUserDto.password, 10);

    const newUser: CreateUserDto = { ...createUserDto, password: hash };

    const createdUserDb = await this.usersRepo.createUser(newUser);
    const createdUser = plainToClass(UserDto, createdUserDb);

    return createdUser;
  }

  async getUserById(userId: string): Promise<UserDto> {
    const foundUserDb = await this.usersRepo.getUserById(userId);
    const foundUser = plainToClass(UserDto, foundUserDb);
    return foundUser;
  }

  async getUserByEmail(email: string): Promise<UserDto> {
    const foundUserDb = await this.usersRepo.getUserByEmail(email);
    const foundUser = plainToClass(UserDto, foundUserDb);
    return foundUser;
  }

  async getUsers(): Promise<UserDto[]> {
    return this.usersRepo.getUsers();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    if (updateUserDto.password) {
      const hash: string = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hash;
    }

    const foundUserById = await this.usersRepo.getUserById(id);

    Object.keys(updateUserDto).forEach((key) => {
      if (foundUserById[key] === updateUserDto[key]) {
        throw new ConflictException(`you cannot change users field "${key}" to its current value`);
      }
    });

    if (updateUserDto.email) {
      const foundUserByEmail = await this.usersRepo.getUserByEmail(updateUserDto.email);
      if (foundUserByEmail) {
        throw new ConflictException('this email is already occupied');
      }
    }

    if (updateUserDto.username) {
      const foundUserByUsername = await this.usersRepo.getUserByEmail(updateUserDto.username);
      if (foundUserByUsername) {
        throw new ConflictException('this username is already occupied');
      }
    }

    const updatedUserDb = await this.usersRepo.updateUser(id, updateUserDto);

    const updatedUser = plainToClass(UserDto, updatedUserDb);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepo.deleteUser(id);
  }
}
