/* let objeto = {};

const aleatorio = (objeto) => {
  for (let i = 0; i < 999; i++) {
    const random = Math.floor(Math.random() * 20) + 1;
    const hasKey = objeto.hasOwnProperty(random);
    if (hasKey) {
      objeto[random] += 1;
    } else {
      objeto[random] = 1;
    }
  }
};

aleatorio(objeto);
console.log(objeto); */

const moment = require("moment");
console.log(moment("19920525", "YYYYMMDD").fromNow());
