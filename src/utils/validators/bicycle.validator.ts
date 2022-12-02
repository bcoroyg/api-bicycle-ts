import { check } from 'express-validator';
import { validatorHandler } from '../middlewares';

export const bicycleIdValidator = [
  check('bicycleId', 'ID is invalid').isMongoId(),
  validatorHandler,
];

export const createBicycleValidator = [
  check('model', 'Model is required').not().isEmpty(),
  check('model', 'Model is string').optional().isString(),
  check('color', 'Color is required').not().isEmpty(),
  check('color', 'Color is string').optional().isString(),
  validatorHandler,
];

export const updateBicycleValidator = [
  check('bicycleId', 'ID is invalid').isMongoId(),
  check('model', 'Model is string').optional().isString(),
  check('color', 'Color is string').optional().isString(),
  validatorHandler,
];
