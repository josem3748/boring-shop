import ServiciosCarritos from "../services/ServiceCarritos.js";
import ServiciosOrdenes from "../services/ServiceOrdenes.js";
import { mailOptions, ADMIN_MAIL } from "../middlewares/nodemailer.js";

const carrito = new ServiciosCarritos();
const orden = new ServiciosOrdenes();

const cartGet = async (req, res) => {
  const user = req.session.user;

  let carritoActual = "";
  let totalActual = 0;
  let cartAddress = "";

  if (user) {
    const userid = user._id;
    const cart = await carrito.getByUserId(userid);
    if (!cart.error) {
      carritoActual = await carrito.tablaCarrito(cart);
      totalActual = await carrito.totalCarrito(cart);

      const carros = await carrito.getAll();
      const carro = carros.find((elem) => elem.userid == userid);
      cartAddress = carro.address;
    }
  }

  res.status(200).render("cart", {
    user: req.session.user,
    body: carritoActual,
    total: totalActual,
    address: cartAddress,
  });
};

const cartPost = async (req, res) => {
  const user = req.session.user;

  let carritoActual = "";
  let totalActual = 0;

  carritoActual += `<table class="table" style="background-color: black; color: white; width: 600px; text-align: center;">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Qty</th>
        <th scope="col">Price</th>
      </tr>
    </thead>
    <tbody id="productos" style="color: gray">`;

  if (user) {
    const userid = user._id;
    const cart = await carrito.getByUserId(userid);
    carritoActual += await carrito.tablaCarritoEmail(cart);
    totalActual = await carrito.totalCarrito(cart);
  }

  carritoActual += `</tbody>
    </table>
    <p>Total: <strong>${totalActual}</strong></p>`;

  ////////// Nodemailer ///////////

  mailOptions.subject = `Pedido recibido!`;
  mailOptions.html = carritoActual;
  mailOptions.to = user.address;

  carrito.sendMail(mailOptions);

  mailOptions.subject = `Nuevo pedido`;
  mailOptions.to = ADMIN_MAIL;

  carrito.sendMail(mailOptions);

  ///////////////////////////////

  const cart = await carrito.getByUserId(user._id);
  await orden.saveOrder(cart, user._id, user.address);

  const carros = await carrito.getAll();
  let carro = carros.find((elem) => elem.userid == user._id);
  await carrito.deleteById(carro.id);

  res.status(200).render("cartsuccess", {
    user: req.session.user,
  });
};

export { cartGet, cartPost };
