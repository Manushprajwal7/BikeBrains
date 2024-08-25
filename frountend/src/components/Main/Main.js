import React from "react";
import "./css/main.css";
import { Link } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import QuestionCard from "./QuestionCard";

function Main({ questions = [] }) {
  console.log("Questions Array:", questions); // Log the questions array

  // Filter out any invalid questions
  const validQuestions = questions.filter(
    (question) =>
      question &&
      question._id &&
      question.title &&
      question.body &&
      question.created_at
  );

  return (
    <div className="root">
      <div className="main">
        <div className="main-container">
          <div className="main-top">
            <h2>Top Questions</h2>
            <Link to="/add-question">
              <button className="main-button-ask-question">Ask Question</button>
            </Link>
          </div>
          <div className="main-dec">
            <p>{validQuestions.length} Questions</p>
            <div className="main-filter">
              <div className="main-tabs">
                <div className="main-tab">
                  <Link to="/newest">Interesting</Link>
                </div>
                <div className="main-tab">
                  <Link to="/active">Bountied</Link>
                </div>
                <div className="main-tab">
                  <Link to="/week">Week</Link>
                </div>
                <div className="main-tab">
                  <Link to="/month">Month</Link>
                </div>
              </div>
              <div className="material-filter-icon">
                <FilterAltIcon />
                <p>filter</p>
              </div>
            </div>
          </div>
          <div className="questions">
            {validQuestions.map((question, index) => (
              <div key={index} className="question">
                <QuestionCard question={question} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
