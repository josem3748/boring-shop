//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////  Test USER: jose ////////////////////////////////////////
////////////////////////////////////////  Test PASS: 123  ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

import express from "express";
import { auth } from "./middlewares/jwt.js";
import apilogin from "./routes/apilogin.js";
import apiProductos from "./routes/apiProductos.js";
import apiCarrito from "./routes/apiCarrito.js";
import home from "./routes/home.js";
import info from "./routes/info.js";
import config from "./routes/config.js";
import login from "./routes/login.js";
import registro from "./routes/registro.js";
import productos from "./routes/products.js";
import cart from "./routes/cart.js";
import chat from "./routes/chat.js";
import images from "./routes/images.js";
import noImplementada from "./controllers/ControllerNoImplementada.js";
import { loggerConsole, loggerFile } from "./utils/loggers.js";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import ServiciosMensajes from "./services/ServiceMensajes.js";
import { ServiciosUsuarios } from "./services/ServiceUsuarios.js";

const app = express();
const PORT = process.env.PORT || 8080;

const initServer = () => {
  app.set("view engine", "ejs");
  app.set("views", "./views");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use("/", apilogin);
  app.use("/api/productos", auth, apiProductos);
  app.use("/api/carrito", auth, apiCarrito);
  app.use("/", home);
  app.use("/info", auth, info);
  app.use("/config", auth, config);
  app.use("/", login);
  app.use("/", registro);
  app.use("/", productos);
  app.use("/", cart);
  app.use("/", chat);
  app.use("/", images);
  app.use(noImplementada);

  const httpServer = new HttpServer(app);

  const io = new IOServer(httpServer);
  const chats = new ServiciosMensajes();
  const users = new ServiciosUsuarios();

  const socketio = async (socket) => {
    const mensajes = await chats.getMessages();
    const usuarios = await users.getAll();

    socket.emit("mensajes", mensajes, usuarios);

    socket.on("mensaje", async (data) => {
      await chats.sendMessage(data);
      const mensajes = await chats.getMessages();
      const usuarios = await users.getAll();

      io.sockets.emit("mensajes", mensajes, usuarios);
    });
  };
  io.on("connection", socketio);

  const server = httpServer.listen(PORT, (error) => {
    if (error) {
      loggerConsole.error(`${error.stack}`);
      loggerFile.error(`${error.stack}`);
    }

    loggerConsole.info(
      `Listen to port ${server.address().port} process id: ${process.pid}`
    );
  });

  return server;
};

export { initServer, PORT };