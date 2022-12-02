import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../../../config';

export const JwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  },
  async (payload, cb) => {
    try {
      cb(null, payload);
    } catch (error) {
      cb(error);
    }
  }
);
