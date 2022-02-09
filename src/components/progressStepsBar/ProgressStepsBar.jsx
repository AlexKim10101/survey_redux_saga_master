import React from "react";
import "./styles/style.css";
import SurveyQuestion from "../surveyQuestion/SurveyQuestion";
import Typography from "@material-ui/core/Typography";

import {
  CSSTransition,
  SwitchTransition,
} from "react-transition-group";
import {
  makeStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  typography: {
    fontSize: "1.4em",
  },
}));

const ProgressStepsBar = ({ questionsList, questionsName, activeQuestionStep }) => {

  const classes = useStyles();

  const getStepContent = (activeStep) => {
    return <SurveyQuestion questionsListItem={questionsList[activeStep]} activeQuestionStep={activeQuestionStep}/>;
  };

  return (
    <div className="all">
      <div className="title">

        <Typography variant="body1" gutterBottom>
        {questionsName}
        </Typography>
        
      </div>
      <div className="test-progress-wrapper">
        <div className="test-progress-block">
          {questionsList.map((item, index) => {
            if (activeQuestionStep === index) {
              return <div className="test-progress-item test-progress-item-active"></div>
            } else if (activeQuestionStep < index) {
              return <div className="test-progress-item"></div>
            } else {
              return <div className="test-progress-item test-progress-item-success"></div>
            }
          })}
        </div>
      </div>
      <SwitchTransition>
        <CSSTransition
          key={activeQuestionStep}
          addEndListener={(node, done) =>
            node.addEventListener("transitionend", done, false)
          }
          classNames="fade"
        >
          {getStepContent(activeQuestionStep)}
        </CSSTransition>
      </SwitchTransition>
      
    </div>
  );
};

export default ProgressStepsBar;
