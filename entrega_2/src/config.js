import fs from "fs";

const connectionArchivo = async () => {
  console.log("DbArchivo conectada");
  return await fs.promises.readFile("../dbArchivo/carts.txt", "utf-8");
};

import mongoose from "mongoose";

const connectionMongoDb = async () => {
  mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDb conectada");
};

import admin from "firebase-admin";
import { createRequire } from "module";

const connectionFirebase = async () => {
  const require = createRequire(import.meta.url);
  const ServiceAccount = require("../dbFirebase/jm-boring-shop-firebase-adminsdk-i6ixe-556e464894.json");

  admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
  });
  console.log("Firebase conectada");
};

import pkg from "knex";
const { knex } = pkg;

const optionsMariaDb = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ecommerce",
  },
};

const connectionMariaDb = knex(optionsMariaDb);

const optionsSQLite3 = {
  client: "sqlite3",
  connection: {
    filename: "../dbSQLite3/mydb.sqlite",
  },
  useNullAsDefault: true,
};

const connectionSQLite3 = knex(optionsSQLite3);

export {
  connectionArchivo,
  connectionMongoDb,
  connectionFirebase,
  connectionMariaDb,
  connectionSQLite3,
};
