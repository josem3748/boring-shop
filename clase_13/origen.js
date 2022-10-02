/* const lista = [2, 3, 5, 7];
lista.map((x) => x * x).forEach((x) => console.log(x)); */

// Desafio color

class Color {
  constructor() {
    const getRandomInt = (max) => Math.floor(Math.random() * max);

    const r = getRandomInt(256);
    const g = getRandomInt(256);
    const b = getRandomInt(256);

    const color = [r, g, b];
    return color;
  }
}

const color = new Color();
console.log(color);
