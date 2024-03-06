const { check } = require("express-validator");

const signupValidation = [
  check("email", "Enter valid email").isEmail().isLowercase(),
  check("name", "Enter valid name").notEmpty(),
  check("avatar", "Enter valid profile photo").notEmpty(),
];
const loginValidation = [
  check("email", "Enter valid email").isEmail().isLowercase(),
  check("password", "Password must be 6 or more characters").isLength({
    min: 6,
  }),
];

module.exports = {
  signupValidation,
  loginValidation,
};
