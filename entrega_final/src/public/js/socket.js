const socket = io();

const addMessage = (e) => {
  if (document.getElementById("username").value === "")
    return alert("Email obligatorio");

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const now = new Date();
  const nowFormated = now.toLocaleDateString("es-AR", options).replace(",", "");

  const isadmin = document.getElementById("isadmin").value
    ? "sistema"
    : "usuario";

  const mensaje = {
    author: {
      id: document.getElementById("username").value,
    },
    tipo: isadmin,
    fecha: nowFormated,
    text: document.getElementById("texto").value,
    respuesta: document.getElementById("response")
      ? document.getElementById("response").value
      : "",
  };
  socket.emit("mensaje", mensaje);
  return false;
};

socket.on("mensajes", (data, users) => {
  const userid = document
    .getElementById("logout-form")
    .getAttribute("data-userid");

  const user = users.find((elem) => elem._id == userid);

  let datos;

  if (!user.isadmin) {
    datos = data.filter((elem) =>
      elem.author.id == user.address ||
      (elem.tipo == "sistema" &&
        (elem.respuesta == "" || elem.respuesta == user.address))
        ? true
        : false
    );
  } else {
    datos = data;
  }

  const html = datos
    .map((elem, index) => {
      const email =
        elem.tipo == "usuario"
          ? '<strong style="color: blue;">: ' + elem.author.id + "</strong>"
          : "";

      const respuesta =
        elem.tipo == "sistema"
          ? '<strong style="color: black;">-> ' + elem.respuesta + "</strong>"
          : "";

      return `<div><strong style="color: blue;">${elem.tipo}</strong>${respuesta}${email} <span style="color: brown;">${elem.fecha}</span>: <em style="color: green;">${elem.text}</em></div>`;
    })
    .join(" ");
  const divmensajes = document.getElementById("mensajes");
  if (divmensajes) divmensajes.innerHTML = html;
});
