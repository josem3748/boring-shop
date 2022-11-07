// Mongo Atlas

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

import MongoStore from "connect-mongo";
const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const app = express();

app.use(cookieParser());

app.use(
  session({
    // Persistencia por mongo atlas
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://username:woWi6Lg4BLe116Lo@cluster0.jldiu.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
      dbName: "clase_25",
      collectionName: "sesiones",
      ttl: 90,
    }),
    //
    secret: "shhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 90 * 1000 },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs"); // motor de plantillas a utilizar
app.set("views", "./views"); // especifica el directorio de vistas

app.get("/registro", (req, res) => {
  res.render("registro.ejs");
});

const registros = [];

app.post("/registro", (req, res) => {
  const existe = registros.find((e) => e.username === req.body.username);
  if (existe) return res.send("El usuario ya existe, prueba otro.");
  registros.push(req.body);
  console.log(registros);
  res.send("Registro exitoso!");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {
  const existe = registros.find((e) => e.username === req.body.username);
  if (!existe) return res.send("El usuario no existe.");
  if (existe.password !== req.body.password)
    return res.send("Usuario o contraseña incorrectos.");
  const { username, password, dir } = existe;

  req.session.username = username;
  req.session.password = password;
  req.session.dir = dir;

  res.redirect("/datos");
});

app.get("/datos", (req, res) => {
  if (!req.session.username) return res.redirect("/login");
  if (req.session.contador) {
    req.session.contador++;
  } else {
    req.session.contador = 1;
  }
  res.json({
    Nombre: req.session.username,
    Pass: req.session.password,
    Dir: req.session.dir,
    Visitas: req.session.contador,
  });
});

app.get("/logout", (req, res) => {
  let username = req.session.username;
  req.session.destroy((err) => {
    if (!err) res.send(`Hasta luego ${username}`);
    else res.send({ error: err });
  });
});

var PORT = process.env.port || 8080;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
