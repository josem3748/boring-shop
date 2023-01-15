import { loggerConsole, loggerFile } from "../utils/loggers.js";
import Dao from "../daos/factoryDao.js";

const factory = new Dao();

class ServiciosMensajes {
  constructor() {
    this.Dao = factory.instanceDao("mensajes");
  }
  async getMessages() {
    try {
      return await this.Dao.getAll();
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
  async sendMessage(data) {
    try {
      return await this.Dao.save(data);
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
}

export default ServiciosMensajes;
