import express from "express";
const app = express();

import apiOperaciones from "./ruteo.js";

app.use("/api/operaciones", apiOperaciones);

var PORT = process.env.port || 8080;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(
    `Listen to port ${server.address().port} process id: ${process.pid}`
  );
});
