/* Hay un bug gigante que se produce con pm2 cluster mode al usarlo en conjunto con ES6 import
no funciona y al revisar los logs de pm2 tira el siguiente error:

Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only file and data URLs are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'c:'

Tuve que pasar a commonjs para que funcione. */

//import express from "express";
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const now = new Date();
  res.send(`Servidor express en (${PORT}) - PID (${process.pid}) - (${now}) `);
});

var PORT = process.env.port || 8081;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(
    `Listen to port ${server.address().port} process id: ${process.pid}`
  );
});
