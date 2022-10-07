import { options } from "./options/mariaDB.js";
import knex from "knex";

const db = knex(options);

const cars = [
  { name: "Audi", price: 52642 },
  { name: "Mercedes", price: 57127 },
  { name: "Skoda", price: 9000 },
  { name: "Volvo", price: 29000 },
  { name: "Bentley", price: 350000 },
  { name: "Citroen", price: 21000 },
  { name: "Hummer", price: 41400 },
  { name: "Volskwagen", price: 21600 },
];

//Seleccionamos la tabla e insertamos los 8 registros
const insertCars = (db) => {
  db("cars")
    .insert(cars)
    .then(() => console.log("data inserted"))
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      db.destroy();
    });
};

export { cars };
