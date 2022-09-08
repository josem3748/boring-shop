const express = require("express");
const moment = require("moment");

const app = express();

app.get("/", (req, res) => {
  res.send("Bienvenido al servidor express");
});

let counter = 0;

app.get("/visitas", (req, res) => {
  counter++;
  res.send({ visitas: `${counter}` });
});

app.get("/fyh", (req, res) => {
  const fyh = moment().format("LLL");
  res.send({ fyh: `${fyh}` });
});

const PORT = 4000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${server.address().port}`);
});

server.on("error", (err) => console.log(err));
