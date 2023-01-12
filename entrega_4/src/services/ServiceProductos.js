import { loggerConsole, loggerFile } from "../utils/loggers.js";
import ProductosDaoMongoDb from "../daos/productos/ProductosDaoMongoDb.js";

class ServiciosProductos {
  constructor() {
    this.ProductosDaoMongoDb = new ProductosDaoMongoDb();
  }
  async saveProduct(Object) {
    try {
      let productos = await this.ProductosDaoMongoDb.getAll();

      const ids = productos.map((object) => {
        return object.id;
      });

      let nuevoId = 1;

      if (ids.length > 0) nuevoId = Math.max(...ids) + 1;

      Object.id = nuevoId;
      Object.timestamp = Date.now();

      await this.ProductosDaoMongoDb.save(Object);

      return Object;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async editById(id, Object) {
    try {
      return await this.ProductosDaoMongoDb.editById(id, Object);
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async getById(Number) {
    try {
      let resultado = await this.ProductosDaoMongoDb.getById(Number);

      resultado.productos && (resultado = resultado.productos);

      return resultado;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async getAll() {
    try {
      return await this.ProductosDaoMongoDb.getAll();
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async deleteById(Number) {
    try {
      return await this.ProductosDaoMongoDb.deleteById(Number);
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async tablaProductos(data) {
    return data
      .map((elem, index) => {
        return `<tr>
                  <td style="color: white;">${elem.nombre}</td>
                  <td style="color: white;">${elem.precio}</td>
                  <td><img src="${elem.foto}" /></td>
                </tr>`;
      })
      .join(" ");
  }
}

export default ServiciosProductos;
