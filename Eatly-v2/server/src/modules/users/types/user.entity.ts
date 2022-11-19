import { Exclude } from 'class-transformer';

export class User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  deletedAt: string;

  @Exclude()
  password: string;
}
