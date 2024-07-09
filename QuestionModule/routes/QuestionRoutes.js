const {
  addChapter,
  getAllChapters,
  addQuestion,
  getTopicWiseQuestions,
  generateRandomQuestion,
  addMockTest,
  getAllMockTest,
  startMockTest,
  completeMockTest,
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
Router.post("/add-mock-test", [isAdmin], addMockTest);

// FOR USERS ONLY

Router.get("/all-chapters", [isValidUser], getAllChapters);
Router.get(
  "/topic-wise-question/:c_id",
  [isAuthenticate],
  getTopicWiseQuestions
);
Router.get("/get-quiz-question", [isAuthenticate], generateRandomQuestion);
Router.get("/get-mock-test", [isAuthenticate], getAllMockTest);
Router.get("/get-mock-test/:test_id", [isAuthenticate], startMockTest);
Router.put("/update-mock-test", [isAuthenticate], completeMockTest);

module.exports = Router;
