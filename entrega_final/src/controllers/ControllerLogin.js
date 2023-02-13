import { loggerConsole } from "../utils/loggers.js";
import { generateToken } from "../middlewares/jwt.js";
import ServiciosOrdenes from "../services/ServiceOrdenes.js";

const orden = new ServiciosOrdenes();

const loginGet = async (req, res) => {
  req.session.inicio = Date.now();

  const usuario = req.session.user;

  let ordenesUsuario = [];

  if (usuario) {
    loggerConsole.info(usuario._id);

    const ordenes = await orden.getAll();
    ordenesUsuario = ordenes.filter((elem) => elem.userid == usuario._id);
  }

  res.status(200).render("main", {
    user: req.session.user,
    body: req.session.products,
    lastuser: "",
    ordenes: ordenesUsuario,
  });
};

const loginPost = async (req, res) => {
  req.session.user = req.user;
  req.session.inicio = Date.now();

  const tokken = generateToken(req.user);
  req.session.accesstokken = tokken;

  res.redirect("/products");
};

const loginFailGet = async (req, res) => {
  res.status(200).render("faillogin", {
    user: "",
  });
};

const logoutGet = async (req, res) => {
  const user = req.session.user;
  req.session.destroy((error) => {
    if (!error) {
      res.status(200).render("main", {
        user: "",
        body: "",
        lastuser: user.name,
      });
    } else res.send({ error: error });
  });
};

export { loginGet, loginPost, loginFailGet, logoutGet };
