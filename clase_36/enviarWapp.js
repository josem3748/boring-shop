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

const accountSid = "ACff013edfdea289e91cff5323099228e9";
const authToken = "4908d7419588540daad86a7aff5908f6";

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
