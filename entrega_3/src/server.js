//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////  Test USER: jose ////////////////////////////////////////
////////////////////////////////////////  Test PASS: 123  ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import mongoose from "mongoose";

///////////////////////////////////////////// Dotenv //////////////////////////////////////////////

import * as dotenv from "dotenv";
dotenv.config();

//////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////// Winston ////////////////////////////////////////////

import winston from "winston";
/// LOGGER
const loggerConsole = winston.createLogger({
  transports: [new winston.transports.Console({ level: "info" })],
});

const loggerWarn = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "../logs/warn.log",
      name: "warn",
      level: "warn",
    }),
  ],
});

const loggerError = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "../logs/error.log",
      name: "error",
      level: "error",
    }),
  ],
});

const loggerFile = {
  warn: (params) => {
    return loggerWarn.warn(params);
  },
  error: (params) => {
    return loggerError.error(params);
  },
};

export { loggerConsole, loggerFile };

//////////////////////////////////////////////////////////////////////////////////////////////////

const { Router } = express;

import * as dao from "./daos/index.js";

const administrador = true;

//////////////////////////////////////////////////////////////////////////////////////////////////

const productos = new dao.productosDao();
const apiProductos = Router();
app.use("/api/productos", apiProductos);

///////////////////////////////////// Router /api/productos /////////////////////////////////////

// GET ALL
apiProductos.get("/", async (req, res) => {
  const resultado = await productos.getAll();
  res.send(resultado);
});

// GET ID
apiProductos.get("/:id", async (req, res) => {
  const { id } = req.params;
  const resultado = await productos.getById(id);
  res.send(resultado);
});

// POST
apiProductos.post("/", async (req, res) => {
  if (administrador) {
    const productoAdicional = req.body;
    const resultado = await productos.saveProduct(productoAdicional);
    res.send(resultado);
  } else {
    res.send({
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    });
  }
});

// PUT
apiProductos.put("/:id", async (req, res) => {
  if (administrador) {
    const { id } = req.params;
    const productoAEditar = req.body;
    const resultado = await productos.editById(id, productoAEditar);
    res.send(resultado);
  } else {
    res.send({
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    });
  }
});

// DELETE
apiProductos.delete("/:id", async (req, res) => {
  if (administrador) {
    const { id } = req.params;
    const resultado = await productos.deleteById(id);
    res.send(resultado);
  } else {
    res.send({
      error: -1,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada`,
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////

const carrito = new dao.carritosDao();
const apiCarrito = Router();
app.use("/api/carrito", apiCarrito);

///////////////////////////////////// Router /api/carrito //////////////////////////////////////

// GET ALL
apiCarrito.get("/", async (req, res) => {
  const resultado = await carrito.getAll();
  res.send(resultado);
});

// POST
apiCarrito.post("/", async (req, res) => {
  const carritoAdicional = req.body;
  const products = carritoAdicional.products;
  const userid = carritoAdicional.userid;
  const resultado = await carrito.saveCart(products, userid);
  res.send({ idNuevoCarrito: resultado });
});

// DELETE
apiCarrito.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const resultado = await carrito.deleteById(id);
  res.send(resultado);
});

// GET ID
apiCarrito.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const resultado = await carrito.getById(id);
  res.send(resultado);
});

// POST ID
apiCarrito.post("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const productoAdicional = req.body;
  const resultado = await carrito.saveById(id, productoAdicional);
  res.send(resultado);
});

// DELETE ID
apiCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;
  const resultado = await carrito.deleteByProduct(id, id_prod);
  res.send(resultado);
});

//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////// Ejs /////////////////////////////////////////////

app.set("view engine", "ejs"); // motor de plantillas a utilizar
app.set("views", "../views"); // especifica el directorio de vistas

//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// Session y Cookie ////////////////////////////////////////

import cookieParser from "cookie-parser";
import session from "express-session";
app.use(cookieParser());

//////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////// Nodemailer ///////////////////////////////////////////

import { createTransport } from "nodemailer";

const ADMIN_MAIL = "alda.littel17@ethereal.email";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: ADMIN_MAIL,
    pass: "GZARu8P5efSUMJe8az",
  },
});

const mailOptions = {
  from: "boring-shop",
  to: ADMIN_MAIL,
};

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

//////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////// Twilio /////////////////////////////////////////////

import twilio from "twilio";

const ADMIN_PHONE = process.env.adminPhone;

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const twilioPhoneNumber = process.env.twilioPhoneNumber;
const twilioWaNumber = process.env.twilioWaNumber;

const messageOptions = {
  from: twilioPhoneNumber,
};

const client = twilio(accountSid, authToken);

//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////// Passport ////////////////////////////////////////////

import { connectionMongoDb as connection } from "./config.js";

import multer from "multer";
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./public/uploads");
  },
  filename: (request, file, callback) => {
    const temp_file_arr = file.originalname.split(".");

    const temp_file_name = temp_file_arr[0];

    const temp_file_extension = temp_file_arr[1];

    callback(
      null,
      temp_file_name + "-" + Date.now() + "." + temp_file_extension
    );
  },
});
const upload = multer({ storage: storage });

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

const usuariosCollection = "usuarios";

const UsuarioSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  name: { type: String },
  address: { type: String },
  age: { type: String },
  phone: { type: String },
  avatar: { type: String },
});

const usuarios = mongoose.model(usuariosCollection, UsuarioSchema);

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    connection();

    usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        loggerConsole.info("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        loggerConsole.info("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      connection();

      usuarios.findOne({ username: username }, async (err, user) => {
        if (err) {
          loggerConsole.error("Error in SignUp: " + err);
          loggerFile.error("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          loggerConsole.info("User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: bcrypt.hashSync(password, 10),
          name: req.body.name,
          address: req.body.address,
          age: req.body.age,
          phone: req.body.phone,
          avatar: req.file.filename,
        };
        usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            loggerConsole.error("Error in Saving user: " + err);
            loggerFile.error("Error in Saving user: " + err);
            return done(err);
          }

          ////////// Nodemailer ///////////

          mailOptions.subject = "nuevo registro";
          mailOptions.html = `
          
          username: ${newUser.username}<br>
          name: ${newUser.name}<br>
          address: ${newUser.address}<br>
          age: ${newUser.age}<br>
          phone: ${newUser.phone}<br>
          avatar: ${newUser.avatar}
          
          `;

          (async () => {
            try {
              const info = await transporter.sendMail(mailOptions);
              loggerConsole.info(info);
            } catch (error) {
              loggerConsole.error(error);
              loggerFile.error(error);
            }
          })();

          ////////////////////////////////

          //loggerConsole.info(user);
          loggerConsole.info("User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  usuarios.findById(id, done);
});

app.use(
  session({
    secret: "keyboard cat",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 10 * 60 * 1000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////// Login /////////////////////////////////////////////////

app.get("/login", async (req, res) => {
  req.session.inicio = Date.now();

  const usuario = req.session.user;
  if (usuario) loggerConsole.info(usuario._id);

  // loggerConsole.info(req.sessionID);

  res.status(200).render("main", {
    user: req.session.user,
    body: req.session.products,
    lastuser: "",
  });
});

app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    const products = await productos.getAll();

    req.session.user = req.user;
    req.session.inicio = Date.now();

    // loggerConsole.info(req.sessionID);

    res.status(200).render("main", {
      user: req.session.user,
      lastuser: "",
    });
  }
);

app.get("/faillogin", async (req, res) => {
  res.status(200).render("faillogin");
});

app.get("/logout", (req, res) => {
  const user = req.session.user;
  req.session.destroy((err) => {
    if (!err) {
      res.status(200).render("main", {
        user: "",
        body: "",
        lastuser: user.name,
      });
    } else res.send({ error: err });
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// Registro ////////////////////////////////////////////////

app.get("/registro", async (req, res) => {
  res.status(200).render("registro", {
    user: "",
  });
});

app.post(
  "/registro",
  upload.single("avatar"),
  passport.authenticate("signup", { failureRedirect: "/failregistro" }),
  (req, res) => {
    res.redirect("/login");
  }
);

app.get("/failregistro", async (req, res) => {
  res.status(200).render("failregistro");
});

//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// Products ////////////////////////////////////////////////

app.get("/products", async (req, res) => {
  const products = await productos.getAll();

  const html = (data) => {
    return data
      .map((elem, index) => {
        return `<tr>
                  <td style="color: white;">${elem.nombre}</td>
                  <td style="color: white;">${elem.precio}</td>
                  <td><img src="${elem.foto}" /></td>
                </tr>`;
      })
      .join(" ");
  };

  res.status(200).render("products", {
    user: req.session.user,
    body: html(products),
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////// Carts /////////////////////////////////////////////////

app.get("/cart", async (req, res) => {
  const user = req.session.user;

  const html = (data) => {
    return data
      .map((elem, index) => {
        return `<tr>
                  <td style="color: white;">${elem.nombre}</td>
                  <td><img src="${elem.foto}" /></td>
                  <td style="color: white;">${elem.stock}</td>
                  <td style="color: white;">${elem.precio}</td>
                </tr>`;
      })
      .join(" ");
  };

  const total = (data) => {
    let total = 0;
    data.forEach((elem) => {
      total += elem.precio * elem.stock;
    });

    return total;
  };

  let carritoActual = "";
  let totalActual = 0;

  if (user) {
    const userid = user._id;
    const cart = await carrito.getByUserId(userid);
    carritoActual = html(cart);
    totalActual = total(cart);
  }

  res.status(200).render("cart", {
    user: req.session.user,
    body: carritoActual,
    total: totalActual,
  });
});

app.post("/cart", async (req, res) => {
  const user = req.session.user;

  const html = (data) => {
    return data
      .map((elem, index) => {
        return `<tr>
                  <td style="color: white;">${elem.nombre}</td>
                  <td><img src="${elem.foto}" /></td>
                  <td style="color: white;">${elem.stock}</td>
                  <td style="color: white;">${elem.precio}</td>
                </tr>`;
      })
      .join(" ");
  };

  const total = (data) => {
    let total = 0;
    data.forEach((elem) => {
      total += elem.precio * elem.stock;
    });

    return total;
  };

  let carritoActual = "";
  let totalActual = 0;

  carritoActual += `<table class="table" style="background-color: black; color: white">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Picture</th>
      <th scope="col">Qty</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody id="productos" style="color: gray">`;

  if (user) {
    const userid = user._id;
    const cart = await carrito.getByUserId(userid);
    carritoActual += html(cart);
    totalActual = total(cart);
  }

  carritoActual += `</tbody>
  </table>
  <p>Total: <strong>${totalActual}</strong></p>`;

  ////////// Nodemailer ///////////

  mailOptions.subject = `nuevo pedido de ${user.name} (${user.address})`;
  mailOptions.html = carritoActual;

  (async () => {
    try {
      const info = await transporter.sendMail(mailOptions);
      loggerConsole.info(info);
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  })();

  ////////////////////////////////

  ///////// Twilio SMS //////////

  messageOptions.body = `Hemos recibido tu pedido ${user.name}`;
  messageOptions.to = user.phone;

  (async () => {
    try {
      const message = await client.messages.create(messageOptions);
      loggerConsole.info(message);
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  })();

  ///////////////////////////////

  ///////// Twilio Wap //////////

  const wapOptions = {};

  wapOptions.body = `nuevo pedido de ${user.name} (${user.address})`;
  wapOptions.from = `whatsapp:${twilioWaNumber}`;
  wapOptions.to = `whatsapp:${ADMIN_PHONE}`;

  (async () => {
    try {
      const message = await client.messages.create(wapOptions);
      loggerConsole.info(message);
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  })();

  ///////////////////////////////

  res.status(200).render("cartsuccess", {
    user: req.session.user,
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////   Logger de rutas no implementadas   /////////////////////////////

// Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
app.use((req, res) => {
  loggerConsole.warn(
    `Ruta: '${req.originalUrl}' - Método: '${req.method}' - No implementada`
  );
  loggerFile.warn(
    `Ruta: '${req.originalUrl}' - Método: '${req.method}' - No implementada`
  );
  res.json({
    error: -2,
    descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////// Server /////////////////////////////////////////////////

import cluster from "cluster";

import { Server as HttpServer } from "http";
const httpServer = new HttpServer(app);

import os from "os";
const numCPUs = os.cpus().length;

const MODO = "fork";
const PORT = process.env.PORT || 8080;

if (MODO == "cluster") {
  if (cluster.isPrimary) {
    loggerConsole.info(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      loggerConsole.info(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    // Workers can share any TCP connection

    const server = httpServer.listen(PORT, (err) => {
      if (err) {
        loggerConsole.error(`${err}`);
        loggerFile.error(`${err}`);
      }

      loggerConsole.info(
        `Listen to port ${server.address().port} process id: ${process.pid}`
      );
    });

    loggerConsole.info(`Worker ${process.pid} started`);
  }
} else {
  const server = httpServer.listen(PORT, (err) => {
    if (err) {
      loggerConsole.error(`${err}`);
      loggerFile.error(`${err}`);
    }

    loggerConsole.info(
      `Listen to port ${server.address().port} process id: ${process.pid}`
    );
  });
}
