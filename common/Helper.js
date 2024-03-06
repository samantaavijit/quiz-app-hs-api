const jwt = require("jsonwebtoken");
const { commonMessage } = require("./responseHelper");
const secretKey = "chat-app-lBox@2023";
const UsersModel = require("../AuthModule/models/UsersModel");
const AdminModel = require("../AuthModule/models/AdminModel");
const { loginMessage } = require("../AuthModule/controllers/AuthResponse");

const createToken = (user, expirationTime = 1) => {
  expirationTime = expirationTime * 24 * 60 * 60;
  // const payload = { user_id: user._id };
  const payload = { user_id: user._id, time: new Date().getTime() };
  const options = { expiresIn: expirationTime };
  return jwt.sign(payload, secretKey, options);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return "Token has expired.";
    } else {
      return "Invalid token.";
    }
  }
};

const isAuthenticate = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    if (!token) {
      responseData = {
        success: false,
        message: commonMessage.UN_AUTHORIZED,
      };
      return res.json(responseData);
    }

    let isVarifiedToken = verifyToken(token);

    if (typeof isVarifiedToken !== "object") {
      responseData = {
        success: false,
        message: isVarifiedToken,
      };
      return response({
        statusCode: 200,
        status: "failed",
        response: responseData,
        res,
      });
    }

    let { user_id } = isVarifiedToken;

    let userDetails = await UsersModel.findById(user_id);

    if (!userDetails) {
      responseData = {
        success: false,
        message: commonMessage.INVALID_USER,
      };
      return res.json(responseData);
    }

    if (!userDetails.active) {
      responseData = {
        success: false,
        message: loginMessage.REVIEW,
      };
      return res.json(responseData);
    }

    req.userDetails = userDetails;
    next();
  } catch (err) {
    responseData = {
      success: false,
      message: commonMessage.API_ERROR,
      error: err,
    };
    res.json(responseData);
  }
};

const isAdmin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    if (!token) {
      responseData = {
        success: false,
        message: commonMessage.UN_AUTHORIZED,
      };
      return res.json(responseData);
    }

    let isVarifiedToken = verifyToken(token);

    if (typeof isVarifiedToken !== "object") {
      responseData = {
        success: false,
        message: isVarifiedToken,
      };
      return response({
        statusCode: 200,
        status: "failed",
        response: responseData,
        res,
      });
    }

    let { user_id } = isVarifiedToken;

    let userDetails = await AdminModel.findById(user_id);

    if (!userDetails) {
      responseData = {
        success: false,
        message: commonMessage.INVALID_USER,
      };
      return res.json(responseData);
    }

    req.userDetails = userDetails;
    next();
  } catch (err) {
    responseData = {
      success: false,
      message: commonMessage.API_ERROR,
      error: err,
    };
    res.json(responseData);
  }
};

module.exports = {
  createToken,
  verifyToken,
  isAdmin,
  isAuthenticate,
};
