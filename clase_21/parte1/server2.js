import express from "express";
const app = express();

import faker from "faker";
faker.locale = "es";
const { name, commerce } = faker;

// GET ALL
app.get("/test", async (req, res) => {
  let cant = req.query["cant"];
  !cant ? (cant = 10) : (cant = parseInt(cant));

  let resultados = [];

  for (let i = 1; i < cant + 1; i++) {
    resultados.push({
      id: i,
      nombre: name.firstName(),
      apellido: name.lastName(),
      color: commerce.color(),
    });
  }
  res.send(resultados);
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
