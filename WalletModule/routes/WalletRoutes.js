const { isAdmin, isAuthenticate, isValidUser } = require("../../common/Helper");
const {
  addWalletBalance,
  getAllTransaction,
  getAllTransactionForAdmin,
  approveTransaction,
  deleteTransaction,
  getWalletBalance,
} = require("../controllers/WalletController");

const Router = require("express").Router();

// FOR ADMIN ONLY
Router.get("/all-transaction-for-admin", [isAdmin], getAllTransactionForAdmin);
Router.post("/approve-transaction", [isAdmin], approveTransaction);
Router.delete("/transaction/:transaction_id", [isAdmin], deleteTransaction);

// FOR USERS ONLY
Router.post("/add-balance", [isValidUser], addWalletBalance);
Router.get("/all-transactions", [isValidUser], getAllTransaction);
Router.get("/balance", [isValidUser], getWalletBalance);

module.exports = Router;
