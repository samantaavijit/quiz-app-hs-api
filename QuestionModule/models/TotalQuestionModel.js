const mongoose = require("mongoose");
const TotalQuestionSchema = new mongoose.Schema(
  {
    c_id: {
      type: String,
      required: true,
    },

    total: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("total_questions", TotalQuestionSchema);
