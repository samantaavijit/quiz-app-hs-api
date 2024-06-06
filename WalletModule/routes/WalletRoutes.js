const { isAdmin, isAuthenticate, isValidUser } = require("../../common/Helper");
const { addWalletBalance } = require("../controllers/WalletController");

const Router = require("express").Router();

// FOR ADMIN ONLY

// FOR USERS ONLY

Router.post("/add-balance", [isValidUser], addWalletBalance);

module.exports = Router;
