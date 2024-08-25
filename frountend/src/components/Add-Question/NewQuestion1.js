import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/counter/UserSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CreatableSelect from "react-select/creatable";
import ErrorBoundary from "./ErrorBoundary";
import "./css/NewQuestion.css";

const suggestions = [
  { id: 1, name: "Engine" },
  { id: 2, name: "Transmission" },
  { id: 3, name: "Brakes" },
  { id: 4, name: "Suspension" },
  { id: 5, name: "Exhaust" },
  { id: 6, name: "Tires" },
  { id: 7, name: "Wheels" },
  { id: 8, name: "Seats" },
  { id: 9, name: "Handlebars" },
  { id: 10, name: "Mirrors" },
  { id: 11, name: "Lights" },
  { id: 12, name: "Battery" },
  { id: 13, name: "Radiator" },
  { id: 14, name: "Air Filter" },
  { id: 15, name: "Fuel Pump" },
  { id: 16, name: "Clutch" },
  { id: 17, name: "Spark Plug" },
];

const options = suggestions.map((suggestion) => ({
  value: suggestion.id,
  label: suggestion.name,
}));

function NewQuestion() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleQuill = (value) => {
    setBody(value);
  };

  const handleTagChange = (newValue, actionMeta) => {
    if (actionMeta.action === "create-option") {
      const newOption = createOption(newValue[newValue.length - 1].label);
      setSelected([...selected, newOption]);
    } else {
      setSelected(newValue);
    }
  };

  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (title.trim() === "" || body.trim() === "") {
      setError("Title and body are required.");
      return;
    }

    setLoading(true);
    const bodyJSON = {
      title: title.trim(),
      body: body.trim(),
      tags: JSON.stringify(selected.map((option) => option.label)),
      user: user,
    };

    try {
      // Correct the URL to /api/questions
      await axios.post("http://localhost:8080/api/questions", bodyJSON);
      alert("Question added successfully");
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(
        err.response?.data?.message ||
          "An error occurred while adding the question."
      );
    }
  };

  return (
    <ErrorBoundary>
      <div className="add-question">
        <div className="add-question-container">
          <div className="head-title">
            <h1>Ask a Public Question</h1>
          </div>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="question-container">
              <div className="question-options">
                <div className="question-option">
                  <div className="title">
                    <h3>Title</h3>
                    <small>Be Specific And Imagine What You Are Asking</small>
                    <input
                      type="text"
                      placeholder="Add Your Question Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="question-option">
                  <div className="body">
                    <h3>Body</h3>
                    <small>
                      Include all the necessary information required to answer
                      your question
                    </small>
                    <ReactQuill
                      className="react-quill"
                      theme="snow"
                      value={body}
                      onChange={handleQuill}
                    />
                  </div>
                </div>
                <div className="question-option">
                  <div className="tags">
                    <h3>Tags</h3>
                    <small>
                      Add some tags to describe your question exactly. You can
                      also create new tags.
                    </small>
                    <CreatableSelect
                      isMulti
                      name="tags"
                      options={options}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={selected}
                      onChange={handleTagChange}
                      placeholder="Select or create tags"
                      noOptionsMessage={() =>
                        "No matching tags. Type to create a new tag."
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="button" disabled={loading}>
              {loading ? "Adding Question..." : "Add Your Question"}
            </button>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default NewQuestion;
