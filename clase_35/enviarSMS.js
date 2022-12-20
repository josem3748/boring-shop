/// YARGS
import yargs from "yargs";
const args = yargs(process.argv.slice(2)).alias({
  t: "telefono",
  m: "mensaje",
}).argv;

const telefono = args.telefono;
const mensaje = args.mensaje;

console.log(telefono, mensaje);

import twilio from "twilio";

const accountSid = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const authToken = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const client = twilio(accountSid, authToken);

if (telefono && mensaje) {
  try {
    const message = await client.messages.create({
      body: mensaje,
      from: "+xxxxxxxxxxxx",
      to: telefono,
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
} else {
  console.log("Faltan parámetros.");
}
