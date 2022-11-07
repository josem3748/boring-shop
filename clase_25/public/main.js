const checkIfComplete = () => {
  if (document.getElementById("username").value === "") {
    alert("Nombre obligatorio");
    return false;
  }
  if (document.getElementById("password").value === "") {
    alert("Pass obligatorio");
    return false;
  }

  if (document.getElementById("dir").value === "") {
    alert("Dir obligatorio");
    return false;
  }
};
