import { CreateUserDto } from '../dtos';
import { User } from '../types';

export const defaultUser: User = {
  id: 'f02bfdea-e383-4a4b-a877-5dc67327d2c8',
  username: 'username',
  password: 'pwd',
  firstName: 'Kamil',
  lastName: 'Nowak',
  email: 'test@gmail.com',
  createdAt: '',
  deletedAt: null,
};

export const defaultCreateUserDto: CreateUserDto = {
  firstName: 'Kamil',
  lastName: 'Nowak',
  email: 'Kamil.Nowak@gmail.com',
  username: 'Kamilek',
  password: 'password',
};
