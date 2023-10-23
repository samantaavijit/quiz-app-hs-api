const { registration, login } = require("../controllers/AuthControllers");
const {
  signupValidation,
  loginValidation,
} = require("../validation/AuthValidation");

const AuthRouter = require("express").Router();

AuthRouter.post("/register", [signupValidation], registration);
AuthRouter.post("/login", [loginValidation], login);

module.exports = AuthRouter;
