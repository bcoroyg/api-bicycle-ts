import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { ReserveService } from '../services';
import authorizeRoleHandler from '../utils/middlewares/authorizeRoleHandler';
import roleHandler from '../utils/roleHandler';
import {
  createReserveValidator,
  reserveIdValidator,
  updateReserveValidator,
} from '../utils/validators';

const router = Router();
const _reserveService = ReserveService.getInstance();

/**
 * @openapi
 * tags:
 *  - name: Reserve
 *    description: Reserve endpoits
 */

/**
 * @openapi
 * /reserves:
 *    get:
 *      tags: [Reserve]
 *      summary: "return all reserves"
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        '200':
 *          description: all reserves.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Reserve"
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoleHandler([roleHandler.Admin]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [reserves, reservesTotal] = await Promise.all([
        _reserveService.getReserves(),
        _reserveService.countReserves(),
      ]);
      return res.status(200).json({
        total: reservesTotal,
        data: reserves,
        msg: 'reserves listed',
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /reserves:
 *    post:
 *      tags: [Reserve]
 *      summary: "create new reserve"
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/Reserve"
 *      responses:
 *        '201':
 *          description: new reserve created!.
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createReserveValidator,
  authorizeRoleHandler([roleHandler.Customer]),
  async (req: Request, res: Response, next: NextFunction) => {
    const { body: reserve } = req;
    try {
      const createdReserve = await _reserveService.createReserve(reserve);
      res.status(201).json({
        data: createdReserve,
        msg: 'reserve created',
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /reserves/{reserveId}:
 *    get:
 *      tags: [Reserve]
 *      summary: "one reserve"
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the reserve id
 *      responses:
 *        '200':
 *          description: one reserve.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: "#/components/schemas/Reserve"
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 *        '404':
 *          description: Reserve not found!.
 */
router.get(
  '/:reserveId',
  passport.authenticate('jwt', { session: false }),
  authorizeRoleHandler([roleHandler.Admin]),
  reserveIdValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { reserveId } = req.params;
    try {
      const reserve = await _reserveService.getReserveById(reserveId);
      return res.status(200).json({
        data: reserve,
        msg: 'reserve retrieved',
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /reserves/{reserveId}:
 *    put:
 *      tags: [Reserve]
 *      summary: "update reserve"
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the reserve id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/Reserve"
 *      responses:
 *        '200':
 *          description: reserve updated!.
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 */
router.put(
  '/:reserveId',
  passport.authenticate('jwt', { session: false }),
  authorizeRoleHandler([roleHandler.Admin]),
  updateReserveValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { reserveId } = req.params;
    const { body: reserve } = req;
    try {
      const updatedReserve = await _reserveService.updateReserve(
        reserveId,
        reserve
      );
      return res.status(200).json({
        data: updatedReserve,
        msg: 'reserve updated',
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /reserves/{reserveId}:
 *    delete:
 *      tags: [Reserve]
 *      summary: "delete reserve"
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the reserve id
 *      responses:
 *        '200':
 *          description: reserve deleted!.
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 *        '404':
 *          description: Reserve not found!.
 */
router.delete(
  '/:reserveId',
  passport.authenticate('jwt', { session: false }),
  authorizeRoleHandler([roleHandler.Admin]),
  reserveIdValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { reserveId } = req.params;
    try {
      const deletedReserve = await _reserveService.deleteReserve(reserveId);
      return res.status(200).json({
        data: deletedReserve,
        msg: 'reserve deleted',
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
