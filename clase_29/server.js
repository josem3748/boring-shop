import cluster from "cluster";
import http from "http";
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
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("hello world\n");
    })
    .listen(8000);

  /*   var PORT = process.env.port || 8000;

  const server = app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Listen to port ${server.address().port}`);
  }); */

  console.log(`Worker ${process.pid} started`);
}
