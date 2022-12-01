import { model, Schema } from 'mongoose';

const ReserveSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  bicycle: {
    type: Schema.Types.ObjectId,
    ref: 'bicycle',
  },
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },
});

const Reserve = model('reserve', ReserveSchema);

export default Reserve;
