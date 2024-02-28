const { validationResult } = require("express-validator");
const { commonMessage, response } = require("../../common/responseHelper");
const ChapterModel = require("../models/ChapterModel");
const { file_size } = require("../../common/fileHelper");
const path = require("path");
const moment = require("moment");
const {
  uploadToFirebaseBucket,
  firebaseDatabase,
} = require("../../common/firebaseHelper");

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

const uploadChapterThumbnail = async (req, res) => {
  try {
    let { file } = req;

    if (!file) {
      responseData = {
        success: false,
        message: commonMessage.EMPTY_FILE,
      };
      return response({
        statusCode: 200,
        status: "failed",
        response: responseData,
        res,
      });
    }

    if (file.size > file_size.THUMBNAIL) {
      responseData = {
        success: false,
        message: commonMessage.SIZE_EXCEEDED,
      };
      return response({
        statusCode: 200,
        status: "failed",
        response: responseData,
        res,
      });
    }

    let ext = path.extname(file.originalname);

    let image_name = `job_${moment().unix()}${Math.floor(
      Math.random() * 100
    )}${ext}`;

    let cover_image = await uploadToFirebaseBucket(
      file,
      "computer",
      image_name
    );

    console.log(cover_image);
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
      question,
      options,
      answer,
      year,
      hints,
    };

    const ref = firebaseDatabase.ref(c_id);

    ref
      .child(new Date().getTime())
      .set(data)
      .then(() => {
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
      })
      .catch((error) => {
        responseData = {
          success: false,
          message: "Question Added Failed",
          err: error,
        };
        return response({
          statusCode: 200,
          status: "failed",
          response: responseData,
          res,
        });
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
  uploadChapterThumbnail,
  addChapter,
  getAllChapters,
  addQuestion,
};
