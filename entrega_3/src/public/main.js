const onLoadRedirect = () => {
  if (window.location.href.includes("logout")) {
    setTimeout(() => {
      window.location = "/login";
    }, 2000);
  }
};
