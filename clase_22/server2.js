import holding from "./holding.js";
import { normalize, denormalize, schema } from "normalizr";
import util from "util";

const gerenteSchema = new schema.Entity("gerentes");
const encargadoSchema = new schema.Entity("encargados");
const empleadoSchema = new schema.Entity("empleados");

const empresaSchema = new schema.Entity("empresas", {
  gerente: gerenteSchema,
  encargado: encargadoSchema,
  empleados: [empleadoSchema],
});

const holdingSchema = new schema.Entity("holdings", {
  empresas: [empresaSchema],
});

const normalizedholding = normalize(holding, holdingSchema);

const denormalizedholding = denormalize(
  normalizedholding.result,
  holdingSchema,
  normalizedholding.entities
);

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

print(normalizedholding);

let size1 = JSON.stringify(holding).length;
let size2 = JSON.stringify(normalizedholding).length;
let size3 = JSON.stringify(holding).length;
let size4 = JSON.stringify(denormalizedholding).length;

console.log(size1, size2);
console.log(size3, size4);

//print(denormalizedholding);
