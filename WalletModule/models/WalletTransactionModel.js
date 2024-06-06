const mongoose = require("mongoose");
const WalletTransactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("wallet_transactions", WalletTransactionSchema);
