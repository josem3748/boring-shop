import { generateToken } from "../middlewares/jwt.js";

const apiLoginGet = async (req, res) => {
  res.status(200).render("apilogin");
};

const apiLoginPost = async (req, res) => {
  const user = req.body;
  if (user.username === "jose" && user.password === "123") {
    const tokken = generateToken(user);
    req.session.accesstokken = tokken;
    res.json({
      info: "tokken generated - use the header: (tokken: value) to use the API",
      tokken: tokken,
    });
  } else {
    res.json("access denied");
  }
};

export { apiLoginGet, apiLoginPost };
