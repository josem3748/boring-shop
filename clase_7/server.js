const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ mensaje: "Hola mundo!" });
});

app.get("/holis", (req, res) => {
  console.log(req.query);
  const { nombre, apellido } = req.query;
  res.status(200).json({ mensaje: `Hola ${nombre} ${apellido}!` });
});

const arrayMsg = [
  { id: 1, mensaje: "Holisss" },
  { id: 2, mensaje: "Holosss" },
];

app.get("/mensajes/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  let msj = arrayMsg.find((msj) => msj.id === parseInt(id));
  res.status(200).json({ mensaje: `${msj.mensaje}!` });
});

let frase = "Hola mundo como están";

app.get("/api/frase", (req, res) => {
  res.status(200).json({ frase: `${frase}` });
});

app.get("/api/letras/:num", (req, res) => {
  const { num } = req.params;
  res.status(200).json({ letra: `${frase[num]}` });
});

app.get("/api/palabras/:num", (req, res) => {
  const { num } = req.params;
  frase2 = frase.split(" ");
  res.status(200).json({ palabra: `${frase2[num]}` });
});

app.post("/api/respuestas", (req, res) => {
  const mensaje = req.body;
  console.log(mensaje);
  //console.log(req);
  res.status(200).json({ todo: `ok` });
});

app.listen(8080, (err) => {
  if (err) console.log(err);
  console.log("Listen to port 8080");
});
