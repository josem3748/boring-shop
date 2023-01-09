/* //memoria
const operaciones = [];
const listarOperaciones = () => {
  return operaciones;
};

const guardarOperacion = (operacion) => {
  operaciones.push(operacion);
}; */

/* //disco
import fs from "fs";

const listarOperaciones = async () => {
  const contenidoArchivo = await fs.promises.readFile("./disco.txt", "utf-8");
  const archivoParseado = JSON.parse(contenidoArchivo);
  return archivoParseado;
};

const guardarOperacion = async (operacion) => {
  const contenidoArchivo = await fs.promises.readFile("./disco.txt", "utf-8");
  const archivoParseado = JSON.parse(contenidoArchivo);
  archivoParseado.push(operacion);
  const resultadoATexto = JSON.stringify(archivoParseado, null, " ");
  await fs.promises.writeFile("./disco.txt", resultadoATexto, "utf-8");
}; */

//MongoDB

/// DOTENV
import * as dotenv from "dotenv";
dotenv.config();
const URL = process.env.URL;

import mongoose from "mongoose";

const connectionMongoDb = async () => {
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "clase_38",
  });
};

const operacionesCollection = "operaciones";

const OperacionSchema = new mongoose.Schema({
  tipo: { type: String },
  params: { type: Array },
  result: { type: Number },
  timestamp: { type: String },
});

const operacionModel = mongoose.model(operacionesCollection, OperacionSchema);

const listarOperaciones = async () => {
  try {
    await connectionMongoDb();
    const operaciones = await operacionModel.find({});
    return operaciones;
  } catch (error) {
    console.log(error);
  }
};

const guardarOperacion = async (operacion) => {
  try {
    await connectionMongoDb();
    const operacionSaveModel = new operacionModel(operacion);
    await operacionSaveModel.save();
  } catch (error) {
    console.log(error);
  }
};

export { listarOperaciones, guardarOperacion };
