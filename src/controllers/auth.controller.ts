import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { AuthService } from '../services';
import generateToken from '../utils/jwtHandler';

const router = Router();
const _authService = AuthService.getInstance();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    try {
      const token = await generateToken(user);
      res.status(200).json({
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    const { body: user } = req;
    try {
      const createdUser = await _authService.registerUser(user);
      res.status(201).json({
        data: createdUser,
        msg: 'account confirmation email sent!',
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
