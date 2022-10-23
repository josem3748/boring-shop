import express from "express";
const app = express();

const nombres = ["Luis", "Lucía", "Juan", "Augusto", "Ana"];
const apellidos = ["Pieres", "Cacurri", "Bezzola", "Alberca", "Mei"];
const colores = ["rojo", "verde", "azul", "amarillo", "magenta"];

const rndIndex = (Array) => {
  return Math.floor(Math.random() * Array.length);
};

// GET ALL
app.get("/test", async (req, res) => {
  let resultados = [];

  for (let i = 1; i < 11; i++) {
    resultados.push({
      nombre: nombres[rndIndex(nombres)],
      apellido: apellidos[rndIndex(apellidos)],
      color: colores[rndIndex(colores)],
    });
  }
  res.send(resultados);
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
