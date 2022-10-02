/* const lista: Array<number> = [2, 3, 5, 7];
lista.map((x: number) => x * x).forEach((x: number) => console.log(x)); */

// Desafio color

class Colorito {
  constructor() {
    const getRandomInt = (max) => Math.floor(Math.random() * max);

    const r = getRandomInt(256);
    const g = getRandomInt(256);
    const b = getRandomInt(256);

    const color = [r, g, b];
    return color;
  }
}

const colorRand = new Colorito();
console.log(colorRand);
