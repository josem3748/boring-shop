const express = require("express");
const app = express();

const fs = require("fs");
// defino el motor de plantilla
app.engine("cte", function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) {
      return callback(new Error(err));
    }
    const rendered = content
      .toString()
      .replace("^^titulo$$", "" + options.titulo + "")
      .replace("^^mensaje$$", "" + options.mensaje + "")
      .replace("^^autor$$", "" + options.autor + "")
      .replace("^^version$$", "" + options.version + "")
      .replace("^^nombre$$", "" + options.nombre + "")
      .replace("^^apellido$$", "" + options.apellido + "")
      .replace("^^fecha/hora$$", "" + options["fecha/hora"] + "");
    return callback(null, rendered);
  });
});
//app.set("views", "./cte1"); // especifica el directorio de vistas
app.set("views", "./cte2"); // especifica el directorio de vistas
app.set("view engine", "cte"); // registra el motor de plantillas

/* app.get("/", (req, res) => {
  res.status(200).render("plantilla1", {
    titulo: `(algún título en string)`,
    mensaje: `(algún mensaje en string)`,
    autor: `(algun autor en string)`,
    version: `(numerica)`,
  });
}); */

app.get("/", (req, res) => {
  res.status(200).render("plantilla2", {
    nombre: `(algún título en string)`,
    apellido: `(algún mensaje en string)`,
    "fecha/hora": `(algun autor en string)`,
  });
});

const server = app.listen(3000, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
