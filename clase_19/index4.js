import mongoose from "mongoose";
import * as model from "./models/estudiantes.js";
import moment from "moment/moment.js";

const estudiantes = [
  {
    nombre: "Pedro",
    apellido: "Mei",
    edad: 21,
    dni: "31155898",
    curso: "1A",
    nota: 7,
  },
  {
    nombre: "Ana",
    apellido: "Gonzalez",
    edad: 32,
    dni: "27651878",
    curso: "1A",
    nota: 8,
  },
  {
    nombre: "José",
    apellido: "Picos",
    edad: 29,
    dni: "34554398",
    curso: "2A",
    nota: 6,
  },
  {
    nombre: "Lucas",
    apellido: "Blanco",
    edad: 22,
    dni: "30355874",
    curso: "3A",
    nota: 10,
  },
  {
    nombre: "María",
    apellido: "García",
    edad: 36,
    dni: "29575148",
    curso: "1A",
    nota: 9,
  },
  {
    nombre: "Federico",
    apellido: "Perez",
    edad: 41,
    dni: "320118321",
    curso: "2A",
    nota: 5,
  },
  {
    nombre: "Tomas",
    apellido: "Sierra",
    edad: 19,
    dni: "38654790",
    curso: "2B",
    nota: 4,
  },
  {
    nombre: "Carlos",
    apellido: "Fernández",
    edad: 33,
    dni: "26935670",
    curso: "3B",
    nota: 2,
  },
  {
    nombre: "Fabio",
    apellido: "Pieres",
    edad: 39,
    dni: "4315388",
    curso: "1B",
    nota: 9,
  },
  {
    nombre: "Daniel",
    apellido: "Gallo",
    edad: 25,
    dni: "37923460",
    curso: "3B",
    nota: 2,
  },
];

(async () => {
  try {
    // Conexión a la base de datos
    const URL = "mongodb://localhost:27017/colegio";
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de datos conectada");
    // 0
    let resultado = await model.estudiantes.deleteMany({});
    console.log("---------0-1---------");
    console.log(resultado);
    resultado = await model.estudiantes.insertMany(estudiantes);
    console.log("---------0-2---------");
    console.log(resultado);
    // 1
    resultado = await model.estudiantes.updateOne(
      { nombre: "Lucas", apellido: "Blanco" },
      {
        $set: { dni: "20355875" },
      }
    );
    console.log("---------1---------");
    console.log(resultado);
    // 2
    model.estudiantes.schema.add({ ingreso: Boolean });
    resultado = await model.estudiantes.updateMany(
      {},
      {
        $set: { ingreso: false },
      }
    );
    console.log("---------2---------");
    console.log(resultado);
    // 3
    resultado = await model.estudiantes.updateMany(
      { curso: "1A" },
      {
        $set: { ingreso: true },
      }
    );
    console.log("---------3---------");
    console.log(resultado);
    // 4
    resultado = await model.estudiantes.find(
      { nota: { $gte: 4 } },
      { _id: 0, __v: 0 }
    );
    console.log("---------4---------");
    console.log(resultado);
    // 5
    resultado = await model.estudiantes.find(
      { ingreso: true },
      { _id: 0, __v: 0 }
    );
    console.log("---------5---------");
    console.log(resultado);
    // 6
    resultado = await model.estudiantes.deleteMany({ ingreso: true });
    console.log("---------6---------");
    console.log(resultado);
    // 7
    resultado = await model.estudiantes.find({}, { __v: 0 });
    console.log("---------7---------");
    resultado.forEach((elem) => {
      console.log(
        `${elem} -> Fecha creación: ${moment(elem["_id"].getTimestamp()).format(
          "DD/MM/YYYY hh:mm:ss"
        )}`
      );
    });
    // Apagando la conexión
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
    mongoose.connection.close();
  }
})();
