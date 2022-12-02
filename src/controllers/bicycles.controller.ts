import { Router } from 'express';
import { BicycleService } from '../services';

const router = Router();
const _bicycleService = BicycleService.getInstance();

router.get('/', async (req, res, next) => {
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

router.get('/:bicycleId', async (req, res, next) => {
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
});

router.post('/', async (req, res, next) => {
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
});

router.put('/:bicycleId', async (req, res, next) => {
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
});

router.delete('/:bicycleId', async (req, res, next) => {
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
});

export default router;
