import express from "express";
const app = express();

app.use(express.static("public"));

const randoms = [];

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

for (let i = 0; i < 10000; i++) {
  randoms.push(randomInteger(0, 9));
}

app.get("/randoms-nodebug", (req, res) => {
  res.json({ randoms: randoms });
});

app.get("/randoms-debug", (req, res) => {
  console.log(randoms);
  res.json({ randoms: randoms });
});

const PORT = parseInt(process.argv[2]) || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));
