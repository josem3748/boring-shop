import { loggerConsole, loggerFile } from "../utils/loggers.js";
import repoOrdenes from "../repos/repoOrdenes.js";

class ServiciosOrdenes {
  constructor() {
    this.repoOrdenes = new repoOrdenes();
  }
  async getAll() {
    try {
      return await this.repoOrdenes.getAll();
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async saveOrder(Array, userid, useremail) {
    try {
      let ordenes = await this.repoOrdenes.getAll();

      const ids = ordenes.map((object) => {
        return object.id;
      });

      let nuevoId = 1;

      if (ids.length > 0) nuevoId = Math.max(...ids) + 1;

      const nuevaOrden = {
        id: nuevoId,
        timestamp: Date.now(),
        items: Array,
        userid: userid,
        useremail: useremail,
        estado: "generada",
      };

      await this.repoOrdenes.save(nuevaOrden);

      return nuevoId;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async editById(id, Object) {
    try {
      return await this.repoOrdenes.editById(id, Object);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async deleteById(Number) {
    try {
      return await this.repoOrdenes.deleteById(Number);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async getById(Number) {
    try {
      let orden = await this.repoOrdenes.getById(Number);
      if (!orden) return (orden = { error: "registro no encontrado" });
      return orden;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async getByUserId(id) {
    try {
      let orden = await this.repoOrdenes.getByUserId(id);
      if (!orden) return (orden = { error: "registro no encontrado" });
      return orden;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
}

export default ServiciosOrdenes;
