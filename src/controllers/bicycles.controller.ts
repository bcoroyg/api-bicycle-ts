import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { BicycleService } from '../services';
import authorizeRoleHandler from '../utils/middlewares/authorizeRoleHandler';
import roleHandler from '../utils/roleHandler';
import {
  bicycleIdValidator,
  createBicycleValidator,
} from '../utils/validators';

const router = Router();
const _bicycleService = BicycleService.getInstance();

/**
 * @openapi
 * tags:
 *  - name: Bicycle
 *    description: Bicycle endpoits
 */

/**
 * @openapi
 * /bicycles:
 *    get:
 *      tags: [Bicycle]
 *      summary: "return all bicycles"
 *      responses:
 *        '200':
 *          description: all bicycles.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Bicycle"
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [bicycles, bicyclesTotal] = await Promise.all([
      _bicycleService.getBicycles(),
      _bicycleService.countBicycles(),
    ]);
    return res.status(200).json({
      total: bicyclesTotal,
      data: bicycles,
      msg: 'bicycles listed',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /bicycles/{bicycleId}:
 *    get:
 *      tags: [Bicycle]
 *      summary: "one bicycle"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the bicycle id
 *      responses:
 *        '200':
 *          description: one bicycle.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: "#/components/schemas/Bicycle"
 *        '404':
 *          description: Bicycle not found!.
 */
router.get(
  '/:bicycleId',
  bicycleIdValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { bicycleId } = req.params;
    try {
      const bicycle = await _bicycleService.getBicycleById(bicycleId);
      return res.status(200).json({
        data: bicycle,
        msg: 'bicycle retrieved',
      });
    } catch (error) {
      next(error);
    }
  }
);
/**
 * @openapi
 * /bicycles:
 *    post:
 *      tags: [Bicycle]
 *      summary: "create new bicycle"
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/Bicycle"
 *      responses:
 *        '201':
 *          description: new bicycle created!.
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoleHandler([roleHandler.Admin]),
  createBicycleValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { body: bicycle } = req;
    try {
      const createdBicycle = await _bicycleService.createBicycle(bicycle);
      res.status(201).json({
        data: createdBicycle,
        msg: 'bicycle created',
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /bicycles/{bicycleId}:
 *    put:
 *      tags: [Bicycle]
 *      summary: "update bicycle"
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the bicycle id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/Bicycle"
 *      responses:
 *        '200':
 *          description: bicycle updated!.
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 *        '404':
 *          description: Bicycle not found!.
 */
router.put(
  '/:bicycleId',
  passport.authenticate('jwt', { session: false }),
  authorizeRoleHandler([roleHandler.Admin]),
  async (req: Request, res: Response, next: NextFunction) => {
    const { bicycleId } = req.params;
    const { body: bicycle } = req;
    try {
      const updatedBicycle = await _bicycleService.updateBicycle(
        bicycleId,
        bicycle
      );
      return res.status(200).json({
        data: updatedBicycle,
        msg: 'bicycle updated',
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /bicycles/{bicycleId}:
 *    delete:
 *      tags: [Bicycle]
 *      summary: "delete bicycle"
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the bicycle id
 *      responses:
 *        '200':
 *          description: bicycle deleted!.
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 *        '404':
 *          description: Bicycle not found!.
 */
router.delete(
  '/:bicycleId',
  bicycleIdValidator,
  passport.authenticate('jwt', { session: false }),
  authorizeRoleHandler([roleHandler.Admin]),
  async (req: Request, res: Response, next: NextFunction) => {
    const { bicycleId } = req.params;
    try {
      const deletedBicycle = await _bicycleService.deleteBicycle(bicycleId);
      return res.status(200).json({
        data: deletedBicycle,
        msg: 'bicycle deleted',
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
