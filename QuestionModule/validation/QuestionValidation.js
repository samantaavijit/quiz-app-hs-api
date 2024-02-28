const { check } = require("express-validator");

const addChapterValidation = [
  check("name", "Enter valid chapter name").notEmpty(),
  check("thumbnail", "Enter valid chapter thumbnail").notEmpty(),
  check("c_id", "Enter valid chapter id").notEmpty(),
];

module.exports = {
  addChapterValidation,
};
