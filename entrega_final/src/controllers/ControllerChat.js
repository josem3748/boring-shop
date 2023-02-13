const chatGet = async (req, res) => {
  res.status(200).render("chat", {
    user: req.session.user,
    email: "",
  });
};

const chatGetEmail = async (req, res) => {
  const { email } = req.params;
  res.status(200).render("chat", {
    user: req.session.user,
    email: email,
  });
};

export { chatGet, chatGetEmail };
