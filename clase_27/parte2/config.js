process.env.NODE_ENV = "dev";
process.env.PORT = 8080;
process.env.DEBUG = true;

const config = {
  NODE_ENV: process.env.NODE_ENV || "prod",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 0,
  DEBUG: process.env.DEBUG || false,
};

export default config;
