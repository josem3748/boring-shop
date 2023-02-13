import os from "os";
import { PORT } from "../server.js";

const getInfo = async (req, res) => {
  const numCPUs = os.cpus().length;
  const info = {
    argumentos_de_entrada: process.argv,
    nombre_de_la_plataforma: process.env.OS,
    version_node: process.versions.node,
    memoria_total_reservada: process.memoryUsage().rss,
    path_de_ejecucion: process.execPath,
    carpeta_del_proyecto: process.env.PWD,
    numero_de_cpus: numCPUs,
    process_id: process.pid,
    puerto: PORT,
  };
  res.send(info);
};

export { getInfo };
