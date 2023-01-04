// Clase Contenedor

class jm_coder {
  constructor() {}
  suma(num1, num2) {
    return parseInt(num1) + parseInt(num2);
  }
  resta(num1, num2) {
    return parseInt(num1) - parseInt(num2);
  }
  multi(num1, num2) {
    return parseInt(num1) * parseInt(num2);
  }
  divi(num1, num2) {
    return parseInt(num1) / parseInt(num2);
  }
}

const jm = new jm_coder();

export default jm;
