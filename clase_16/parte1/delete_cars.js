import { options } from "./options/mariaDB.js";
import knex from "knex";

const db = knex(options);

db("cars")
  .del()
  .then(() => console.log("all cars deleted"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    db.destroy();
  });
