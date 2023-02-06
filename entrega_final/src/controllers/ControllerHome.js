import { loggerConsole } from "../utils/loggers.js";

const homeGet = async (req, res) => {
  req.session.inicio = Date.now();

  const usuario = req.session.user;
  if (usuario) loggerConsole.info(usuario._id);

  res.status(200).render("home", {
    user: req.session.user,
    body: req.session.products,
    lastuser: "",
  });
};

export { homeGet };
