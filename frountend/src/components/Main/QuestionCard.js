import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import "./css/QuestionCard.css";

function QuestionCard({ question }) {
  if (!question) return null;

  const getAuthorName = (user) => {
    if (!user) return "Anonymous";
    return user.displayName || user.email.split("@")[0];
  };

  const truncateBody = (body) => {
    if (!body) return "";
    return body.slice(0, 200) + "...";
  };

  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>{question.votes || 0}</p>
              <span>Votes</span>
            </div>
            <div className="all-option">
              <p>
                {question.answerDetails ? question.answerDetails.length : 0}
              </p>
              <span>Answers</span>
            </div>
            <div className="all-option">
              <p>{question.views || 0}</p>
              <small>Views</small>
            </div>
          </div>
        </div>
        <div className="question-answer">
          <Link to={`/view-question/${question._id}`}>{question.title}</Link>
          <div style={{ width: "90%" }}>
            <div
              dangerouslySetInnerHTML={{ __html: truncateBody(question.body) }}
            ></div>
          </div>
          <div style={{ display: "flex" }}>
            {question.tags &&
              question.tags.map((tag, index) => (
                <span key={index} className="question-tag">
                  {tag}
                </span>
              ))}
          </div>
        </div>
        <div className="author">
          <small>{new Date(question.created_at).toLocaleString()}</small>
          <div className="author-details">
            <Avatar src={question.user ? question.user.photo : ""} />
            <p>{getAuthorName(question.user)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    votes: PropTypes.number,
    views: PropTypes.number,
    answerDetails: PropTypes.array,
    tags: PropTypes.arrayOf(PropTypes.string),
    created_at: PropTypes.string.isRequired,
    user: PropTypes.shape({
      photo: PropTypes.string,
      displayName: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
};

export default QuestionCard;
