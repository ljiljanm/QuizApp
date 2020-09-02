import React from "react";
import { useRef, useState, useContext, useEffect } from "react";
import { QuestionContext } from "../contexts/QuestionContext";

const Timer = props => {
  const { questionId } = useContext(QuestionContext);
  const [countDown, setCountDown] = useState(8);
  const classes = useRef("timerFirst");
  useEffect(() => {
    const timerHandler = setTimeout(() => {
      setCountDown(countDown - 1);
    }, 1000);
    if (countDown <= 5) {
      classes.current += " timerSecond";
    }
    if (countDown === 0) {
      return clearTimeout(timerHandler);
    }
  });
  useEffect(() => {});
  return <div className={classes.current}>Time Left: {countDown}</div>;
};

export default Timer;
