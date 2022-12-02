import { Router } from 'express';
import { AuthService } from '../services';

const router = Router();
const _authService = AuthService.getInstance();

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
