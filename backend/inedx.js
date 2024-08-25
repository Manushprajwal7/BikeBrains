const express = require("express");
const router = express.Router();
const questionRouter = require("./routers/Question");
const answerRouter = require("./routers/Answers");
const commentRouter = require("./routers/Comment");

router.get("/", (req, res) => {
  res.send("Welcome to MrCarDoctor");
});

router.use("/questions", questionRouter); // Ensure this path matches the frontend request
router.use("/answers", answerRouter);
router.use("/comments", commentRouter);

module.exports = router;
