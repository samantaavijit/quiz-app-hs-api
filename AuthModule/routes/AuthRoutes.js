const {
  login,
  adminLogin,
  adminRegistration,
} = require("../controllers/AuthControllers");
const { loginValidation } = require("../validation/AuthValidation");

const AuthRouter = require("express").Router();

AuthRouter.post("/login", login);
AuthRouter.post("/admin-signup", [loginValidation], adminRegistration);
AuthRouter.post("/admin-login", [loginValidation], adminLogin);

module.exports = AuthRouter;
