import { Exclude } from 'class-transformer';

export class UserDto {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  deletedAt: string;
  @Exclude({ toPlainOnly: true })
  password: string;
}
