const { validationResult } = require("express-validator");
const { commonMessage, response } = require("../../common/responseHelper");
const ChapterModel = require("../models/ChapterModel");
// const { firebaseDatabase } = require("../../common/firebaseHelper");
const QuestionModel = require("../models/QuestionModel");
const MockTestModel = require("../models/MockTestModel");
const CompleteTestModel = require("../models/CompleteTestModel");
const { default: mongoose } = require("mongoose");

let responseData;

const addChapter = async (req, res) => {
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

    let { name, c_id, thumbnail } = req.body;

    let result = await ChapterModel.create({ name, c_id, thumbnail });

    if (result) {
      responseData = {
        success: true,
        message: "New Chapter Added",
      };
      return response({
        statusCode: 200,
        status: "success",
        response: responseData,
        res,
      });
    }
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

const getAllChapters = async (req, res) => {
  try {
    const results = await ChapterModel.find();

    responseData = {
      success: true,
      message: "All chapters",
      chapters: results,
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

const addQuestion = async (req, res) => {
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

    let { c_id, question, options, answer, year, hints } = req.body;

    year = year || null;
    hints = hints || null;

    const data = {
      c_id,
      question,
      options,
      answer,
      year,
      hints,
    };

    const result = await QuestionModel.create(data);

    if (result) {
      responseData = {
        success: true,
        message: "Question Added Successfully",
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
      message: "Question Added Failed",
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

const getTopicWiseQuestions = async (req, res) => {
  try {
    let { per_page, page } = req.query;
    const limit = per_page || 10;
    page = page || 1;
    const skip = limit * (page - 1);
    const { c_id } = req.params;

    const total = await QuestionModel.countDocuments({ c_id });
    const result = await QuestionModel.find({ c_id }).skip(skip).limit(limit);

    responseData = {
      success: true,
      message: "All Questions",
      questions: result,
      total,
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

const addMockTest = async (req, res) => {
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

    let { name, marks, time, topic } = req.body;

    let questions = [];

    if (topic !== "All Topics") {
      let ques_details = await ChapterModel.findById(topic);
      topic = ques_details.name;

      const { c_id } = ques_details;

      const pipeline = [
        { $match: { c_id } }, // Apply the condition
        { $sample: { size: Number(marks) } }, // Fetch 20 random records
        { $project: { _id: 1 } }, // Only include the _id field
      ];

      questions = await QuestionModel.aggregate(pipeline);
      questions = questions.map((doc) => doc._id);
    }

    const data = {
      name,
      marks,
      time,
      topic,
      questions,
    };

    const result = await MockTestModel.create(data);

    if (result) {
      responseData = {
        success: true,
        message: "Mock Test Created Successfully",
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
      message: "Mock Test Created Failed",
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

const generateRandomQuestion = async (req, res) => {
  try {
    let { topic_id, totalQuestions } = req.query;

    responseData = {
      success: true,
      message: "All Questions",
      questions: [],
    };
    return response({
      statusCode: 200,
      status: "success",
      response: responseData,
      res,
    });

    let randomData = [];

    if (topic_id !== "all_chapters") {
      // let query = firebaseDatabase.ref(topic_id);

      const snapshot = await query.once("value");

      // let totalItems = await TotalQuestionModel.findOne({ c_id: topic_id });

      totalItems = totalItems ? totalItems.total : 0;

      const data = snapshot.val();

      const keys = Object.keys(data);

      let randomKeys = [];
      while (randomKeys.length < Math.min(totalQuestions, totalItems)) {
        const randomIndex = Math.floor(Math.random() * keys.length);
        const key = keys[randomIndex];
        if (!randomKeys.includes(key)) {
          randomKeys.push(key);
        }
      }

      randomData = randomKeys.map((key) => data[key]);
    }

    //TODO: FOR ALL CHAPTERS

    responseData = {
      success: true,
      message: "All Questions",
      questions: [],
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

const getAllMockTest = async (req, res) => {
  try {
    const { userDetails } = req;
    const user_id = userDetails._id;

    const pipeline = [
      {
        $match: { active: true },
      },
    ];

    const mock_test = await MockTestModel.aggregate(pipeline);

    responseData = {
      success: true,
      message: "All Mock Test",
      mock_test,
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

const startMockTest = async (req, res) => {
  try {
    const { userDetails } = req;
    const user_id = userDetails._id;
    const { test_id } = req.params;

    const isPresent = await CompleteTestModel.findOne({ user_id, test_id });

    if (!isPresent) {
      await CompleteTestModel.create({ user_id, test_id });
    }

    const pipeline = [
      {
        $match: { _id: new mongoose.Types.ObjectId(test_id) },
      },
      {
        $lookup: {
          from: "questions", // The collection to join
          localField: "questions", // Field from the input documents
          foreignField: "_id", // Field from the documents of the "from" collection
          as: "questions", // Output array field
        },
      },
    ];

    const mock_test = await MockTestModel.aggregate(pipeline);

    responseData = {
      success: true,
      message: "Mock Test Details",
      mock_test,
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
  addChapter,
  getAllChapters,
  addQuestion,
  getTopicWiseQuestions,
  addMockTest,
  getAllMockTest,
  generateRandomQuestion,
  startMockTest,
};
