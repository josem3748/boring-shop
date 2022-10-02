/* const lista: Array<number> = [2, 3, 5, 7];
lista.map((x: number) => x * x).forEach((x: number) => console.log(x)); */
// Desafio color
var Colorito = /** @class */ (function () {
    function Colorito() {
        var getRandomInt = function (max) { return Math.floor(Math.random() * max); };
        var r = getRandomInt(256);
        var g = getRandomInt(256);
        var b = getRandomInt(256);
        var color = [r, g, b];
        return color;
    }
    return Colorito;
}());
var colorRand = new Colorito();
console.log(colorRand);
