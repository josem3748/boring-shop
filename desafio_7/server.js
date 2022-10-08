/////////////////////////////////////////////////////////////////////
import { optionsMDB } from "./options/mariaDB.js";
import { optionsSQLite3 } from "./options/SQLite3.js";
import knex from "knex";

const dbMDB = knex(optionsMDB);
const dbSQLite3 = knex(optionsSQLite3);
/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/////////////////////////////////////////////////////////////////////

import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

/////////////////////////////////////////////////////////////////////
//////////////////////// Obteniendo data ////////////////////////////
/////////////////////////////////////////////////////////////////////

const getProducts = async () => {
  return await dbMDB
    .from("productos")
    .select("*")
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getMessages = async () => {
  return await dbSQLite3
    .from("mensajes")
    .select("*")
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

import * as hbs from "express-handlebars";

app.set("view engine", "hbs"); // motor de plantillas a utilizar
app.set("views", "./views"); // especifica el directorio de vistas

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.get("/", async (req, res) => {
  const productos = await getProducts();
  //console.log(productos);
  const check = productos.length > 0;
  const mensajesCheck = await getMessages();
  const check2 = mensajesCheck.length > 0;
  res.status(200).render("main", {
    body: check,
    body2: check2,
  });
});

const server = httpServer.listen(8080, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});

io.on("connection", async (socket) => {
  const productos = await getProducts();
  const mensajes = await getMessages();

  console.log("¡Nuevo cliente conectado!");

  // Envio los productos al cliente que se conectó
  socket.emit("productos", productos);
  socket.emit("mensajes", mensajes);

  // Escucho los productos enviados por el cliente y se los propago a todos
  socket.on("producto", async (data) => {
    await dbMDB("productos").insert(data);
    const productos = await getProducts();
    io.sockets.emit("productos", productos);
  });
  socket.on("mensaje", async (data) => {
    await dbSQLite3("mensajes").insert(data);
    const mensajes = await getMessages();
    io.sockets.emit("mensajes", mensajes);
  });
});
