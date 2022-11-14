/* const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.argv */

import yargs from "yargs";
const args = yargs(process.argv.slice(2))
  .alias({ m: "modo", p: "puerto", _: "otros", d: "debug" })
  .default({ m: "prod", p: 0, d: false })
  .boolean("debug").argv;

const args2 = {};

args2.modo = args.modo;
args2.puerto = args.puerto;
args2.debug = args.debug;
args2.otros = args._;

console.log(args2);
