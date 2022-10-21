import { ContenedorSQLite3 } from "../../contenedores/ContenedorSQLite3.js";
import { connectionSQLite3 as connection } from "../../config.js";

const table = "productos";

class ProductosDaoSQLite3 extends ContenedorSQLite3 {
  constructor() {
    super(connection, table);
  }
}

export default ProductosDaoSQLite3;
