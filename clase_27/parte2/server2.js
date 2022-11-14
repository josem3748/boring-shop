import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

// Clase

/* dotenv.config();

const fondo = process.env.FONDO;
const frente = process.env.FRENTE;

console.log({
  fondo,
  frente,
}); */

/* import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path:
    process.env.MODO == "byn"
      ? path.resolve(__dirname, "byn.env")
      : path.resolve(__dirname, "colores.env"),
});

const fondo = process.env.FONDO;
const frente = process.env.FRENTE;

console.log({
  fondo,
  frente,
});
 */

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";

const app = express();

dotenv.config({
  path: path.resolve(__dirname, "ultdesafio.env"),
});

/* process.env.NODE_ENV = "dev";
process.env.PORT = 8080;
process.env.DEBUG = true; */

const objeto = {
  modo: process.env.NODE_ENV,
  puerto: parseInt(process.env.PORT),
  debug: process.env.DEBUG == "true" ? true : false,
};

console.log(objeto);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `App listening on http://${process.env.HOST}:${process.env.PORT}`
  );
});
