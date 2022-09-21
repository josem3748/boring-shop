const express = require("express");
const app = express();

app.use("/", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", "./views"); // especifica el directorio de vistas
app.set("view engine", "pug"); // motor de plantillas a utilizar

//const pug = require("pug");

app.get("/", (req, res) => {
  res.status(200).render("hello.pug", {
    mensaje: "Usando Pug JS en Express",
  });
});

app.get("/datos", (req, res) => {
  const { min, nivel, max, titulo } = req.query;
  res.status(200).render("medidor.pug", {
    min: min,
    max: max,
    value: nivel,
    titulo: titulo,
  });
});

const server = app.listen(8080, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
