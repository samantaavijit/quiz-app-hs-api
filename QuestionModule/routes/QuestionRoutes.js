const {
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
const { isAdmin, isAuthenticate, isValidUser } = require("../../common/Helper");

const Router = require("express").Router();

// FOR ADMIN ONLY
Router.post("/add-chapter", [isAdmin, addChapterValidation], addChapter);
Router.post("/add-question", [isAdmin, addQuestionValidation], addQuestion);

// FOR USERS ONLY

Router.get("/all-chapters", [isValidUser], getAllChapters);
Router.get(
  "/topic-wise-question/:c_id",
  [isAuthenticate],
  getTopicWiseQuestions
);
Router.get("/get-quiz-question", [isAuthenticate], generateRandomQuestion);

module.exports = Router;
