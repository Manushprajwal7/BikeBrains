import React, { useState, useEffect } from "react";
import Main from "./Main";
import axios from "axios";

function Index() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/questions");
        console.log("API Response:", response.data); // Log the API response
        if (response.data && response.data.questions) {
          setQuestions(response.data.questions.reverse());
        } else {
          console.error("Unexpected response format", response.data);
        }
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    getQuestions();
  }, []);

  return (
    <div>
      <Main questions={questions} />
    </div>
  );
}

export default Index;
