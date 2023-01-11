import * as dao from "../daos/index.js";
const carrito = new dao.carritosDao();

import { loggerConsole, loggerFile } from "../middlewares/loggers.js";

import { transporter, mailOptions } from "../middlewares/nodemailer.js";
import {
  ADMIN_PHONE,
  twilioWaNumber,
  messageOptions,
  client,
} from "../middlewares/twilio.js";

const cartGet = async (req, res) => {
  const user = req.session.user;

  const html = (data) => {
    return data
      .map((elem, index) => {
        return `<tr>
                    <td style="color: white;">${elem.nombre}</td>
                    <td><img src="${elem.foto}" /></td>
                    <td style="color: white;">${elem.stock}</td>
                    <td style="color: white;">${elem.precio}</td>
                  </tr>`;
      })
      .join(" ");
  };

  const total = (data) => {
    let total = 0;
    data.forEach((elem) => {
      total += elem.precio * elem.stock;
    });

    return total;
  };

  let carritoActual = "";
  let totalActual = 0;

  if (user) {
    const userid = user._id;
    const cart = await carrito.getByUserId(userid);
    carritoActual = html(cart);
    totalActual = total(cart);
  }

  res.status(200).render("cart", {
    user: req.session.user,
    body: carritoActual,
    total: totalActual,
  });
};

const cartPost = async (req, res) => {
  const user = req.session.user;

  const html = (data) => {
    return data
      .map((elem, index) => {
        return `<tr>
                    <td style="color: white;">${elem.nombre}</td>
                    <td><img src="${elem.foto}" /></td>
                    <td style="color: white;">${elem.stock}</td>
                    <td style="color: white;">${elem.precio}</td>
                  </tr>`;
      })
      .join(" ");
  };

  const total = (data) => {
    let total = 0;
    data.forEach((elem) => {
      total += elem.precio * elem.stock;
    });

    return total;
  };

  let carritoActual = "";
  let totalActual = 0;

  carritoActual += `<table class="table" style="background-color: black; color: white">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Picture</th>
        <th scope="col">Qty</th>
        <th scope="col">Price</th>
      </tr>
    </thead>
    <tbody id="productos" style="color: gray">`;

  if (user) {
    const userid = user._id;
    const cart = await carrito.getByUserId(userid);
    carritoActual += html(cart);
    totalActual = total(cart);
  }

  carritoActual += `</tbody>
    </table>
    <p>Total: <strong>${totalActual}</strong></p>`;

  ////////// Nodemailer ///////////

  mailOptions.subject = `nuevo pedido de ${user.name} (${user.address})`;
  mailOptions.html = carritoActual;

  (async () => {
    try {
      const info = await transporter.sendMail(mailOptions);
      loggerConsole.info(info);
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  })();

  ////////////////////////////////

  ///////// Twilio SMS //////////

  messageOptions.body = `Hemos recibido tu pedido ${user.name}`;
  messageOptions.to = user.phone;

  (async () => {
    try {
      const message = await client.messages.create(messageOptions);
      loggerConsole.info(message);
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  })();

  ///////////////////////////////

  ///////// Twilio Wap //////////

  const wapOptions = {};

  wapOptions.body = `nuevo pedido de ${user.name} (${user.address})`;
  wapOptions.from = `whatsapp:${twilioWaNumber}`;
  wapOptions.to = `whatsapp:${ADMIN_PHONE}`;

  (async () => {
    try {
      const message = await client.messages.create(wapOptions);
      loggerConsole.info(message);
    } catch (error) {
      loggerConsole.error(error);
      loggerFile.error(error);
    }
  })();

  ///////////////////////////////

  res.status(200).render("cartsuccess", {
    user: req.session.user,
  });
};

export { cartGet, cartPost };
