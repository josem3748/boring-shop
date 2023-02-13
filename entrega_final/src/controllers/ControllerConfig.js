const getConfig = async (req, res) => {
  const config = {
    URL: process.env.URL,
    ADMIN: process.env.ADMIN,
    ADMINMAIL: process.env.ADMINMAIL,
    ADMINPASS: process.env.ADMINPASS,
    PORT: process.env.PORT,
    SESSIONTIMEMINS: process.env.SESSIONTIMEMINS,
  };
  res.status(200).render("config", {
    user: req.session.user,
    config: config,
  });
};

export { getConfig };
