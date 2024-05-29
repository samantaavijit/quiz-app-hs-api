const UsersModel = require("../../AuthModule/models/UsersModel");
const ChapterModel = require("../../QuestionModule/models/ChapterModel");
const { response, commonMessage } = require("../../common/responseHelper");

let responseData;

const getDashboardData = async (req, res) => {
  try {
    const total_users = await UsersModel.countDocuments({});
    const new_users = await UsersModel.countDocuments({ active: false });

    let question_pipeline = [
      {
        $lookup: {
          from: "questions",
          localField: "c_id",
          foreignField: "c_id",
          as: "total",
          pipeline: [{ $project: { answer: 1 } }],
        },
      },
      {
        $addFields: {
          // GET ONLY SINGLE VALUE
          total: { $size: "$total" },
        },
      },
    ];

    const total_question = await ChapterModel.aggregate(question_pipeline);

    responseData = {
      success: true,
      message: "Dashboard Data",
      dashboard: {
        total_users,
        total_question,
        new_users,
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
      message: "All Users",
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
