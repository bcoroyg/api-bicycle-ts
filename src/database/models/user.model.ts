import { model, Schema } from 'mongoose';

const validateEmail = (email: string) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, 'Please, enter a valid email.'],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Customer',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
});

const User = model('user', UserSchema);

export default User;
