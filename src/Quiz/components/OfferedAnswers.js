import React, { useContext, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { QuestionContext } from "../contexts/QuestionContext";
import Answer from "./Answer";

const OfferedAnswers = props => {
  const {
    questionObject,
    setNewQuestion,
    questionId,
    endOfQuiz,
    resetAll,
    category,
  } = useContext(QuestionContext);
  const [clicked, setClicked] = useState(false);
  const [orderNumOfClicked, setOrderNumOfClicked] = useState(null);
  const [arrayOfTrueAnswers, setArrayOfTrueAnswers] = useState([]);

  const [bravoStyle, setBravoStyle] = useState({ transform: "scale(0)" });

  const checkAnswer = useCallback(
    clickedAnswer => {
      console.log(questionId);
      setClicked(true);
      setOrderNumOfClicked(clickedAnswer);
      if (clickedAnswer === questionObject.correct) {
        setArrayOfTrueAnswers([...arrayOfTrueAnswers, questionObject.id]);
        // console.log("Bravooooo!!!", arrayOfTrueAnswers);
        setBravoStyle({ transform: "scale(1)" });
      } else {
      }

      setTimeout(() => {
        setClicked(false);
        if (questionId < 10) {
          setNewQuestion();
        }
        setBravoStyle({ transform: "scale(0)" });
      }, 1450);
    },
    [questionObject]
  );
  const loopAnswers = useCallback(
    () =>
      !endOfQuiz ? (
        questionObject.answers.map((answer, index) => (
          <Answer
            orderNumOfClicked={orderNumOfClicked}
            clicked={clicked}
            key={uuidv4()}
            answer={answer}
            index={index}
            correct={questionObject.correct}
            checkAnswer={checkAnswer}
          />
        ))
      ) : (
        <div className="EndOfQuiz">
          Great!!! you had {arrayOfTrueAnswers.length} true answers!!!
          <button onClick={resetAll}>Start Again?</button>
        </div>
      ),
    [questionObject, clicked]
  );
  // endOfQuiz && setArrayOfTrueAnswers([]);
  // console.log("In Offered Answers - array of true:", arrayOfTrueAnswers);
  return category === "" ? null : (
    <div>
      <div className="OfferedAnswers">
        <div className="Bravo" style={bravoStyle}></div>
        <div className="noOfTrue">
          True {arrayOfTrueAnswers.length} of {questionId}
        </div>
        Offered answers:
      </div>
      <div> {loopAnswers()}</div>
    </div>
  );
};

export default React.memo(OfferedAnswers);
