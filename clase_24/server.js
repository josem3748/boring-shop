// File System

/* import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import sessionFileStore from "session-file-store";

const FileStore = sessionFileStore(session);

const app = express();

app.use(cookieParser());

app.use(
  session({
    // Persistencia por file store
    store: new FileStore({ path: "./sesiones", ttl: 300, retries: 0 }),
    //
    secret: "shhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 },
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

var PORT = process.env.port || 3000;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
}); */

// Redis

/* import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

import redis from "redis";

const client = redis.createClient();

import connectRedis from "connect-redis";

const RedisStore = connectRedis(session);

const app = express();

app.use(cookieParser());

app.use(
  session({
    // Persistencia por redis
    store: new RedisStore({
      host: "localhost",
      port: 6379,
      client: client,
      ttl: 300,
    }),
    //
    secret: "shhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 },
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

var PORT = process.env.port || 3000;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
}); */

// Mongo

/* import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

import MongoStore from "connect-mongo";

const app = express();

app.use(cookieParser());

app.use(
  session({
    // Persistencia por mongo
    store: MongoStore.create({ mongoUrl: "mongodb://localhost/sesiones" }),
    //
    secret: "shhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 },
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

var PORT = process.env.port || 3000;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
}); */

// Mongo Atlas

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

import MongoStore from "connect-mongo";
const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const app = express();

app.use(cookieParser());

app.use(
  session({
    // Persistencia por mongo atlas
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://username:woWi6Lg4BLe116Lo@cluster0.jldiu.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
      dbName: "connect_mongodb_session_test",
      collectionName: "mySessions",
      ttl: 60,
    }),
    //
    secret: "shhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 },
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

var PORT = process.env.port || 3000;

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listen to port ${server.address().port}`);
});
