const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  c_id: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  year: String,
  hints: String,
});

module.exports = mongoose.model("questions", QuestionSchema);
