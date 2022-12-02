import { model, Schema } from 'mongoose';
import { generate } from 'shortid';

const BicycleSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

BicycleSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.code = generate();
  }
  next();
});

const Bicycle = model('bicycle', BicycleSchema);

export default Bicycle;
