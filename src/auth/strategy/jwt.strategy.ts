import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public static jwtSecret = process.env.SECRET_TOKEN;
  public static jwtSecretRefresh = process.env.SECRET_REFRESH_TOKEN;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtStrategy.jwtSecret,
    });
  }

  public validate(payload) {
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  }
}
