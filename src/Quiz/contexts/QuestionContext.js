import React, { useState, useEffect } from "react";
export const QuestionContext = React.createContext();

export const QuestionContextProvider = props => {
  const [questionId, setQuestionId] = useState(0);
  const [questionsAnswersList, setQuestionsAnswersList] = useState([]);
  const [endOfQuiz, setEndOfQuiz] = useState(false);
  const [category, setCategory] = useState("");

  const fetchQuestionList = async () => {
    console.log("from fetchQuestionList...");
    const url = `https://opentdb.com/api.php?amount=10${category}&type=multiple`;
    const response = await fetch(url);
    let questionsAnswersList = await response.json();
    questionsAnswersList = questionsAnswersList.results;
    questionsAnswersList.map((item, index) => {
      let correct = Math.floor(Math.random() * 4);
      item["answers"] = item.incorrect_answers;
      delete item.incorrect_answers;
      item.answers.splice(correct, 0, item.correct_answer);
      item["correct"] = correct;
      item.id = index;
      delete item.difficulty;
      delete item.type;
      delete item.category;
      delete item.correct_answer;
      return item;
    }, []);
    setQuestionsAnswersList(questionsAnswersList);
  };
  const chooseCategory = e => {
    console.log("In chooseCategory: ", e.target.value);
    setCategory(`&category=${e.target.value}`);
  };

  useEffect(() => {
    fetchQuestionList();
    console.log("after fetching category is...", category);
  }, [category]);
  const resetAll = () => {
    console.log("resetting all.....");
    setQuestionId(0);
    setEndOfQuiz(false);
    setCategory("");
    setQuestionsAnswersList([]);
    fetchQuestionList();
  };
  const setNewQuestion = () => {
    if (questionId < 9) {
      setQuestionId(questionId + 1);
    } else {
      console.log("Got here to set end of quiz to true");
      setEndOfQuiz(true);
      console.log(endOfQuiz);
    }
  };
  let questionObject;
  if (questionsAnswersList.length > 0) {
    questionObject = questionsAnswersList[questionId];
  } else {
    // empty object
    questionObject = {
      id: 0,
      question: "Loading...",
      answers: ["Loading...", "Loading...", "Loading...", "Loading..."],
      correct: "Loading",
    };
  }
  return (
    <QuestionContext.Provider
      value={{
        questionObject,
        setNewQuestion,
        questionId,
        endOfQuiz,
        resetAll,
        category,
        chooseCategory,
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};
