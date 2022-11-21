import cluster from "cluster";
import os from "os";

import express from "express";
const app = express();

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server

  app.get("/", (req, res) => {
    const now = new Date();
    res.send(
      `Servidor express en (${PORT}) - PID (${process.pid}) - (${now}) `
    );
  });

  process.env.port = 8081;

  var PORT = process.env.port || 8080;

  const server = app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(
      `Listen to port ${server.address().port} process id: ${process.pid}`
    );
  });

  console.log(`Worker ${process.pid} started`);
}
