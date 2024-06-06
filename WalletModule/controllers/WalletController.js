const { commonMessage, response } = require("../../common/responseHelper");
const { validationResult } = require("express-validator");
const WalletTransactionModel = require("../models/WalletTransactionModel");

let responseData;

const addWalletBalance = async (req, res) => {
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

    const { userDetails } = req;
    const user_id = userDetails._id;

    let { balance } = req.body;
    balance = Number(balance);

    const wallet = await WalletTransactionModel.create({ user_id, balance });

    if (wallet) {
      responseData = {
        success: true,
        message: "Balance Added Successfully",
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
      message: "Balance Added Failed",
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

const getAllTransaction = async (req, res) => {
  try {
    const { userDetails } = req;
    const user_id = userDetails._id;

    const transaction = await WalletTransactionModel.find({ user_id });

    responseData = {
      success: true,
      message: "All Transactions",
      transaction,
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

module.exports = {
  addWalletBalance,
  getAllTransaction,
};
