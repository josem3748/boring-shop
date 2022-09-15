const myFunction = () => {
  const operacion = document.getElementById("operations").value;
  const id = document.getElementById("id").value;
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;

  //GET ALL

  if (operacion === "getAll") {
    window.location.replace("http://localhost:8080/api/productos");
  }

  //GET ID

  if (operacion === "getId" && !id) {
    alert("Missing ID");
  } else if (operacion === "getId" && id) {
    window.location.replace(`http://localhost:8080/api/productos/${id}`);
  }

  //POST

  if (operacion === "post" && (!title || !price || !thumbnail)) {
    alert("Complete title, price and thumbnail");
  } else if (operacion === "post") {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      price: parseInt(price),
      title: title,
      thumbnail: thumbnail,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/productos", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    alert("Product added. Check the console.");
  }

  // PUT
  if (operacion === "put" && !id) {
    alert("Missing ID");
  } else if (operacion === "put" && !title && !price && !thumbnail) {
    alert("Change at least one of these: title, price and thumbnail");
  } else if (operacion === "put") {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const changes = {};

    price && (changes.price = parseInt(price));
    title && (changes.title = title);
    thumbnail && (changes.thumbnail = thumbnail);

    const raw = JSON.stringify(changes);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:8080/api/productos/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    alert("Check the console.");
  }

  // DELETE
  if (operacion === "delete" && !id) {
    alert("Missing ID");
  } else if (operacion === "delete") {
    const myHeaders = new Headers();

    const raw = "";

    const requestOptions = {
      method: "DELETE",
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:8080/api/productos/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    alert("Check the console.");
  }
};
