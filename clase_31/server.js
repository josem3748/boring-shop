import express from "express";
const app = express();

import compression from "compression";
app.use("/saludozip", compression());

const generarMensaje = () => {
  let mensaje = "";
  for (let index = 0; index < 1000; index++) {
    mensaje += "Hola que tal";
  }
  return mensaje;
};

const mensaje = generarMensaje();

app.get("/", (req, res) => {
  const now = new Date();
  res.send(`Servidor express en (${PORT}) - PID (${process.pid}) - (${now}) `);
});

app.get("/saludo", (req, res) => {
  res.send(mensaje);
});

app.get("/saludozip", (req, res) => {
  res.send(mensaje);
});

process.env.port = 8081;

var PORT = process.env.port || 8080;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(
    `Listen to port ${server.address().port} process id: ${process.pid}`
  );
});
