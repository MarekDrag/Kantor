import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { AccessTokenContent } from '../../../types/access-token-content.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, passport: string): Promise<AccessTokenContent> {
    const accessTokenContent: AccessTokenContent = await this.authService.validateUser(email, passport);

    if (!accessTokenContent) {
      throw new UnauthorizedException();
    }

    return accessTokenContent;
  }
}
