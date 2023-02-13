const getConfig = async (req, res) => {
  const configProd = {
    URL: process.env.URL,
    ADMIN: process.env.ADMIN,
    ADMINMAIL: process.env.ADMINMAIL,
    ADMINPASS: process.env.ADMINPASS,
    PORT: process.env.PORT,
    SESSIONTIMEMINS: process.env.SESSIONTIMEMINS,
  };
  // const configDev = {
  //   URL: process.env.test.URL,
  //   ADMIN: process.env.test.ADMIN,
  //   ADMINMAIL: process.env.test.ADMINMAIL,
  //   ADMINPASS: process.env.test.ADMINPASS,
  //   PORT: process.env.test.PORT,
  //   SESSIONTIMEMINS: process.env.test.SESSIONTIMEMINS,
  // };
  res.status(200).render("config", {
    user: req.session.user,
    prod: configProd,
    // dev: configDev,
  });
};

export { getConfig };
