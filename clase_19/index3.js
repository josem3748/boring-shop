const mongoose = require("mongoose");
const model = require("./models/estudiantes.js");

const promesa1 = model.estudiantes
  .find({}, { nombre: 1, _id: 0 })
  .sort({ nombre: 1 });

const promesa2 = model.estudiantes
  .find({}, { nombre: 1, edad: 1, _id: 0 })
  .sort({ edad: 1 })
  .limit(1);

const promesa3 = model.estudiantes.find(
  { curso: "2A" },
  { nombre: 1, apellido: 1, curso: 1, _id: 0 }
);

const promesa4 = model.estudiantes
  .find({}, { nombre: 1, edad: 1, _id: 0 })
  .sort({ edad: 1 })
  .skip(1)
  .limit(1);

const promesa5 = model.estudiantes
  .find({}, { nombre: 1, apellido: 1, curso: 1, _id: 0 })
  .sort({ apellido: -1 });

const promesa6 = model.estudiantes.find(
  { nota: 10 },
  { nombre: 1, apellido: 1, nota: 1, _id: 0 }
);

const promesa7 = model.estudiantes.find(
  {},
  { nombre: 1, apellido: 1, nota: 1, _id: 0 }
);

const promesa8 = model.estudiantes.find(
  { curso: "1A" },
  { nombre: 1, apellido: 1, curso: 1, nota: 1, _id: 0 }
);

// Conexión a la base de datos
const URL = "mongodb://localhost:27017/colegio";
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Base de datos conectada"))
  .then(() => {
    return promesa1;
  })
  .then((res) => {
    console.log(1);
    console.log(
      "Los estudiantes ordenados por orden alfabético según sus nombres."
    );
    console.log(res);
    return promesa2;
  })
  .then((res) => {
    console.log(2);
    console.log("El estudiante más joven.");
    console.log(res);
    return promesa3;
  })
  .then((res) => {
    console.log(3);
    console.log("Los estudiantes que pertenezcan al curso '2A'");
    console.log(res);
    return promesa4;
  })
  .then((res) => {
    console.log(4);
    console.log("El segundo estudiante más joven.");
    console.log(res);
    return promesa5;
  })
  .then((res) => {
    console.log(5);
    console.log(
      "Sólo los nombres y apellidos de los estudiantes con su curso correspondiente, ordenados por apellido descendente (z a a)."
    );
    console.log(res);
    return promesa6;
  })
  .then((res) => {
    console.log(6);
    console.log("Los estudiantes que sacaron 10.");
    console.log(res);
    return promesa7;
  })
  .then((res) => {
    console.log(7);
    console.log("El promedio de notas del total de alumnos.");
    let contador = 0;
    let suma = 0;
    res.forEach((elem) => {
      suma += elem.nota;
      contador++;
    });
    console.log(suma / contador);
    return promesa8;
  })
  .then((res) => {
    console.log(8);
    console.log("El promedio de notas del curso '1A'");
    let contador = 0;
    let suma = 0;
    res.forEach((elem) => {
      suma += elem.nota;
      contador++;
    });
    console.log(suma / contador);
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
