const { isAdmin } = require("../../common/Helper");
const {
  getDashboardData,
  getAllUsers,
} = require("../controllers/UserController");

const Router = require("express").Router();

Router.get("/dashboard-data", [isAdmin], getDashboardData);
Router.get("/all-users", [isAdmin], getAllUsers);

module.exports = Router;
