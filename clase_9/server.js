const express = require("express");
const app = express();

const handlebars = require("express-handlebars");

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/public/",
  })
);
app.set("view engine", "hbs");
app.set("views", "./public"); // especifica el directorio de vistas

//app.use("/", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.status(200).render("index", {
    nombre: "Joséeeeeee",
    apellido: "Moreno",
    edad: 30,
    email: "example@gmail.com",
    telefono: "3818989898",
  });
});

const server = app.listen(8080, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
