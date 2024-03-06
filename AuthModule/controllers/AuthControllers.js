const { commonMessage, response } = require("../../common/responseHelper");
const { validationResult } = require("express-validator");
const UsersModel = require("../models/UsersModel");
const { registrationMessage, loginMessage } = require("./AuthResponse");
const bcrypt = require("bcrypt");
const { createToken } = require("../../common/Helper");
const { LOGIN_TOKEN_VALIDATION } = require("../../common/VariableHelper");
const AdminModel = require("../models/AdminModel");

let responseData;

const adminRegistration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData = {
        success: false,
        message: commonMessage.COMPLETE_MANDATORY_FIELD,
        errors: errors.array(),
      };
      return response({
        statusCode: 200,
        status: "failed",
        response: responseData,
        res,
      });
    }

    let { email, password } = req.body;

    // CHECK email ALREADY EXIST OR NOT

    const isPresent = await AdminModel.findOne({ email });

    if (isPresent) {
      responseData = {
        success: false,
        message: registrationMessage.EMAIL_EXIST,
      };
      return response({
        statusCode: 200,
        status: "failed",
        response: responseData,
        res,
      });
    }

    const solt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, solt);

    const user = await AdminModel.create({ email, password });

    if (user) {
      responseData = {
        success: true,
        message: registrationMessage.SUCCESS,
      };
      return response({
        statusCode: 200,
        status: "success",
        response: responseData,
        res,
      });
    }
    responseData = {
      success: false,
      message: registrationMessage.FAILED,
    };
    return response({
      statusCode: 200,
      status: "failed",
      response: responseData,
      res,
    });
  } catch (err) {
    let responseData = {
      success: false,
      message: commonMessage.API_ERROR,
      err: err.stack,
    };
    return response({
      statusCode: 200,
      status: "failed",
      response: responseData,
      res,
    });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData = {
        success: false,
        message: commonMessage.COMPLETE_MANDATORY_FIELD,
        errors: errors.array(),
      };
      return response({
        statusCode: 200,
        status: "failed",
        response: responseData,
        res,
      });
    }

    let { email, name, avatar } = req.body;

    let user = await UsersModel.findOne({ email });

    // CHECK USER EXIST OR NOT IF NOT PRESENT THE CREATE USER

    if (!user) {
      user = await UsersModel.create({
        email,
        name,
        avatar,
      });

      if (!user) {
        responseData = {
          success: false,
          message: loginMessage.FAILED,
        };
        return response({
          statusCode: 200,
          status: "failed",
          response: responseData,
          res,
        });
      }

      responseData = {
        success: true,
        message: loginMessage.REVIEW,
        inReview: true,
      };
      return response({
        statusCode: 200,
        status: "success",
        response: responseData,
        res,
      });
    }

    if (!user.active) {
      responseData = {
        success: true,
        message: loginMessage.REVIEW,
        inReview: true,
      };
      return response({
        statusCode: 200,
        status: "success",
        response: responseData,
        res,
      });
    }

    // VALID IN DAYS
    const token = createToken(user, LOGIN_TOKEN_VALIDATION);

    let data = await userObject(user);

    responseData = {
      success: true,
      message: loginMessage.SUCCESS,
      token,
      userDetails: data,
    };
    return response({
      statusCode: 200,
      status: "success",
      response: responseData,
      res,
    });
  } catch (err) {
    let responseData = {
      success: false,
      message: commonMessage.API_ERROR,
      err: err.stack,
    };
    return response({
      statusCode: 200,
      status: "failed",
      response: responseData,
      res,
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData = {
        success: false,
        message: commonMessage.COMPLETE_MANDATORY_FIELD,
        errors: errors.array(),
      };
      return response({
        statusCode: 200,
        status: "failed",
        response: responseData,
        res,
      });
    }

    let { email, password } = req.body;

    const user = await AdminModel.findOne({ email });

    if (!user) {
      responseData = {
        success: false,
        message: loginMessage.NO_USER,
      };
      return response({
        statusCode: 200,
        status: "failed",
        response: responseData,
        res,
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      responseData = {
        success: false,
        message: loginMessage.PASSWORD_NOT_MATCH,
      };
      return response({
        statusCode: 200,
        status: "failed",
        response: responseData,
        res,
      });
    }

    // VALID IN DAYS
    const token = createToken(user, LOGIN_TOKEN_VALIDATION);

    let data = await userObject(user);

    responseData = {
      success: true,
      message: loginMessage.SUCCESS,
      token,
      userDetails: data,
    };
    return response({
      statusCode: 200,
      status: "success",
      response: responseData,
      res,
    });
  } catch (err) {
    let responseData = {
      success: false,
      message: commonMessage.API_ERROR,
      err: err.stack,
    };
    return response({
      statusCode: 200,
      status: "failed",
      response: responseData,
      res,
    });
  }
};

const userObject = (user) => {
  return new Promise((resolve, reject) => {
    let u = { ...user };
    delete u._doc.active;
    // delete u._doc.activeStatus;
    // delete u._doc.deleted;
    // delete u._doc.activationKey;
    // delete u._doc.loggedIn;
    resolve(u._doc);
  });
};

module.exports = {
  login,
  adminLogin,
  adminRegistration,
};
