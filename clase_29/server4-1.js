import express from "express";
const app = express();

app.get("/", (req, res) => {
  const now = new Date();
  res.send(`Servidor express en (${PORT}) - PID (${process.pid}) - (${now}) `);
});

var PORT = process.env.port || 8081;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(
    `Listen to port ${server.address().port} process id: ${process.pid}`
  );
});
