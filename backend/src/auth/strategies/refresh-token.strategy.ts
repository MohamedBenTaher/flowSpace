import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { Request } from 'express';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class refreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        refreshTokenStrategy.extractJWT,
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }
  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'refresh_token' in req.cookies) {
      return req.cookies.refresh_token;
    }
    return null;
  }
  validate(req: Request, payload: any) {
    const refreshToken = req.cookies.refresh_token;
    return { ...payload, refreshToken };
  }
}
