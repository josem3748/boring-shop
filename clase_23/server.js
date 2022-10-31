// Parte 1

/* import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser("jm"));

app.get("/set", (req, res) => {
  res.cookie("server", "express").send("Cookie Set");
});

app.get("/setEX", (req, res) => {
  res.cookie("server2", "express2", { maxAge: 30000 }).send("Cookie SetEX");
});

app.get("/setSigned", (req, res) => {
  res.cookie("server3", "express3", { signed: true }).send("Cookie Set Signed");
});

app.get("/get", (req, res) => {
  res.send(req.cookies.server2);
});

app.get("/getSigned", (req, res) => {
  res.send(req.signedCookies.server3);
});

app.get("/clr", (req, res) => {
  res.clearCookie("server").send("Cookie Clear");
});

const server = app.listen(8080, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
}); */

////////////////////////////////////////////////////////////////////////

// Desafio Parte 1

/* import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Router } = express;

const ruta = Router();
app.use("/cookies", ruta);

app.use(cookieParser("jm"));
ruta.use(cookieParser("jm"));

ruta.post("/", (req, res) => {
  const { key, value, life } = req.body;
  if (key && value && life) {
    res.cookie(key, value, { maxAge: life }).send({ proceso: "ok" });
  } else {
    res.send({ error: "faltan campos" });
  }
});

ruta.get("/", (req, res) => {
  res.send(req.cookies);
});

ruta.delete("/:name", (req, res) => {
  const { name } = req.params;
  if (req.cookies[name]) {
    res.clearCookie(name).send({ proceso: "ok" });
  } else {
    res.send({ error: "nombre no encontrado" });
  }
});

// this is default in case of unmatched routes
app.use((req, res) => {
  // Invalid request
  res.json({
    error: -2,
    descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
  });
});

const server = app.listen(8080, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
}); */

////////////////////////////////////////////////////////////////////////

// Parte 2

/* import express from "express";
import session from "express-session";

const app = express();

var PORT = process.env.port || 3000;

app.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/con-session", (req, res) => {
  if (req.session.contador) {
    req.session.contador++;
    res.send(`Ud ha visitado el sitio ${req.session.contador} veces.`);
  } else {
    req.session.contador = 1;
    res.send(`Bienvenido.`);
  }
});

app.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (username !== "pepe" || password !== "pepepass") {
    return res.send("login failed");
  }
  req.session.user = username;
  req.session.admin = true;
  res.send("login success!");
});

function auth(req, res, next) {
  if (req.session?.user === "pepe" && req.session?.admin) {
    return next();
  }
  return res.status(401).send("error de autorización!");
}

app.get("/privado", auth, (req, res) => {
  res.send("si estas viendo esto es porque ya te logueaste!");
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.send("Logout ok!");
  });
});

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
}); */

////////////////////////////////////////////////////////////////////////

// Parte 2 - Desafío

import express from "express";
import session from "express-session";

const app = express();

var PORT = process.env.port || 3000;

app.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  const { nombre } = req.query;
  req.session.nombre = nombre;
  if (req.session.contador) {
    req.session.contador++;
    res.send(
      `${req.session.nombre} has visitado el sitio ${req.session.contador} veces.`
    );
  } else {
    req.session.contador = 1;
    res.send(`Te damos la bienvenida ${req.session.nombre}`);
  }
});

app.get("/olvidar", (req, res) => {
  let nombre = req.session.nombre;
  req.session.destroy((err) => {
    if (!err) res.send(`Hasta luego ${nombre}`);
    else res.send({ error: err });
  });
});

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
