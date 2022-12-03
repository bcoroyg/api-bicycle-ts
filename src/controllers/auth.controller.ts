import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { AuthService } from '../services';
import generateToken from '../utils/jwtHandler';
import {
  forgotPasswordAuthValidator,
  loginAuthValidator,
  registerUserValidator,
  resetPasswordAuthValidator,
} from '../utils/validators';

const router = Router();
const _authService = AuthService.getInstance();

/**
 * @openapi
 * tags:
 *  - name: Auth
 *    description: Auth endpoits
 */

/**
 * Login user
 * @openapi
 * /auth/login:
 *    post:
 *      tags: [Auth]
 *      summary: "Login user"
 *      description: login and return token
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 $ref: "#/components/schemas/authLogin"
 *      responses:
 *        '200':
 *          description: Return token.
 *        '401':
 *          description: User or password incorrect.
 */
router.post(
  '/login',
  loginAuthValidator,
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

/**
 * Register user
 * @openapi
 * /auth/register:
 *    post:
 *      tags: [Auth]
 *      summary: "Register user"
 *      description: Register and return user
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               $ref: "#/components/schemas/authRegister"
 *      responses:
 *        201:
 *          description: Return user and send email to activate account.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/accountCreated'
 *        400:
 *          description: Return message error.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/emailAlreadyExists'
 */
router.post(
  '/register',
  registerUserValidator,
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

/**
 * Confirmation Account
 * @openapi
 * /auth/confirmation-account/{token}:
 *    get:
 *      tags: [Auth]
 *      summary: "get a msg"
 *      parameters:
 *        - $ref: '#/components/parameters/token'
 *      responses:
 *        200:
 *          description: Account Activated!.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/accountActived'
 *        400:
 *          description: We did not find a user with this token.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/tokenNotFound'
 */
router.get(
  '/confirmation-account/:token',
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    try {
      const user = await _authService.confirmAccountUser(token);
      res.status(200).json({
        data: user,
        msg: 'Account actived!',
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Forgot Password
 * @openapi
 * /auth/forgot-password:
 *    post:
 *      tags: [Auth]
 *      summary: "Forgot password"
 *      description: sent email to reset the password
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               $ref: "#/components/schemas/authForgotPassword"
 *      responses:
 *        '200':
 *          description: An email was sent to reset the password.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/forgotPassword'
 *        '404':
 *          description: User not found!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/userNotFound'
 */
router.post(
  '/forgot-password',
  forgotPasswordAuthValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const user = await _authService.forgotPassword(email);
      res.status(200).json({
        data: user,
        msg: 'email was sent to reset the password!',
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Reset Password
 * @openapi
 * /auth/reset-password/{token}:
 *    post:
 *      tags: [Auth]
 *      summary: Reset password user
 *      description: Reset password
 *      parameters:
 *        - $ref: '#/components/parameters/token'
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               $ref: "#/components/schemas/authRegister"
 *      responses:
 *        200:
 *          description: Return user and send email to activate account.
 *
 *        401:
 *          description: User or password incorrect.
 *        400:
 *          description: We did not find a user with this token.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/tokenNotFound'
 */
router.post(
  '/reset-password/:token',
  resetPasswordAuthValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
      const user = await _authService.resetPassword(token, password);
      res.status(200).json({
        data: user,
        msg: 'password reset!',
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
