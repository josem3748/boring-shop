import { loggerConsole, loggerFile } from "../utils/loggers.js";
import { usuariosModel } from "../daos/usuarios/UsuariosDaoMongoDb.js";
import repoUsuarios from "../repos/repoUsuarios.js";

class ServiciosUsuarios {
  constructor() {
    this.repoUsuarios = new repoUsuarios();
  }
  async getAll() {
    try {
      return await this.repoUsuarios.getAll();
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async getById(Number) {
    try {
      let resultado = await this.repoUsuarios.getById(Number);

      return resultado;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async sendMail(mailOptions) {
    try {
      const info = await this.repoUsuarios.sendMail(mailOptions);
      loggerConsole.info(info);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
}

export { ServiciosUsuarios, usuariosModel };
