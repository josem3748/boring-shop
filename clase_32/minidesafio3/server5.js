import express from "express";
import cluster from "cluster";
import { cpus } from "os";
const app = express();

const randoms = [];

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

for (let i = 0; i < 10000; i++) {
  randoms.push(randomInteger(0, 9));
}

const PORT = parseInt(process.argv[2]) || 8080;
const modoCluster = process.argv[3] == "CLUSTER";

if (modoCluster && cluster.isPrimary) {
  const numCPUs = cpus().length;

  console.log(`Número de procesadores: ${numCPUs}`);
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(
      "Worker",
      worker.process.pid,
      "died",
      new Date().toLocaleString()
    );
    cluster.fork();
  });
} else {
  app.get("/randoms-nodebug", (req, res) => {
    res.json({ randoms: randoms });
  });

  app.get("/randoms-debug", (req, res) => {
    console.log(randoms);
    res.json({ randoms: randoms });
  });

  app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`);
    console.log(`PID WORKER ${process.pid}`);
  });
}
