import { Router } from 'express';
import passport from 'passport';
import { AuthService } from '../services';
import generateToken from '../utils/jwtHandler';

const router = Router();
const _authService = AuthService.getInstance();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
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

router.post('/register', async (req, res, next) => {
  const { body: user } = req;
  try {
    const createdUser = await _authService.registerUser(user);
    res.status(201).json({
      data: createdUser,
      msg: 'user registered!',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
