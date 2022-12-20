/// YARGS
import yargs from "yargs";
const args = yargs(process.argv.slice(2)).alias({
  a: "asunto",
  m: "mensaje",
}).argv;

const asunto = args.asunto;
const mensaje = args.mensaje;

console.log(asunto, mensaje);

import { createTransport } from "nodemailer";

const TEST_MAIL = "delta.prohaska25@ethereal.email";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: "8vzAReK5PZ2Kfh18Pf",
  },
});

const mailOptions = {
  from: "Servidor Node.js",
  to: TEST_MAIL,
  subject: asunto,
  html: mensaje,
};

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

if (asunto && mensaje) {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
} else {
  console.log("Faltan parámetros.");
}
