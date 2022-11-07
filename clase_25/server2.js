import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

import express from "express";
import session from "express-session";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const app = express();

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PASSPORT

passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      const existe = registros.find((e) => e.username === req.body.username);
      if (!existe) return done("El usuario no existe.");
      if (existe.password !== req.body.password)
        return done("Usuario o contraseña incorrectos.");

      req.session.username = existe.username;
      req.session.password = existe.password;
      req.session.dir = existe.dir;

      return done(null, "exito login");
    }
  )
);

const registros = [];

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      const existe = registros.find((e) => e.username === req.body.username);
      if (existe) return done("El usuario ya existe, prueba otro.");
      registros.push(req.body);
      return done(null, "exito registro");
    }
  )
);

app.use(
  session({
    secret: "keyboard cat",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 90 * 1000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs"); // motor de plantillas a utilizar
app.set("views", "./views"); // especifica el directorio de vistas

app.get("/registro", (req, res) => {
  res.render("registro.ejs");
});

app.post(
  "/registro",
  passport.authenticate("signup", { failureMessage: true, session: false }),
  (req, res) => res.send("Registro exitoso!")
);

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  passport.authenticate("login", { failureMessage: true, session: false }),
  (req, res) => res.redirect("/datos")
);

app.get("/datos", (req, res) => {
  if (!req.session.username) return res.redirect("/login");

  if (req.session.contador) {
    req.session.contador++;
  } else {
    req.session.contador = 1;
  }
  res.json({
    Nombre: req.session.username,
    Pass: req.session.password,
    Dir: req.session.dir,
    Visitas: req.session.contador,
  });
});

app.get("/logout", (req, res) => {
  let username = req.session.username;
  req.session.destroy((err) => {
    if (!err) res.send(`Hasta luego ${username}`);
    else res.send({ error: err });
  });
});

var PORT = process.env.port || 8080;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
