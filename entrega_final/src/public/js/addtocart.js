document.addEventListener("DOMContentLoaded", function () {
  const addToCartsButtons = document.getElementsByClassName("addtocart");
  if (addToCartsButtons.length > 0) {
    Array.from(addToCartsButtons).forEach((element) => {
      element.addEventListener("click", addToCart);
    });
  }
});

const addToCart = () => {
  const userid = document
    .getElementById("logout-form")
    .getAttribute("data-userid");
  return alert(userid);
};
