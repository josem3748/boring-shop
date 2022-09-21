const express = require("express");
const app = express();

const contenedor = require("./contenedor.js");
const productos = new contenedor.Contenedor("./data/productos.txt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "pug"); // motor de plantillas a utilizar
app.set("views", "./views"); // especifica el directorio de vistas

app.get("/", async (req, res) => {
  res.status(200).render("main.pug");
});

app.get("/productos", async (req, res) => {
  const resultado = await productos.getAll();
  res.status(200).render("productos.pug", {
    body: resultado,
  });
});

app.post("/productos", async (req, res) => {
  const mensaje = req.body;
  await productos.save(mensaje);
  res.status(200).redirect("/");
});

app.post("/borrado", async (req, res) => {
  await productos.deleteAll();
  res.status(200).redirect("/productos");
});

const server = app.listen(8080, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
