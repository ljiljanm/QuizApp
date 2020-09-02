import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Answer = props => {
  const [additionalClass, setAdditionalClass] = useState(null);
  const [correctAnswerStyle, setCorrectAnswerStyle] = useState({});
  useEffect(() => {
    if (props.clicked) {
      if (
        props.index === props.correct &&
        props.index === props.orderNumOfClicked
      ) {
        setAdditionalClass("trueAnswer");
      } else if (props.index === props.correct) {
        setCorrectAnswerStyle({
          border: "1px solid green",
          backgroundColor: "rgba(0, 255, 0, 0.2)",
        });
      } else if (props.index === props.orderNumOfClicked) {
        setAdditionalClass("falseAnswer");
      }
    }
  }, [props.clicked, props.index, props.correct, props.orderNumOfClicked]);
  // console.log("Answer - additionalClass", additionalClass);
  // console.log("Answer no: ", props.index);
  return (
    <div
      className="AnswerContainer"
      style={correctAnswerStyle}
      onClick={() => props.checkAnswer(props.index)}
    >
      <button
        className={additionalClass}
        // onClick={() => props.checkAnswer(props.index)}
      ></button>
      <div
        className="Answer"
        dangerouslySetInnerHTML={{ __html: props.answer }}
      >
        {}
      </div>
    </div>
  );
};

export default React.memo(Answer);
