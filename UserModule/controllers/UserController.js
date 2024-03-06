const UsersModel = require("../../AuthModule/models/UsersModel");
const TotalQuestionModel = require("../../QuestionModule/models/TotalQuestionModel");
const { response, commonMessage } = require("../../common/responseHelper");

let responseData;

const getDashboardData = async (req, res) => {
  try {
    const total_users = await UsersModel.countDocuments({});

    let question_pipeline = [
      {
        $lookup: {
          from: "chapters",
          localField: "c_id",
          foreignField: "c_id",
          as: "chapters",
          pipeline: [
            { $project: { name: 1 } }, // Exclude the password field and fmc_token
          ],
        },
      },
      {
        $addFields: {
          // GET ONLY SINGLE VALUE
          chapters: { $arrayElemAt: ["$chapters", 0] },
        },
      },
    ];

    const total_question = await TotalQuestionModel.aggregate(
      question_pipeline
    );

    responseData = {
      success: true,
      message: "Dashboard Data",
      dashboard: {
        total_users,
        total_question,
      },
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

const getAllUsers = async (req, res) => {
  try {
    let users = await UsersModel.find();

    responseData = {
      success: true,
      message: "New Chapter Added",
      users,
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

const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.body;

    const updateResult = await UsersModel.updateOne({ _id: id }, [
      { $set: { active: { $eq: [false, "$active"] } } },
    ]);

    if (updateResult.modifiedCount === 1) {
      responseData = {
        success: true,
        message: "Active status changes successfully",
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
      message: "Active status changed failed",
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

module.exports = {
  getDashboardData,
  getAllUsers,
  toggleUserStatus,
};
