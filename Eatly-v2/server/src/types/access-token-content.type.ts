import { User } from '../modules/users/types/user.entity';

export type AccessTokenContent = Pick<User, 'id' | 'email'>;
