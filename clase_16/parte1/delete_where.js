import { options } from "./options/mariaDB.js";
import knex from "knex";

const db = knex(options);

db("cars")
  .where("price", ">", "50000")
  .del()
  .then(() => console.log("cars deleted"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    db.destroy();
  });
