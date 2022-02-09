import React from "react";
import QuestionCheckbox from "../surveyQuestionsTypes/QuestionCheckbox";
import QuestionRadio from "../surveyQuestionsTypes/QuestionRadio";
import QuestionRating from "../surveyQuestionsTypes/QuestionRating";
import { makeStyles } from "@material-ui/core/styles";

import "./styles/style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  surveyQuestionElementStyles: {
    marginTop: "40px",
  },
}));

const getSurveyAnswer = (questionsListItem, activeQuestionStep) => {
  switch (questionsListItem.type) {
    case "checkbox":
      return (
        <div className="surveyQuestionElementStyles">
          <QuestionCheckbox
            activeQuestionStep={activeQuestionStep}
            questionID={questionsListItem.id}
            question={questionsListItem.question}
            choices={questionsListItem.choices}
            answers={questionsListItem.answers}
          />
        </div>
      );

    case "radio":
      return (
        <div className="surveyQuestionElementStyles">
          <QuestionRadio
            activeQuestionStep={activeQuestionStep}
            questionID={questionsListItem.id}
            question={questionsListItem.question}
            choices={questionsListItem.choices}
            answers={questionsListItem.answers}
          />
        </div>
      );

    case "rating":
      return (
        <div className="surveyQuestionElementStyles">
          <QuestionRating
            activeQuestionStep={activeQuestionStep}
            questionID={questionsListItem.id}
            question={questionsListItem.question}
            answers={questionsListItem.answers}
          />
        </div>
      );

    default:
      return <div>Вопросов не найдено</div>;
  }
};

const SurveyQuestion = ({ questionsListItem, activeQuestionStep }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        {getSurveyAnswer(questionsListItem, activeQuestionStep)}
      </div>
    </div>
  );
};

export default SurveyQuestion;
