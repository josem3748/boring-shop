import jm from "./servicio.js";

//clave:123
const todas = async (req, res) => {
  console.log(req.headers);
  if (req.headers.clave == 123) {
    return res.json(await jm.todas());
  }
  return res.json("No autorizado");
};

const suma = (req, res) => {
  const { num1, num2 } = req.query;
  if (num1 && num2) {
    return res.json(jm.suma(num1, num2));
  }
};

const resta = (req, res) => {
  const { num1, num2 } = req.query;
  if (num1 && num2) {
    return res.json(jm.resta(num1, num2));
  }
};

const multi = (req, res) => {
  const { num1, num2 } = req.query;
  if (num1 && num2) {
    return res.json(jm.multi(num1, num2));
  }
};

const divi = (req, res) => {
  const { num1, num2 } = req.query;
  if (num1 && num2) {
    return res.json(jm.divi(num1, num2));
  }
};

export { todas, suma, resta, multi, divi };
