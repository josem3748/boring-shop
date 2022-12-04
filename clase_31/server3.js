import express from "express";
const app = express();

import winston from "winston";

const loggerDev = winston.createLogger({
  transports: [new winston.transports.Console({ level: "info" })],
});

const loggerProd = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "debug.log", level: "debug" }),
    new winston.transports.File({ filename: "errores.log", level: "error" }),
  ],
});

process.env.NODE_ENV = "PROD";

let logger;

if (process.env.NODE_ENV === "PROD") {
  logger = loggerProd;
} else {
  logger = loggerDev;
}

app.get("/sumar", (req, res) => {
  const num1 = req.query.num1;
  const num2 = req.query.num2;

  if (isNaN(num1)) {
    const mensaje = `num1 no válido: ${num1}`;
    logger.error(mensaje);
    res.send(mensaje);
    return;
  } else if (isNaN(num2)) {
    const mensaje = `num2 no válido: ${num2}`;
    logger.error(mensaje);
    res.send(mensaje);
    return;
  }

  const suma = parseInt(num1) + parseInt(num2);

  logger.info(`Todo OK. La suma es: ${suma}`);
  res.send(`${suma}`);
});

// this is default in case of unmatched routes
app.use((req, res) => {
  // Invalid request
  logger.warn(
    `ruta '${req.originalUrl}' método '${req.method}' no implementada`
  );
  res.json({
    error: -2,
    descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
  });
});

process.env.port = 8081;

var PORT = process.env.port || 8080;

const server = app.listen(PORT, (err) => {
  if (err) logger.error(err);
  console.log(
    `Listen to port ${server.address().port} process id: ${process.pid}`
  );
});
