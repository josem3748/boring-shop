//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////  Test USER: jose ////////////////////////////////////////
////////////////////////////////////////  Test PASS: 123  ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

import express from "express";
import { loggerConsole, loggerFile } from "./utils/loggers.js";
import apiProductos from "./routes/apiProductos.js";
import apiCarrito from "./routes/apiCarrito.js";
import login from "./routes/login.js";
import registro from "./routes/registro.js";
import productos from "./routes/products.js";
import cart from "./routes/cart.js";
import noImplementada from "./controllers/ControllerNoImplementada.js";
import { Server as HttpServer } from "http";

const app = express();

const initServer = () => {
  app.set("view engine", "ejs");
  app.set("views", "./views");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use("/api/productos", apiProductos);
  app.use("/api/carrito", apiCarrito);
  app.use("/", login);
  app.use("/", registro);
  app.use("/", productos);
  app.use("/", cart);
  app.use(noImplementada);

  const httpServer = new HttpServer(app);
  const PORT = process.env.PORT || 8080;

  const server = httpServer.listen(PORT, (err) => {
    if (err) {
      loggerConsole.error(`${err}`);
      loggerFile.error(`${err}`);
    }

    loggerConsole.info(
      `Listen to port ${server.address().port} process id: ${process.pid}`
    );
  });

  return server;
};

export default initServer;
