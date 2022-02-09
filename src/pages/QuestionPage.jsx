import React from "react";
import ProgressStepsBar from "../components/progressStepsBar/ProgressStepsBar";
import AnswersPage from "./AnswersPage";
import {
  CSSTransition,
  TransitionGroup,
} from "react-transition-group";

function QuestionPage({
  questionsList,
  questionsName,
  activeQuestionStep,
  openAswersPage
}) {
  return (
    <div>
      <TransitionGroup>
        <CSSTransition
          key={openAswersPage}
          addEndListener={(node, done) =>
            node.addEventListener("transitionend", done, false)
          }
          classNames="fade"
          // classNames={{
          //   enter: "animate__animated",
          //   enterActive: "animate__slideInRight animate__slower",
          //   enterDone: "animate__animated",
          //   exit: "animate__animated",
          //   exitActive: "animate__slideOutLeft animate__slower",
          //   exitDone: "animate__animated",
          // }}
        >
          {openAswersPage ? (
            <AnswersPage
              questionsList={questionsList}
              questionsName={questionsName}
              activeQuestionStep={activeQuestionStep}
            />
          ) : (
            <ProgressStepsBar
              questionsList={questionsList}
              questionsName={questionsName}
              activeQuestionStep={activeQuestionStep}
            />
          )}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default QuestionPage;
