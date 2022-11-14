import parseArgs from "minimist";

const options = {
  alias: { m: "modo", p: "puerto", _: "otros", d: "debug" },
  default: { m: "prod", p: 0, d: false },
};

const args = parseArgs(process.argv.slice(2), options);

const args2 = {};

args2.modo = args.modo;
args2.puerto = args.puerto;
args2.debug = args.debug;
args2.otros = args._;

console.log(args2);
