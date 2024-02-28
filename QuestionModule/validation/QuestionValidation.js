const { check } = require("express-validator");

const addChapterValidation = [
  check("name", "Enter valid chapter name").notEmpty(),
  check("thumbnail", "Enter valid chapter thumbnail").notEmpty(),
  check("c_id", "Enter valid chapter id").notEmpty(),
];
const addQuestionValidation = [
  check("c_id", "Enter valid chapter id").notEmpty(),
  check("question", "Enter valid question").notEmpty(),
  check("options", "Enter valid options").isArray(),
  check("answer", "Enter valid answer").notEmpty(),
];

module.exports = {
  addChapterValidation,
  addQuestionValidation,
};
