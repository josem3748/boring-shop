import express from "express";
const app = express();

import log4js from "log4js";

log4js.configure({
  appenders: {
    consola: { type: "console" },
    archivo: { type: "file", filename: "debug.log" },
    archivo2: { type: "file", filename: "errores.log" },
    loggerArchivo: {
      type: "logLevelFilter",
      appender: "archivo",
      level: "debug",
    },
    loggerArchivo2: {
      type: "logLevelFilter",
      appender: "archivo2",
      level: "error",
    },
  },
  categories: {
    default: { appenders: ["consola"], level: "trace" },
    dev: { appenders: ["consola"], level: "info" },
    prod: { appenders: ["loggerArchivo", "loggerArchivo2"], level: "all" },
  },
});

process.env.NODE_ENV = "PROD";

let logger;

if (process.env.NODE_ENV === "PROD") {
  logger = log4js.getLogger("prod");
} else {
  logger = log4js.getLogger("dev");
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
