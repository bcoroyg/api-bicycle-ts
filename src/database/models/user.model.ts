import { compare, genSalt, hash } from 'bcrypt';
import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

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
UserSchema.plugin(uniqueValidator, { message: '{PATH} already exists.' });

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }
  next();
});

UserSchema.methods.toJSON = function () {
  const { __v, password, token, verified, ...user } = this.toObject();
  return user;
};

UserSchema.methods.verifyPassword = async function (password: string) {
  return await compare(password, this.password);
};

const User = model('user', UserSchema);

export default User;
