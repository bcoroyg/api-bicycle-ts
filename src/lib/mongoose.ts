import mongoose from 'mongoose';
import config from '../config';

const DB_USER = encodeURIComponent(<string>config.dbUser);
const DB_PASSWORD = encodeURIComponent(<string>config.dbPassword);

const MONGO_URI = config.dev
  ? `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}?retryWrites=true&w=majority`
  : `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;

const dbConnection = async () => {
  try {
    mongoose.connect(MONGO_URI);
    console.log('Connect success DB');
  } catch (error) {
    throw new Error('Error connect DB');
  }
};

export default dbConnection;
