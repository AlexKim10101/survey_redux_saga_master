import React from "react";
import {
  ISlideMoveDirection,
  ISurveyQuestion,
} from "../../duck/fakeData/surveyData";

type IProgressQuestionList = {
  questions: ISurveyQuestion[];
  currentQuestionIndex: number;
};

const ProgressQuestionList: React.FC<IProgressQuestionList> = ({
  questions,
  currentQuestionIndex,
}) => {
  return (
    <div className="test-progress-wrapper">
      <div className="test-progress-block">
        {questions.map((_, index) => {
          if (currentQuestionIndex === index) {
            return (
              <div
                className="test-progress-item test-progress-item-active"
                key={index}
              ></div>
            );
          } else if (currentQuestionIndex < index) {
            return <div className="test-progress-item" key={index}></div>;
          } else {
            return (
              <div
                className="test-progress-item test-progress-item-success"
                key={index}
              ></div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ProgressQuestionList;
