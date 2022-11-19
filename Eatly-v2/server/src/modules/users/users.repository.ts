import { InjectKnex, Knex as KnexModule } from 'nestjs-knex';
import { Knex } from 'knex';
import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { User } from './types';

@Injectable()
export class UsersRepository {
  private users: () => Knex.QueryBuilder<User>;

  constructor(@InjectKnex() knex: KnexModule) {
    this.users = () => knex<User>('users');
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const foundUser: User = await this.users().where('email', email).andWhere('deletedAt', null).first();

    if (!foundUser) {
      return null;
    }
    return foundUser;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const foundUser = await this.users().where('username', username).andWhere('deletedAt', null).first();

    if (!foundUser) {
      return null;
    }
    return foundUser;
  }

  async getUserById(id: string): Promise<User | null> {
    const foundUser = await this.users().where('id', id).andWhere('deletedAt', null).first();

    if (!foundUser) {
      return null;
    }

    return foundUser;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User | null> {
    const [createdUser]: User[] = await this.users().insert(createUserDto).returning('*');
    return createdUser;
  }

  async getUsers(): Promise<User[]> {
    const foundUsers = await this.users()
      .select(['id', 'lastName', 'firstName', 'username', 'email', 'createdAt'])
      .where('deletedAt', null);

    if (foundUsers.length == 0) {
      throw new NotFoundException('users not found');
    }

    return foundUsers;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException('empty object');
    }

    const foundUser = await this.getUserById(id);

    if (!foundUser) {
      throw new NotFoundException('user not found');
    }
    const updatedUser = await this.users().where('id', id).update(updateUserDto).returning(['*']);
    return updatedUser[0];
  }

  async deleteUser(id: string): Promise<void> {
    const foundUser = await this.getUserById(id);
    if (!foundUser) {
      throw new NotFoundException('user not found');
    }
    if (foundUser.deletedAt) {
      throw new ConflictException('This user is already deleted');
    }

    await this.users().where('id', id).update('deletedAt', new Date().toISOString());
  }
}
