// INDEX
const getRoot = (req, res) => {
  res.send("Bienvenido");
};

// LOGIN
const getLogin = (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user;
    console.log("user logueado");
    res.render("profileUser", { user });
  } else {
    console.log("user NO logueado");
    res.render("login");
  }
};

// SIGNUP
const getSignup = (req, res) => {
  res.render("signup");
};

// PROCESS LOGIN
const postLogin = (req, res) => {
  const user = req.user;
  res.render("profileUser");
};

// PROCESS SIGNUP
const postSignup = (req, res) => {
  const user = req.user;
  res.render("profileUser");
};

const getFaillogin = (req, res) => {
  console.log("error en login");
  res.render("login-error", {});
};

const getFailsignup = (req, res) => {
  console.log("error en signup");
  res.render("signup-error", {});
};

// LOGOUT
const getLogout = (req, res) => {
  req.logout();
  res.render("index");
};

const failRoute = (req, res) => {
  res.status(404).render("routing-error", {});
};

export {
  getRoot,
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getFaillogin,
  getFailsignup,
  getLogout,
  failRoute,
};
