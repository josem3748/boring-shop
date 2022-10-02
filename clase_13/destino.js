"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* const lista = [2, 3, 5, 7];
lista.map((x) => x * x).forEach((x) => console.log(x)); */
// Desafio color
var Color = /*#__PURE__*/_createClass(function Color() {
  _classCallCheck(this, Color);

  var getRandomInt = function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  };

  var r = getRandomInt(256);
  var g = getRandomInt(256);
  var b = getRandomInt(256);
  var color = [r, g, b];
  return color;
});

var color = new Color();
console.log(color);
