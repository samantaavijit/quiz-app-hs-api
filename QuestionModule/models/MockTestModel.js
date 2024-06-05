const mongoose = require("mongoose");
const MockTestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  questions: {
    type: Array,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("mock_tests", MockTestSchema);
