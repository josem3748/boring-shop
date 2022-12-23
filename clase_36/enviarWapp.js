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
const authToken = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const client = twilio(accountSid, authToken);

if (telefono && mensaje) {
  try {
    const message = await client.messages.create({
      body: mensaje,
      // mediaUrl: ["https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg"],
      from: "whatsapp:+14155238886",
      to: `whatsapp:${telefono}`,
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
} else {
  console.log("Faltan parámetros.");
}
