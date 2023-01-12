import initServer from "./server.js";
import { loggerConsole } from "./utils/loggers.js";
import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;
const MODO = "fork";

if (MODO == "cluster") {
  if (cluster.isPrimary) {
    loggerConsole.info(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      loggerConsole.info(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    // Workers can share any TCP connection
    initServer();
    loggerConsole.info(`Worker ${process.pid} started`);
  }
} else {
  initServer();
}
