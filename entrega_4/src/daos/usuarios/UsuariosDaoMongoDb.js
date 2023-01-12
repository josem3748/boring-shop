import { ContenedorMongoDb } from "../../containers/ContenedorMongoDb.js";
import { connectionMongoDb as connection } from "../../db/config.js";
import usuariosModel from "../../models/usuariosModel.js";

class UsuariosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(connection, usuariosModel);
  }
}

export { UsuariosDaoMongoDb, usuariosModel };
