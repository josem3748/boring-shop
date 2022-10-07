import { options } from "./options/mariaDB.js";
import knex from "knex";

const db = knex(options);

db.from("cars")
  .where("price", "9000")
  .update({ price: 9500 })
  .then(() => console.log("car updated"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    db.destroy();
  });
