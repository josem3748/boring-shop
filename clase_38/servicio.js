import { listarOperaciones, guardarOperacion } from "./persistencia.js";

class jm_coder {
  constructor() {}
  todas() {
    return listarOperaciones();
  }
  suma(num1, num2) {
    const operacion = {
      tipo: "suma",
      params: [num1, num2],
      result: parseInt(num1) + parseInt(num2),
      timestamp: Date.now(),
    };
    guardarOperacion(operacion);
    return operacion.result;
  }
  resta(num1, num2) {
    const operacion = {
      tipo: "resta",
      params: [num1, num2],
      result: parseInt(num1) - parseInt(num2),
      timestamp: Date.now(),
    };
    guardarOperacion(operacion);
    return operacion.result;
  }
  multi(num1, num2) {
    const operacion = {
      tipo: "multi",
      params: [num1, num2],
      result: parseInt(num1) * parseInt(num2),
      timestamp: Date.now(),
    };
    guardarOperacion(operacion);
    return operacion.result;
  }
  divi(num1, num2) {
    const operacion = {
      tipo: "divi",
      params: [num1, num2],
      result: parseInt(num1) / parseInt(num2),
      timestamp: Date.now(),
    };
    guardarOperacion(operacion);
    return operacion.result;
  }
}

const jm = new jm_coder();

export default jm;
