document.addEventListener("DOMContentLoaded", function () {
  const formElement = document.getElementById("registro-form");
  if (formElement) {
    formElement.addEventListener("submit", customHandler);
  }
});

const customHandler = (e) => {
  e.preventDefault();
  const pass1 = document.getElementById("password").value;
  const pass2 = document.getElementById("password-confirm").value;
  if (pass1 !== pass2) {
    return alert("Las contraseñas no coinciden.");
  }
  document.getElementById("registro-form").submit();
};
