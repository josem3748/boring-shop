/////////////////////////// IMPORTS ///////////////////////////////

import { normalize, denormalize, schema } from "normalizr";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

////////////////////////// GET PRODUCTOS ////////////////////////////

import fetch from "node-fetch";

const getProducts2 = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const respuesta = await fetch(
    "http://localhost:8080/api/productos-test",
    requestOptions
  )
    .then((response) => response.text())
    .catch((error) => console.log("error", error));

  return JSON.parse(respuesta);
};

////////////////////////// GET MENSAJES ////////////////////////////

import mongoose, { now } from "mongoose";

const mensajesCollection = "mensajes";

const MensajeSchema = new mongoose.Schema({
  author: {
    id: { type: String },
    nombre: { type: String },
    apellido: { type: String },
    edad: { type: String },
    alias: { type: String },
    avatar: { type: String },
  },
  fecha: { type: String },
  text: { type: String },
});

const mensajes = mongoose.model(mensajesCollection, MensajeSchema);

const getMessages2 = async () => {
  try {
    // Conexión a la base de datos
    const URL =
      "mongodb+srv://username:woWi6Lg4BLe116Lo@cluster0.jldiu.mongodb.net/?retryWrites=true&w=majority";
    let rta = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "chat",
    });

    /////////////// GET /////////////////

    let getAll = await mensajes.find({}).lean();

    /////////////// NORMALIZAR /////////////////

    const myData = getAll;
    const autorSchema = new schema.Entity("autores");
    const mensajeListSchema = [
      {
        author: autorSchema,
      },
    ];

    let result = normalize(myData, mensajeListSchema);

    /////////////// COMPRESION /////////////////

    let size1 = JSON.stringify(myData).length;
    let size2 = JSON.stringify(result).length;

    let compression = Math.round(((size1 - size2) / size1) * 10000) / 100;

    /////////////// DENORMALIZAR /////////////////

    const denormalizedResult = denormalize(
      result.result,
      mensajeListSchema,
      result.entities
    );

    /////////////// RETURN /////////////////

    return { mensajes: denormalizedResult, compresion: compression };
  } catch (error) {
    console.log(error);
  }
};

////////////////////////// SEND MENSAJE ////////////////////////////

const sendMessage = async (data) => {
  try {
    // Conexión a la base de datos
    const URL =
      "mongodb+srv://username:woWi6Lg4BLe116Lo@cluster0.jldiu.mongodb.net/?retryWrites=true&w=majority";
    let rta = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "chat",
    });

    await new mensajes(data).save();
  } catch (error) {
    console.log(error);
  }
};

////////////////////////////// HBS //////////////////////////////////

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

////////////////////////////// ATLAS //////////////////////////////////

import cookieParser from "cookie-parser";
import session from "express-session";

import MongoStore from "connect-mongo";
const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(cookieParser());

app.use(
  session({
    // Persistencia por mongo atlas
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://username:woWi6Lg4BLe116Lo@cluster0.jldiu.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
      dbName: "chat",
      collectionName: "sesiones",
      ttl: 60,
    }),
    //
    secret: "shhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 },
  })
);

////////////////////////////// RUTAS //////////////////////////////////

app.get("/login", async (req, res) => {
  const productos = await getProducts2();
  const check = productos.length > 0;
  const mensajesCheck = await getMessages2();
  const check2 = mensajesCheck.mensajes.length > 0;

  req.session.inicio = Date.now();

  console.log(req.sessionID);

  res.status(200).render("main", {
    body: check,
    body2: check2,
    user: req.session.user,
  });
});

app.post("/login", async (req, res) => {
  const productos = await getProducts2();
  const check = productos.length > 0;
  const mensajesCheck = await getMessages2();
  const check2 = mensajesCheck.mensajes.length > 0;

  const { user } = req.body;
  req.session.user = user;
  req.session.inicio = Date.now();

  console.log(req.sessionID);

  res.status(200).render("main", {
    body: check,
    body2: check2,
    user: req.session.user,
  });
});

app.get("/logout", (req, res) => {
  let user = req.session.user;
  req.session.destroy((err) => {
    if (!err) {
      res.status(200).render("main", {
        lastuser: user,
      });
    } else res.send({ error: err });
  });
});

///////////////////////// PRODUCTOS FAKER ///////////////////////////

import faker from "faker";
faker.locale = "es";
const { commerce, image } = faker;

app.get("/api/productos-test", async (req, res) => {
  let cant = req.query["cant"];
  !cant ? (cant = 5) : (cant = parseInt(cant));

  let resultados = [];

  for (let i = 1; i < cant + 1; i++) {
    resultados.push({
      title: commerce.product(),
      price: commerce.price(),
      thumbnail: image.animals(64, 64, true),
    });
  }
  res.send(resultados);
});

//////////////////////////// SERVER /////////////////////////////////

const server = httpServer.listen(8080, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});

///////////////////////// IO / SOCKETS //////////////////////////////

io.on("connection", async (socket) => {
  const productos = await getProducts2();
  const mensajes = await getMessages2();

  console.log("¡Nuevo cliente conectado!");

  // Envio los productos al cliente que se conectó
  socket.emit("productos", productos);
  socket.emit("mensajes", mensajes);

  // Escucho los productos enviados por el cliente y se los propago a todos
  socket.on("producto", async (data) => {
    productos.push(data);
    io.sockets.emit("productos", productos);
  });
  socket.on("mensaje", async (data) => {
    await sendMessage(data);
    const mensajes = await getMessages2();
    io.sockets.emit("mensajes", mensajes);
  });
});
