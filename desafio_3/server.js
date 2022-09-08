// Desafío Servidor con Express

const express = require("express");
const contenedor = require("./contenedor.js");

const productos = new contenedor.Contenedor("products.txt");

const app = express();

app.get("/", (req, res) => {
  res.send("Bienvenido al servidor express");
});

app.get("/productos", async (req, res) => {
  const resultado = await productos.getAll();
  res.send(resultado);
});

app.get("/productoRandom", async (req, res) => {
  const random = Math.floor(Math.random() * 3) + 1;
  const resultado = await productos.getById(random);
  res.send(resultado);
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${server.address().port}`);
});

server.on("error", (err) => console.log(err));
