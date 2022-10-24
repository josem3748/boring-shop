import empresa from "./empresa.js";
import { normalize, denormalize, schema } from "normalizr";
import util from "util";

const gerenteSchema = new schema.Entity("gerentes");
const encargadoSchema = new schema.Entity("encargados");
const empleadoSchema = new schema.Entity("empleados");

// Definimos un esquema de artículos
const empresaSchema = new schema.Entity("empresas", {
  gerente: gerenteSchema,
  encargado: encargadoSchema,
  empleados: [empleadoSchema],
});

const normalizedEmpresa = normalize(empresa, empresaSchema);

const denormalizedEmpresa = denormalize(
  normalizedEmpresa.result,
  empresaSchema,
  normalizedEmpresa.entities
);

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

print(normalizedEmpresa);

let size1 = JSON.stringify(empresa).length;
let size2 = JSON.stringify(normalizedEmpresa).length;
let size3 = JSON.stringify(empresa).length;
let size4 = JSON.stringify(denormalizedEmpresa).length;

console.log(size1, size2);
console.log(size3, size4);

//print(denormalizedEmpresa);
