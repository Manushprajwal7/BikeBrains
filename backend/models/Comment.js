const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
    required: true,
  },
  comment: {
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

module.exports = mongoose.model("Comments", commentSchema);
