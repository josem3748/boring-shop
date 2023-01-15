import { loggerConsole, loggerFile } from "../utils/loggers.js";
import { transporter } from "../middlewares/nodemailer.js";
import { usuariosModel } from "../daos/usuarios/UsuariosDaoMongoDb.js";

import Dao from "../daos/factoryDao.js";

const factory = new Dao();

class ServiciosUsuarios {
  constructor() {
    this.Dao = factory.instanceDao("usuarios");
  }
  async sendMail(mailOptions) {
    try {
      const info = await transporter.sendMail(mailOptions);
      loggerConsole.info(info);
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  }
}

export { ServiciosUsuarios, usuariosModel };
