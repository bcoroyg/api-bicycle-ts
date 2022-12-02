import { BicycleService, UserService } from '../services';

const _userService = UserService.getInstance();
const _bicycleService = BicycleService.getInstance();

export const userIdExists = async (userId = '') => {
  try {
    const user = await _userService.getUserById(userId);
    if (!user) {
      throw new Error();
    }
  } catch (error) {
    if (error) {
      throw new Error(`User not found!.`);
    }
  }
};

export const bicycleIdExists = async (bicycleId = '') => {
  try {
    const bicycle = await _bicycleService.getBicycleById(bicycleId);
    if (!bicycle) {
      throw new Error();
    }
  } catch (error) {
    if (error) {
      throw new Error(`Bicycle not found!.`);
    }
  }
};

export const bicycleReserved = async (bicycleId = '') => {
  try {
    const bicycle = await _bicycleService.getBicycleByIdAndReserve(bicycleId);
    if (bicycle) {
      throw new Error();
    }
  } catch (error) {
    if (error) {
      throw new Error('Bicycle was already reserved!.');
    }
  }
};
