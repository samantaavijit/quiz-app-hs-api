const { isAdmin } = require("../../common/Helper");
const {
  getDashboardData,
  getAllUsers,
  toggleUserStatus,
  updateUserDetails,
} = require("../controllers/UserController");

const Router = require("express").Router();

Router.get("/dashboard-data", [isAdmin], getDashboardData);
Router.get("/all-users", [isAdmin], getAllUsers);
Router.put("/toogle-user-status", [isAdmin], toggleUserStatus);
Router.put("/update-user-details", [isAdmin], updateUserDetails);

module.exports = Router;
