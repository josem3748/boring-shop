//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////  Test USER: jose ////////////////////////////////////////
////////////////////////////////////////  Test PASS: 123  ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

import { loggerConsole, loggerFile } from "./middlewares/loggers.js";

app.set("view engine", "ejs"); // motor de plantillas a utilizar
app.set("views", "../views"); // especifica el directorio de vistas

import apiProductos from "./routes/apiProductos.js";
app.use("/api/productos", apiProductos);

import apiCarrito from "./routes/apiCarrito.js";
app.use("/api/carrito", apiCarrito);

import login from "./routes/login.js";
app.use("/", login);

import registro from "./routes/registro.js";
app.use("/", registro);

import productos from "./routes/products.js";
app.use("/", productos);

import cart from "./routes/cart.js";
app.use("/", cart);

import noImplementada from "./controllers/ControllerNoImplementada.js";
app.use(noImplementada);

///////////////////////////////////////// Server /////////////////////////////////////////////////

import cluster from "cluster";

import { Server as HttpServer } from "http";
const httpServer = new HttpServer(app);

import os from "os";
const numCPUs = os.cpus().length;

const MODO = "fork";
const PORT = process.env.PORT || 8080;

if (MODO == "cluster") {
  if (cluster.isPrimary) {
    loggerConsole.info(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      loggerConsole.info(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    // Workers can share any TCP connection

    const server = httpServer.listen(PORT, (err) => {
      if (err) {
        loggerConsole.error(`${err}`);
        loggerFile.error(`${err}`);
      }

      loggerConsole.info(
        `Listen to port ${server.address().port} process id: ${process.pid}`
      );
    });

    loggerConsole.info(`Worker ${process.pid} started`);
  }
} else {
  const server = httpServer.listen(PORT, (err) => {
    if (err) {
      loggerConsole.error(`${err}`);
      loggerFile.error(`${err}`);
    }

    loggerConsole.info(
      `Listen to port ${server.address().port} process id: ${process.pid}`
    );
  });
}
