import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";

const app = express();

let contador = 0;

app.get("/", (req, res) => {
  contador++;
  res.send(`Visitas: ${contador}`);
});

const sumar = () => {
  let suma = 0;
  for (let i = 0; i < 5e9; i++) {
    suma += i;
  }
  return suma;
};

app.get("/calculo-bloq", (req, res) => {
  const result = sumar();
  res.send(`Terminó ${result}`);
});

import { fork } from "child_process";

const forked = fork("suma.js");

app.get("/calculo-nobloq", (req, res) => {
  forked.send("empezar");
  forked.on("message", (msg) => {
    res.send(`Terminó ${msg}`);
  });
});

var PORT = process.env.port || 8080;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
