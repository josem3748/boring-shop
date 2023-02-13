import { createTransport } from "nodemailer";

const ADMIN_MAIL = process.env.ADMINMAIL;
const ADMIN_PASS = process.env.ADMINPASS;

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: ADMIN_MAIL,
    pass: ADMIN_PASS,
  },
});

const mailOptions = {
  from: "boring-shop",
};

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

export { transporter, mailOptions, ADMIN_MAIL };
