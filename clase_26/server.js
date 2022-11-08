import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";

const app = express();

////////////////////////////////////////////////////////////

import jwt from "jsonwebtoken";
const PRIVATE_KEY = "myprivatekey";

const generateToken = (user) => {
  const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: "1m" });
  return token;
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs"); // motor de plantillas a utilizar
app.set("views", "./views"); // especifica el directorio de vistas

app.get("/registro", (req, res) => {
  res.render("registro.ejs");
});

const registros = [];

let access_token;

app.post("/registro", (req, res) => {
  const existe = registros.find((e) => e.username === req.body.username);
  if (existe) return res.send("El usuario ya existe, prueba otro.");
  registros.push(req.body);

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
  const usuario = { username, password, dir };

  access_token = generateToken(usuario);

  res.redirect("/");
});

const auth = (req, res, next) => {
  const authHeader = access_token;

  if (!authHeader) {
    return res.status(401).json({
      error: "not authenticated",
    });
  }

  const token = authHeader;

  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: "not authorized",
      });
    }

    req.user = decoded.data;
    next();
  });
};

let contador = 0;

app.get("/", auth, (req, res) => {
  contador++;
  req.user.contador = contador;

  res.send(req.user);
});

app.get("/logout", auth, (req, res) => {
  access_token = "";
  res.send(`Hasta luego ${req.user.username}`);
});

var PORT = process.env.port || 8080;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
