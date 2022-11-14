import config from "./config.js";
import express from "express";

const app = express();

//console.log(`NODE_ENV-${config.NODE_ENV}`);

const objeto = {
  modo: config.NODE_ENV,
  puerto: parseInt(config.PORT),
  debug: config.DEBUG == "true" ? true : false,
};

console.log(objeto);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(config.PORT, config.HOST, () => {
  console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});
