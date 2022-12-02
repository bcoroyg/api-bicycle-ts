import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { ReserveService } from '../services';

const router = Router();
const _reserveService = ReserveService.getInstance();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
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

router.get(
  '/:reserveId',
  passport.authenticate('jwt', { session: false }),
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

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
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

router.put(
  '/:reserveId',
  passport.authenticate('jwt', { session: false }),
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

router.delete(
  '/:reserveId',
  passport.authenticate('jwt', { session: false }),
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
