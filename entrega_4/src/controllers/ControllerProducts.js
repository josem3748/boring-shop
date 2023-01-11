import * as dao from "../daos/index.js";
const productos = new dao.productosDao();

const productsGet = async (req, res) => {
  const products = await productos.getAll();

  const html = (data) => {
    return data
      .map((elem, index) => {
        return `<tr>
                  <td style="color: white;">${elem.nombre}</td>
                  <td style="color: white;">${elem.precio}</td>
                  <td><img src="${elem.foto}" /></td>
                </tr>`;
      })
      .join(" ");
  };

  res.status(200).render("products", {
    user: req.session.user,
    body: html(products),
  });
};

export default productsGet;
