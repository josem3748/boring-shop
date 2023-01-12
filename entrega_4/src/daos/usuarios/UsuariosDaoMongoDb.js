import { ContenedorMongoDb } from "../../contenedores/ContenedorMongoDb.js";
import { connectionMongoDb as connection } from "../../db/config.js";

import mongoose from "mongoose";

const usuariosCollection = "usuarios";

const UsuarioSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  name: { type: String },
  address: { type: String },
  age: { type: String },
  phone: { type: String },
  avatar: { type: String },
});

const usuariosModel = mongoose.model(usuariosCollection, UsuarioSchema);

class UsuariosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(connection, usuariosModel);
  }
}

export { UsuariosDaoMongoDb, usuariosModel };
