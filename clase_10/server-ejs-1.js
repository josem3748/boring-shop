const express = require("express");
const app = express();

app.use("/", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", "./views"); // especifica el directorio de vistas
app.set("view engine", "ejs"); // motor de plantillas a utilizar

app.get("/", (req, res) => {
  res.status(200).render("index.ejs", {
    mensaje: "Usando EJS en Express",
  });
});

app.get("/datos", (req, res) => {
  const { min, nivel, max, titulo } = req.query;
  res.status(200).render("medidor.ejs", {
    min: min,
    max: max,
    value: nivel,
    titulo: titulo,
  });
});

app.get("/productos", (req, res) => {
  const productos = [
    {
      title: "Escuadra",
      price: 123.45,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      id: 1,
    },
    {
      title: "Calculadora",
      price: 234.56,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
      id: 2,
    },
    {
      title: "Globo Terráqueo",
      price: 345.67,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
      id: 3,
    },
  ];

  const tagline = "Testing tagline";

  res.status(200).render("productos.ejs", {
    productos: productos,
    tagline: tagline,
  });
});

const server = app.listen(8080, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
