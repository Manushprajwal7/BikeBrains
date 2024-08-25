import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CachedIcon from "@mui/icons-material/Cached";
import { Avatar } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./css/ViewMainQuestion.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/counter/UserSlice";

function ViewMainQuestion() {
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [comment, setComment] = useState("");
  const user = useSelector(selectUser);
  const { id } = useParams(); // Use useParams to get the id

  useEffect(() => {
    async function getQuestionDetails() {
      try {
        const res = await axios.get(`/api/questions/${id}`);
        setQuestionData(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    getQuestionDetails();
  }, [id]);

  async function getUpdatedAnswer() {
    try {
      const res = await axios.get(`/api/questions/${id}`);
      setQuestionData(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const getAuthorName = (user) => {
    if (!user) return "Anonymous";
    return user.displayName || user.email.split("@")[0];
  };

  const handleQuill = (value) => {
    setAnswer(value);
  };

  const handleSubmit = async () => {
    if (answer !== "") {
      const body = {
        question_id: id,
        answer: answer,
        user: user,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        await axios.post("/api/answer", body, config);
        alert("Answer Added Successfully");
        setAnswer("");
        getUpdatedAnswer();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleComment = async () => {
    if (comment !== "") {
      const body = {
        question_id: id,
        comment: comment,
        user: user,
      };
      try {
        await axios.post(`/api/comment/${id}`, body);
        setComment("");
        setShow(false);
        getUpdatedAnswer();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{questionData?.title}</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-description">
          <div className="info">
            <p>
              {questionData
                ? new Date(questionData.created_at).toLocaleString()
                : ""}
            </p>
            <p>
              Active <span>Today</span>
            </p>
            <p>
              Viewed <span>44</span>
            </p>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="up-vote">
                  <KeyboardArrowUpIcon />
                </p>
                <p>0</p>
                <p className="downvote">
                  <KeyboardArrowDownIcon />
                </p>
                <BookmarkIcon />
                <CachedIcon />
              </div>
            </div>
            <div className="question-answer">
              <div
                dangerouslySetInnerHTML={{ __html: questionData?.body || "" }}
              />
              <div className="author">
                <small>
                  Asked at{" "}
                  {questionData
                    ? new Date(questionData.created_at).toLocaleDateString()
                    : ""}
                </small>
                <div className="author-details">
                  <Avatar src={questionData?.user?.photo} />
                  <p>{getAuthorName(questionData?.user)}</p>
                </div>
              </div>
            </div>
            <div className="comments">
              {questionData?.comments &&
                questionData.comments.map((comment) => (
                  <p key={comment._id}>
                    {comment.comment} -{" "}
                    <span>{getAuthorName(comment.user)}</span>
                    <small>
                      {new Date(comment.created_at).toLocaleString()}
                    </small>
                  </p>
                ))}
              <div className="comment"></div>
              <p onClick={() => setShow(!show)}>Add a comment</p>
              {show && (
                <div className="title">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    placeholder="Add Your Comment"
                    rows={5}
                  ></textarea>
                  <button onClick={handleComment}>Add Comment</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="all-questions">
          <p>{questionData?.answerDetails?.length} Answer(s)</p>
          {questionData?.answerDetails?.map((answer) => (
            <div key={answer._id} className="all-questions-container">
              <div className="all-questions-left">
                <div className="all-options">
                  <p className="up-vote">
                    <KeyboardArrowUpIcon />
                  </p>
                  <p>0</p>
                  <p className="downvote">
                    <KeyboardArrowDownIcon />
                  </p>
                  <BookmarkIcon />
                  <CachedIcon />
                </div>
              </div>
              <div className="question-answer">
                <div
                  dangerouslySetInnerHTML={{ __html: answer.answer || "" }}
                />
                <div className="author">
                  <small>
                    Answered at {new Date(answer.created_at).toLocaleString()}
                  </small>
                  <div className="author-details">
                    <Avatar src={answer.user?.photo} />
                    <p>{getAuthorName(answer.user)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="main-answer">
        <h3>Your Answer</h3>
        <ReactQuill
          value={answer}
          onChange={handleQuill}
          className="react-quill"
          theme="snow"
          style={{ height: "200px" }}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Post Your Answer
      </button>
    </div>
  );
}

export default ViewMainQuestion;
