if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

const config = {
  dev: process.env.NODE_ENV !== "production",
  test: process.env.NODE_ENV === "test",
  port: process.env.PORT,
};

export default config;
