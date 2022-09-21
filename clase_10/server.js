const express = require("express");
const app = express();

const contenedor = require("./contenedor.js");
const nombres = new contenedor.Contenedor("nombres.txt");

//app.use("/", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", "./views"); // especifica el directorio de vistas
app.set("view engine", "ejs"); // motor de plantillas a utilizar

app.get("/", async (req, res) => {
  const resultado = await nombres.getAll();
  res.status(200).render("index2.ejs", {
    body: resultado,
  });
});

app.post("/personas", async (req, res) => {
  const mensaje = req.body;
  await nombres.save(mensaje);
  res.status(200).redirect("/");
});

app.post("/borrado", async (req, res) => {
  await nombres.deleteAll();
  res.status(200).redirect("/");
});

const server = app.listen(8080, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
