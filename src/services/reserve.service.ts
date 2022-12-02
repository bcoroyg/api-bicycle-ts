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
    return reserve;
  }

  //crear reserva
  async createReserve(reserve: any) {
    const bicycle = await models.Bicycle.findById(reserve.bicycle);
    if (bicycle) {
      bicycle.reserved = true;
      await bicycle.save();
    }
    const createdReserve = await models.Reserve.create(reserve);
    return createdReserve;
  }

  //actualizar reserva
  async updateReserve(reserveId: string, reserve: any) {
    if (reserve.bicycle) {
      const reserveOld = await models.Reserve.findById(reserveId);
      const bicycleOld = await models.Bicycle.findById(reserveOld?.bicycle);
      const bicycleNew = await models.Bicycle.findById(reserve.bicycle);
      bicycleOld!.reserved = false;
      await bicycleOld!.save();
      bicycleNew!.reserved = true;
      await bicycleNew!.save();
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
    return deletedReserve?._id;
  }
}
