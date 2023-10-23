const Router = require("express").Router();

module.exports = (app) => {
  Router.get("/", (req, res) => {
    res.send(`Welcome to ${process.env.APP_NAME}`);
  });

  app.use(Router);
  app.use("/api/auth", require("../AuthModule/routes/AuthRoutes"));
};
