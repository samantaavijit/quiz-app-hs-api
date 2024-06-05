const mongoose = require("mongoose");
const { TEST_STATUS } = require("../../common/VariableHelper");
const CompleteTestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  test_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mock_tests",
    required: true,
  },
  status: {
    type: Number,
    default: TEST_STATUS.INPROGRESS,
  },
  score: Number,
});

module.exports = mongoose.model("complete_tests", CompleteTestSchema);
