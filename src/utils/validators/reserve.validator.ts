import { check } from 'express-validator';
import { validatorHandler } from '../middlewares';
import {
  bicycleIdExists,
  bicycleReserved,
  userIdExists,
} from '../validatorsCustomHandler';

export const reserveIdValidator = [
  check('reserveId', 'ID is invalid').isMongoId(),
  validatorHandler,
];

export const createReserveValidator = [
  check('user', 'User is required').not().isEmpty(),
  check('user').optional().custom(userIdExists),
  check('bicycle', 'Bicycle is required!').not().isEmpty(),
  check('bicycle').optional().custom(bicycleIdExists),
  check('bicycle').optional().custom(bicycleReserved),
  check('from', 'From is required').not().isEmpty(),
  check('to', 'To is required').not().isEmpty(),
  validatorHandler,
];

export const updateReserveValidator = [
  check('reserveId', 'ID is invalid').isMongoId(),
  check('user', 'User is required').not().isEmpty(),
  check('from').optional().toDate(),
  check('to').optional().toDate(),
  validatorHandler,
];
