const {
  login,
  adminLogin,
  adminRegistration,
} = require("../controllers/AuthControllers");
const {
  loginValidation,
  signupValidation,
} = require("../validation/AuthValidation");

const AuthRouter = require("express").Router();

AuthRouter.post("/login", [signupValidation], login);
AuthRouter.post("/admin-signup", [loginValidation], adminRegistration);
AuthRouter.post("/admin-login", [loginValidation], adminLogin);

module.exports = AuthRouter;
