import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./styles/survey.css";
import AppBarTop from "../components/appBarTop/AppBarTop";
import AppBarBottom from "../components/appBarBottom/AppBarBottom";
import MainPage from "./MainPage";
import SecondPage from "./SecondPage";

const Survey = ({ pages }) => {
  const [openQuestionList, setOpenQuestionList] = useState(false);
  const [openSecondPage, setOpenSecondPage] = useState(false);
  const [openAswersPage, setOpenAnswersPage] = useState(false);
  const [questionListIndex, setQuestionListIndex] = useState();
  const [appBarBackButton, setAppBarBackButton] = useState(false);
  const [activeQuestionStep, setActiveQuetionStep] = useState(null);

  const onClickAccordionItemButton = (index, back) => {
    if (back === true) {
      setQuestionListIndex(null);
    } else {
      setQuestionListIndex(index);
    }
    setOpenQuestionList(!openQuestionList);
    setAppBarBackButton(!appBarBackButton);
  };

  const handleNextStep = () => {
    setActiveQuetionStep(activeQuestionStep + 1);
  };

  const handlePrevStep = () => {
    setActiveQuetionStep(activeQuestionStep - 1);
  };

  const onClickEndQuestion = (status) => {
    setOpenAnswersPage(status);
  };

  const onClickListSecondPage = (status) => {
    setOpenSecondPage(status);
  };

  const onClickFirstPage = (status) => {
    setOpenQuestionList(status);
  };

  return (
    <div>
      <AppBarTop
        openQuestionList={openQuestionList}
        openSecondPage={openSecondPage}
        openAswersPage={openAswersPage}
        onClickAccordionItemButton={onClickAccordionItemButton}
        onClickListSecondPage={onClickListSecondPage}
        onClickFirstPage={onClickFirstPage}
        onClickEndQuestion={onClickEndQuestion}
      />

      <TransitionGroup>
        <CSSTransition
          key={openQuestionList}
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
          {openQuestionList ? (
            <SecondPage
              questionsList={pages[questionListIndex].questionsList}
              questionsName={pages[questionListIndex].name}
              activeQuestionStep={activeQuestionStep}
              onClickListSecondPage={onClickListSecondPage}
              openSecondPage={openSecondPage}
              setActiveQuetionStep={setActiveQuetionStep}
              openAswersPage={openAswersPage}
              setOpenAnswersPage={setOpenAnswersPage}
            />
          ) : (
            <MainPage
              progress={pages[0].allPagesProgress}
              pages={pages}
              onClickAccordionItemButton={onClickAccordionItemButton}
            />
          )}
        </CSSTransition>
      </TransitionGroup>

      {openQuestionList ? (
        <AppBarBottom
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          activeQuestionStep={activeQuestionStep}
          openSecondPage={openSecondPage}
          setActiveQuetionStep={setActiveQuetionStep}
          onClickListSecondPage={onClickListSecondPage}
          questionsList={pages[questionListIndex].questionsList}
          openAswersPage={openAswersPage}
          setOpenAnswersPage={setOpenAnswersPage}
          onClickEndQuestion={onClickEndQuestion}
          onClickFirstPage={onClickFirstPage}
          onClickAccordionItemButton={onClickAccordionItemButton}
          setQuestionListIndex={setQuestionListIndex}
        />
      ) : null}
    </div>
  );
};

export default Survey;
