import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { AccessTokenContent } from 'src/types/access-token-content.type';
import { UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<AccessTokenContent | null> {
    const foundUser = await this.usersService.getUserByEmail(email);

    const matched = await bcrypt.compare(password, foundUser?.password || '');
    if (!matched) {
      return null;
    }
    return { id: foundUser.id, email: foundUser.email };
  }

  async getAccessToken(user: AccessTokenContent): Promise<{ accessToken: string }> {
    return { accessToken: this.jwtService.sign(user) };
  }
}
