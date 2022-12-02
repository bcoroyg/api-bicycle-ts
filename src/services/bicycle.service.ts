import { NotFound } from 'http-errors';
import models from '../database/models';

export class BicycleService {
  private static _bicycleServiceInstance: BicycleService;

  constructor() {}

  public static getInstance() {
    if (!BicycleService._bicycleServiceInstance) {
      BicycleService._bicycleServiceInstance = new BicycleService();
    }
    return BicycleService._bicycleServiceInstance;
  }

  //count bicycles
  async countBicycles() {
    const total = await models.Bicycle.countDocuments();
    return total;
  }

  //bicycles list
  async getBicycles() {
    const bicycles = await models.Bicycle.find({});
    return bicycles;
  }
  //get bicycle
  async getBicycleById(bicycleId: string) {
    const bicycle = await models.Bicycle.findById(bicycleId);
    if (!bicycle) {
      throw new NotFound(`bicycle with id ${bicycleId} not found!`);
    }
    return bicycle;
  }
  //create bicycle
  async createBicycle(bicycle: any) {
    const createdBicycle = await models.Bicycle.create(bicycle);
    return createdBicycle;
  }
  //update bicycle
  async updateBicycle(bicycleId: string, bicycle: any) {
    const updatedBicycle = await models.Bicycle.findByIdAndUpdate(
      bicycleId,
      bicycle,
      {
        new: true,
      }
    );
    if (!updatedBicycle) {
      throw new NotFound(`bicycle with id ${bicycleId} not found!`);
    }
    return updatedBicycle;
  }
  //delete bicycle
  async deleteBicycle(bicycleId: string) {
    const deletedBicycle = await models.Bicycle.findByIdAndDelete(bicycleId);
    if (!deletedBicycle) {
      throw new NotFound(`bicycle with id ${bicycleId} not found!`);
    }
    return deletedBicycle?._id;
  }
}
