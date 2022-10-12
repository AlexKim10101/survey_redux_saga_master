import React from "react";
import SurveyQuestion from "../components/surveyQuestion/SurveyQuestion";
import Typography from "@material-ui/core/Typography";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  IPageName,
  IParsedSurveyQuestion,
  ISetAnswer,
  ISlideMoveDirection,
  IState,
} from "../duck/fakeData/surveyData";
import ProgressQuestionList from "../components/progressLine/ProgressQuestionList";
import { TIMEOUT_VALUE } from "../utils/const";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { applyRule, setUserAnswer, setUserComment } from "../duck";
import { ruleIsActive } from "../utils/ruleIsActive";

export type IQuestionPage = ConnectedProps<typeof connector>;

const QuestionPage: React.FC<IQuestionPage> = ({
  questions,
  name,
  currentQuestionIndex,
  setAnswer,
  currentPage,
  slideMoveDirection,
  setComment,
  pageQuestionCount,
}) => {
  const submittedQuestions = questions.slice(
    currentQuestionIndex,
    currentQuestionIndex + pageQuestionCount
  );

  return (
    <div className="all">
      <div className="title">
        <Typography variant="body1" gutterBottom>
          {name}
        </Typography>
      </div>

      <ProgressQuestionList
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
      />

      <TransitionGroup
        childFactory={(child) =>
          React.cloneElement(child, {
            classNames: slideMoveDirection,
          })
        }
      >
        <CSSTransition
          key={currentPage! + currentQuestionIndex}
          classNames="left-to-right"
          timeout={{ enter: TIMEOUT_VALUE, exit: TIMEOUT_VALUE }}
        >
          <SurveyQuestion
            questions={submittedQuestions}
            currentQuestionIndex={currentQuestionIndex}
            setAnswer={setAnswer}
            setComment={setComment}
          />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const currentSurveyCampaningIndex = state.currentSurveyCampaningIndex;
  const currentSectionCampaningIndex = state.currentSectionIndex;
  const section = state.data!.surveyCampanings[currentSurveyCampaningIndex]
    .sections[currentSectionCampaningIndex];
  return {
    currentPage: state.currentPage,
    questions: section.questions,
    name: section.name,
    currentQuestionIndex: state.currentQuestionIndex,
    slideMoveDirection: state.slideMoveDirection,
    pageQuestionCount: state.pageQuestionCount,
  };
};

const mapDispathToProps = (dispatch: Dispatch) => {
  return {
    setAnswer: (q: IParsedSurveyQuestion) => {
      dispatch(setUserAnswer({ userAnswer: q.userAnswer, questionId: q.id }));
      q.rules.forEach((rule) => {
        const ruleValue = ruleIsActive(q, rule);
        dispatch(applyRule({ rule, ruleValue }));
      });
    },
    setComment: (commentValue: string) => {
      dispatch(setUserComment({ commentValue }));
    },
  };
};

const connector = connect(mapStateToProps, mapDispathToProps);

export default connector(QuestionPage);
