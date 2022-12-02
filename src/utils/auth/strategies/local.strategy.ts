import { Strategy } from 'passport-local';
import { BadRequest } from 'http-errors';
import { UserService } from '../../../services';

const userService = UserService.getInstance();

export const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user: any = await userService.getUserByEmail(email);
      //Verifica si el usuario existe
      if (!user) {
        return done(new BadRequest('Incorrect email and/or password.'), false);
      }

      //Verifica si el password es correcto
      if (!(await user.verifyPassword(password, user.password))) {
        return done(new BadRequest('Incorrect email and/or password.'), false);
      }
      //retorna el usuario
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
