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
const { isAdmin } = require("../../common/Helper");

const Router = require("express").Router();

// FOR ALL USERS
Router.get("/all-chapters", getAllChapters);

// FOR ADMIN
Router.post(
  "/upload-thumbnail",
  uploadThumbnail.single("image"),
  uploadChapterThumbnail
);

Router.post("/add-chapter", [isAdmin, addChapterValidation], addChapter);
Router.post("/add-question", [isAdmin, addQuestionValidation], addQuestion);
Router.get("/topic-wise-question/:c_id", getTopicWiseQuestions);
Router.get("/get-quiz-question", generateRandomQuestion);

module.exports = Router;
