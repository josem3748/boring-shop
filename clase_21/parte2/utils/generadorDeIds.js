import faker from "faker";
faker.locale = "es";

function generarId() {
  return faker.datatype.uuid();
}

export { generarId };
