import { loggerConsole, loggerFile } from "../utils/loggers.js";
import Dao from "../daos/factoryDao.js";

const factory = new Dao();

class ServiciosProductos {
  constructor() {
    this.Dao = factory.instanceDao("productos");
  }
  async saveProduct(Object) {
    try {
      let productos = await this.Dao.getAll();

      const ids = productos.map((object) => {
        return object.id;
      });

      let nuevoId = 1;

      if (ids.length > 0) nuevoId = Math.max(...ids) + 1;

      Object.id = nuevoId;
      Object.timestamp = Date.now();

      await this.Dao.save(Object);

      return Object;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async editById(id, Object) {
    try {
      return await this.Dao.editById(id, Object);
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async getById(Number) {
    try {
      let resultado = await this.Dao.getById(Number);

      resultado.productos && (resultado = resultado.productos);

      return resultado;
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async getAll() {
    try {
      return await this.Dao.getAll();
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async deleteById(Number) {
    try {
      return await this.Dao.deleteById(Number);
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
