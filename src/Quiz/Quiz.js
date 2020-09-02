import React from "react";
import Question from "./components/Question";
// import Timer from "./components/Timer";
import OfferedAnswers from "./components/OfferedAnswers";
import "./Quiz.css";
import { QuestionContextProvider } from "./contexts/QuestionContext";

const Quiz = () => {
  return (
    <div>
      <div className="container">
        <div className="questionContainer">
          <QuestionContextProvider>
            <Question />
            {/* <Timer /> */}
            <OfferedAnswers />
          </QuestionContextProvider>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
