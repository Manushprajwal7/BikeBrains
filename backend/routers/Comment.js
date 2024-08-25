const express = require("express");
const router = express.Router();
const CommentDB = require("../models/Comment");

router.post("/:id", async (req, res) => {
  try {
    const newComment = await CommentDB.create({
      question_id: req.body.question_id,
      comment: req.body.comment,
      user: req.body.user,
    });

    res.status(200).send({
      status: true,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({
        status: false,
        message: "Error while adding the comment",
      });
    } else {
      res.status(500).send({
        status: false,
        message: "Internal server error",
      });
    }
  }
});

module.exports = router;
