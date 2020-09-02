import React, { useContext } from "react";
import { QuestionContext } from "../contexts/QuestionContext";

const Question = props => {
  const { questionObject, questionId, category, chooseCategory } = useContext(
    QuestionContext
  );
  const actualQuestion = questionObject.question;
  return category === "" ? (
    <div className="SetCategory">
      <h3>Select category</h3>
      <select onChange={chooseCategory}>
        <option value="9">General Knowledge</option>
        <option value="10">Books</option>
        <option value="11">Film</option>
        <option value="12">Music</option>
        <option value="17">Science & Nature</option>
        <option value="19">Math</option>
        <option value="20">Mythology</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="27">Animals</option>
      </select>
    </div>
  ) : (
    <div className="Question">
      <div>
        Question <span>{questionId + 1} of 10</span>:
      </div>
      <h3 dangerouslySetInnerHTML={{ __html: actualQuestion }}></h3>
    </div>
  );
};

export default Question;
