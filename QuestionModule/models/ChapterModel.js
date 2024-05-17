const mongoose = require("mongoose");
const ChapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    max: 20,
  },
  c_id: {
    type: String,
    required: true,
    unique: true,
    max: 20,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  chapter_number: Number,
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("chapters", ChapterSchema);
