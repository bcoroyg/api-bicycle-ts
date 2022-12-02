import passport from 'passport';
import { JwtStrategy, LocalStrategy } from './strategies';

passport.use(LocalStrategy);
passport.use(JwtStrategy);
