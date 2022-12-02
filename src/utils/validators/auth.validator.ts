import { check } from 'express-validator';
import { validatorHandler } from '../middlewares';

export const registerUserValidator = [
  check('name', 'Name is required.').not().isEmpty(),
  check('email', 'Email is required.').not().isEmpty(),
  check('email', 'Email is invalid').optional().isEmail(),
  check('password', 'Password is required.').not().isEmpty(),
  check('password', 'Password must be at least 6 characters long.')
    .optional()
    .isLength({ min: 6 }),
  check('confirmPassword', 'Password confirm is required.').not().isEmpty(),
  check('confirmPassword', 'Not match the password.')
    .optional()
    .not()
    .custom((value, { req }) => req.body.password !== value),
  validatorHandler,
];

export const loginAuthValidator = [
  check('email', 'Email is required.').not().isEmpty(),
  check('email', 'Email is invalid').optional().isEmail(),
  check('password', 'Password is required.').not().isEmpty(),
  validatorHandler,
];

export const forgotPasswordAuthValidator = [
  check('email', 'Email is required.').not().isEmpty(),
  check('email', 'Email is invalid').optional().isEmail(),
  validatorHandler,
];

export const resetPasswordAuthValidator = [
  check('password', 'Password is required.').not().isEmpty(),
  check('password', 'Password must be at least 6 characters long.')
    .optional()
    .isLength({
      min: 6,
    }),
  check('confirmPassword', 'Password confirm is required.').not().isEmpty(),
  check('confirmPassword', 'Not match the password.')
    .optional()
    .not()
    .custom((value, { req }) => req.body.password !== value),
  validatorHandler,
];
