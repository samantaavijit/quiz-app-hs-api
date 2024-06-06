const Router = require("express").Router();

module.exports = (app) => {
  Router.get("/", (req, res) => {
    res.send(`Welcome to ${process.env.APP_NAME}`);
  });

  app.use(Router);
  app.use("/api/auth", require("../AuthModule/routes/AuthRoutes"));
  app.use("/api/question", require("../QuestionModule/routes/QuestionRoutes"));
  app.use("/api/user", require("../UserModule/routes/UserRoutes"));
  app.use("/api/wallet", require("../WalletModule/routes/WalletRoutes"));
};
