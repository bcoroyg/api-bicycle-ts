if (process.env.NODE_ENV !== 'production') {
  require('dotenv/config');
}

const config = {
  dev: process.env.NODE_ENV !== 'production',
  test: process.env.NODE_ENV === 'test',
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtTimeExpire: process.env.JWT_TIME_EXPIRE,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  hostFrontend: process.env.HOST_FRONTEND,
};

export default config;
