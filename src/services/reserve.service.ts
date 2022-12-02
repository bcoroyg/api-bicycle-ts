import { NotFound } from 'http-errors';
import models from '../database/models';

export class ReserveService {
  private static _reserveServiceInstance: ReserveService;

  constructor() {}

  public static getInstance() {
    if (!ReserveService._reserveServiceInstance) {
      ReserveService._reserveServiceInstance = new ReserveService();
    }
    return ReserveService._reserveServiceInstance;
  }

  //cantidad de reservas
  async countReserves() {
    const total = await models.Reserve.countDocuments();
    return total;
  }

  //lista reservas
  async getReserves() {
    const reserves = await models.Reserve.find({}).populate('user bicycle');
    return reserves;
  }

  //mostrar una reserva
  async getReserveById(reserveId: string) {
    const reserve = await models.Reserve.findById(reserveId).populate(
      'user bicycle'
    );
    if (!reserve) {
      throw new NotFound('reserve not found!');
    }
    return reserve;
  }

  //crear reserva
  async createReserve(reserve: any) {
    const bicycle = await models.Bicycle.findById(reserve.bicycle);
    bicycle!.reserved = true;
    await bicycle!.save();
    const createdReserve = await models.Reserve.create(reserve);
    return createdReserve;
  }

  //actualizar reserva
  async updateReserve(reserveId: string, reserve: any) {
    const reserveDB = await models.Reserve.findOne({
      _id: reserveId,
      user: reserve.user,
    });
    if (!reserveDB) {
      throw new NotFound('reserve not found!');
    }

    const updatedReserve = await models.Reserve.findByIdAndUpdate(
      reserveId,
      reserve,
      { new: true }
    ).populate('user bicycle');

    return updatedReserve;
  }

  //eliminar reserva
  async deleteReserve(reserveId: string) {
    const deletedReserve = await models.Reserve.findByIdAndDelete(reserveId);
    if (!deletedReserve) {
      throw new NotFound('reserve not found!');
    }
    return deletedReserve._id;
  }
}
