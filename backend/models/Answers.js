const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Answers", answerSchema);
