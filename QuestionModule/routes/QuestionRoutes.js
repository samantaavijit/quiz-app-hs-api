const { uploadThumbnail } = require("../../common/fileHelper");
const {
  uploadChapterThumbnail,
  addChapter,
  getAllChapters,
  addQuestion,
  getTopicWiseQuestions,
  generateRandomQuestion,
} = require("../controllers/QuestionController");
const {
  addChapterValidation,
  addQuestionValidation,
} = require("../validation/QuestionValidation");
const { isAdmin, isAuthenticate } = require("../../common/Helper");

const Router = require("express").Router();

// FOR ADMIN ONLY
Router.post(
  "/upload-thumbnail",
  uploadThumbnail.single("image"),
  uploadChapterThumbnail
);

Router.post("/add-chapter", [isAdmin, addChapterValidation], addChapter);
Router.post("/add-question", [isAdmin, addQuestionValidation], addQuestion);

// FOR USERS ONLY

Router.get("/all-chapters", [isAuthenticate], getAllChapters);
Router.get(
  "/topic-wise-question/:c_id",
  [isAuthenticate],
  getTopicWiseQuestions
);
Router.get("/get-quiz-question", [isAuthenticate], generateRandomQuestion);

module.exports = Router;
