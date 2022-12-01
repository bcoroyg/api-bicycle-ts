import { model, Schema } from 'mongoose';

const BicycleSchema = new Schema({
  code: {
    type: String,
    unique: true,
  },
  color: {
    type: String,
  },
  model: {
    type: String,
  },
  reserved: {
    type: Boolean,
    default: false,
  },
});

const Bicycle = model('bicycle', BicycleSchema);

export default Bicycle;
