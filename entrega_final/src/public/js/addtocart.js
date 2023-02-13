document.addEventListener("DOMContentLoaded", function () {
  const addToCartsButtons = document.getElementsByClassName("addtocart");
  if (addToCartsButtons.length > 0) {
    Array.from(addToCartsButtons).forEach((element) => {
      const productid = element.getAttribute("data-productid");
      element.addEventListener("click", addToCart.bind(null, productid));
    });
  }

  const removeFromCartsButtons =
    document.getElementsByClassName("removefromcart");
  if (removeFromCartsButtons.length > 0) {
    Array.from(removeFromCartsButtons).forEach((element) => {
      const productid = element.getAttribute("data-productid");
      element.addEventListener("click", removeFromCart.bind(null, productid));
    });
  }

  const clearCartButton = document.getElementById("clearcart");
  if (clearCartButton) {
    clearCartButton.addEventListener("click", clearCart);
  }

  const addAddressButton = document.getElementById("agregardireccionentrega");
  if (addAddressButton) {
    addAddressButton.addEventListener("click", addAddress);
  }

  const deleteAddressButton = document.getElementById(
    "cambiardireccionentrega"
  );
  if (deleteAddressButton) {
    deleteAddressButton.addEventListener("click", deleteAddress);
  }

  const buyForm = document.getElementById("formdecompra");
  if (buyForm) {
    buyForm.addEventListener("submit", checkearDire);
  }
});

/* const authentication = async () => {
  const raw = JSON.stringify({
    username: "jose",
    password: "123",
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  return fetch("/apilogin", requestOptions).then((response) => response.json());
};

const getAllCarritos = async () => {
  const auth = await authentication();
  const myHeaders = new Headers();
  myHeaders.append("tokken", auth.tokken);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch("/api/carrito/", requestOptions).then((response) =>
    response.json()
  );
}; */

const getAllCarritos = async () => {
  const requestOptions = {
    method: "GET",
  };

  return fetch("/api/carrito/", requestOptions).then((response) =>
    response.json()
  );
};

const deleteProdCarrito = async (carritoid, productoid) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return fetch(
    `/api/carrito/${carritoid}/productos/${productoid}`,
    requestOptions
  ).then((response) => response.json());
};

const postProdCarrito = async (carritoid, producto) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  };

  return fetch(`/api/carrito/${carritoid}/productos`, requestOptions).then(
    (response) => response.json()
  );
};

const postCarrito = async (carrito) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carrito),
  };

  return fetch("/api/carrito/", requestOptions).then((response) =>
    response.json()
  );
};

const putCarrito = async (carritoid, carritoCambios) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carritoCambios),
  };

  return fetch(`/api/carrito/${carritoid}`, requestOptions).then((response) =>
    response.json()
  );
};

const deleteCarrito = async (carritoid) => {
  const requestOptions = {
    method: "DELETE",
  };

  return fetch(`/api/carrito/${carritoid}`, requestOptions).then((response) =>
    response.json()
  );
};

const addToCart = async (productid) => {
  const userid = document
    .getElementById("logout-form")
    .getAttribute("data-userid");

  let qtyproducto = document.getElementById("cantidad");

  if (!qtyproducto) {
    qtyproducto = 1;
  } else {
    qtyproducto = qtyproducto.value;
  }

  const carritos = await getAllCarritos();
  let carrito = carritos.find((elem) => elem.userid == userid);

  if (carrito) {
    let productoIndex = carrito.productos.findIndex(
      (elem) => elem.id == productid
    );

    if (productoIndex >= 0) {
      let cambioProducto = carrito.productos[productoIndex];
      cambioProducto.qty += qtyproducto;

      await deleteProdCarrito(carrito.id, carrito.productos[productoIndex].id);
      await postProdCarrito(carrito.id, cambioProducto);

      alert("Producto agregado al carrito.");
      return (window.location = "/cart");
    } else {
      const nuevoProducto = {
        id: parseInt(productid),
        qty: qtyproducto,
      };

      await postProdCarrito(carrito.id, nuevoProducto);

      alert("Producto agregado al carrito.");
      return (window.location = "/cart");
    }
  } else {
    const nuevoCarrito = {
      productos: [
        {
          id: parseInt(productid),
          qty: qtyproducto,
        },
      ],
      userid: userid,
    };

    await postCarrito(nuevoCarrito);

    alert("Producto agregado al carrito.");
    return (window.location = "/cart");
  }
};

const removeFromCart = async (productid) => {
  const userid = document
    .getElementById("logout-form")
    .getAttribute("data-userid");

  const carritos = await getAllCarritos();
  let carrito = carritos.find((elem) => elem.userid == userid);

  let productoIndex = carrito.productos.findIndex(
    (elem) => elem.id == productid
  );

  let cambioProducto = carrito.productos[productoIndex];
  cambioProducto.qty -= 1;

  if (cambioProducto.qty === 0) {
    await deleteProdCarrito(carrito.id, carrito.productos[productoIndex].id);
    alert("Producto quitado del carrito.");
    return (window.location = "/cart");
  } else {
    await deleteProdCarrito(carrito.id, carrito.productos[productoIndex].id);
    await postProdCarrito(carrito.id, cambioProducto);
    alert("Producto quitado del carrito.");
    return (window.location = "/cart");
  }
};

const clearCart = async () => {
  const userid = document
    .getElementById("logout-form")
    .getAttribute("data-userid");

  const carritos = await getAllCarritos();
  let carrito = carritos.find((elem) => elem.userid == userid);

  await deleteCarrito(carrito.id);
  alert("Carrito eliminado.");
  return (window.location = "/cart");
};

const addAddress = async () => {
  const userid = document
    .getElementById("logout-form")
    .getAttribute("data-userid");

  const direccion = document.getElementById("cartaddress").value;

  if (!direccion) return alert("Debe agregar una dirección.");

  const carritos = await getAllCarritos();
  let carrito = carritos.find((elem) => elem.userid == userid);

  let cambiosCarrito = {
    cartid: carrito.id,
    cambios: {
      address: direccion,
    },
  };

  await putCarrito(carrito.id, cambiosCarrito);
  alert("Dirección agregada.");
  return (window.location = "/cart");
};

const deleteAddress = async () => {
  const userid = document
    .getElementById("logout-form")
    .getAttribute("data-userid");

  const carritos = await getAllCarritos();
  let carrito = carritos.find((elem) => elem.userid == userid);

  let cambiosCarrito = {
    cartid: carrito.id,
    cambios: {
      address: "",
    },
  };

  await putCarrito(carrito.id, cambiosCarrito);
  alert("Dirección eliminada.");
  return (window.location = "/cart");
};

const checkearDire = (e) => {
  e.preventDefault();
  const botonAgregar = document.getElementById("agregardireccionentrega");

  if (botonAgregar) {
    return alert("Por favor agrega una dirección de entrega.");
  }
  document.getElementById("formdecompra").submit();
};
