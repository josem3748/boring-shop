import express from "express";
const app = express();

import jm from "jmcoder";

app.get("/", (req, res) => {
  const { num1, num2 } = req.query;
  if (num1 && num2) {
    return res.json(jm.suma(num1, num2));
  }
  res.send("Hola Yarn!");
});

var PORT = process.env.port || 8080;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(
    `Listen to port ${server.address().port} process id: ${process.pid}`
  );
});
