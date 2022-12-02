if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

const config = {
  dev: process.env.NODE_ENV !== "production",
  test: process.env.NODE_ENV === "test",
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtTimeExpire: process.env.JWT_TIME_EXPIRE,
};

export default config;
