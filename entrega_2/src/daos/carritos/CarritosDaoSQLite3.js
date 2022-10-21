import { ContenedorSQLite3 } from "../../contenedores/ContenedorSQLite3.js";
import { connectionSQLite3 as connection } from "../../config.js";

const table = "carritos";

class CarritosDaoSQLite3 extends ContenedorSQLite3 {
  constructor() {
    super(connection, table);
  }
}

export default CarritosDaoSQLite3;
