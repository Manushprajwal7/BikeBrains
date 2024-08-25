const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const QuestionDB = require("../models/Question");

// POST route to create a new question
router.post("/", async (req, res) => {
  try {
    const questionData = new QuestionDB({
      title: req.body.title,
      body: req.body.body,
      tags: JSON.parse(req.body.tags),
      user: req.body.user,
    });

    const savedQuestion = await questionData.save();
    res.status(201).send(savedQuestion);
  } catch (err) {
    res.status(400).send({
      message: "Question not added successfully",
      error: err.message,
    });
  }
});

// GET route to fetch all questions
router.get("/", async (req, res) => {
  try {
    const questionDetails = await QuestionDB.find();
    res.status(200).send({ questions: questionDetails });
  } catch (err) {
    res.status(400).send({
      message: "Error in retrieving questions",
      error: err.message,
    });
  }
});

// GET route to fetch a specific question by ID
router.get("/:id", async (req, res) => {
  try {
    const questionId = mongoose.Types.ObjectId(req.params.id);
    const questionDetails = await QuestionDB.aggregate([
      {
        $match: { _id: questionId },
      },
      {
        $lookup: {
          from: "answers",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                user: 1,
                answer: 1,
                question_id: 1,
                created_at: 1,
              },
            },
          ],
          as: "answerDetails",
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                question_id: 1,
                user: 1,
                comment: 1,
                created_at: 1,
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);

    if (questionDetails.length === 0) {
      return res.status(404).send({ message: "Question not found" });
    }

    res.status(200).send(questionDetails[0]);
  } catch (err) {
    res.status(400).send({
      message: "Error in retrieving question",
      error: err.message,
    });
  }
});

module.exports = router;
