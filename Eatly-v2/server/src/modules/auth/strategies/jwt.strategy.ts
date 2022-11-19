import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AccessTokenContent } from '../../../types/access-token-content.type';
import getenv from 'getenv';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'asda',
    });
  }

  async validate(payload: AccessTokenContent) {
    return { id: payload.id, email: payload.email };
  }
}
