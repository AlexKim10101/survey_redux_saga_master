import {
  CHANGE_CURRENT_PAGE,
  CHANGE_SLIDE_MOVE_DIRECTION,
  SET_CURRENT_SURVEY_CAMPANING_INDEX,
  SET_CURRENT_SECTION_INDEX,
  SET_CURRENT_QUESTION_INDEX,
  SET_USER_ANSWER,
  SET_USER_COMMENT,
  RULE_EXECUTION,
  SET_NEW_STATE,
  SET_ERROR,
} from "./types";
import { ISurveyAction } from "./actions.types";
import { IState } from "./fakeData/surveyData";
import { questionValidation } from "../utils/questionValidation";
import { findPath } from "../utils/getPath";
import { getValue, set } from "../utils/set";
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_CURRENT_QUESTION_INDEX,
  DEFAULT_CURRENT_SECTION_INDEX,
  DEFAULT_CURRENT_SURVEY_COMPANING_INDEX,
  DEFAULT_CURRENT_USER_INDEX,
  DEFAULT_MOVE_DIRECTION,
  DEFAULT_PAGE_QUESTION_COUNT,
} from "../utils/const";

const initialState: IState = {
  data: null,
  loading: false,
  error: {
    status: false,
    message: "",
  },
  currentUserIndex: DEFAULT_CURRENT_USER_INDEX,
  currentSurveyCampaningIndex: DEFAULT_CURRENT_SURVEY_COMPANING_INDEX,
  currentPage: null,
  currentQuestionIndex: DEFAULT_CURRENT_QUESTION_INDEX,
  slideMoveDirection: DEFAULT_MOVE_DIRECTION,
  currentSectionIndex: DEFAULT_CURRENT_SECTION_INDEX,
  params: {},
  pageQuestionCount: DEFAULT_PAGE_QUESTION_COUNT,
};

export const surveyReducer = (
  state: IState = initialState,
  action: ISurveyAction
): IState => {
  switch (action.type) {
    case SET_NEW_STATE: {
      return {
        ...action.payload.state,
      };
    }

    case SET_ERROR: {
      return {
        ...state,
        currentPage: "error",
        error: { ...action.payload.error },
      };
    }

    case CHANGE_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload.pageName,
      };
    }

    case SET_CURRENT_SURVEY_CAMPANING_INDEX: {
      return {
        ...state,
        currentPage: "surveyCampaning",
        currentSurveyCampaningIndex: action.payload.activeSurveyCampaningIndex,
      };
    }

    case CHANGE_SLIDE_MOVE_DIRECTION: {
      return {
        ...state,
        slideMoveDirection: action.payload.slideMoveDirection,
      };
    }

    case SET_CURRENT_SURVEY_CAMPANING_INDEX: {
      return {
        ...state,
        currentSurveyCampaningIndex: action.payload.activeSurveyCampaningIndex,
      };
    }

    case SET_CURRENT_SECTION_INDEX: {
      const questions = state.data!.surveyCampanings[
        state.currentSurveyCampaningIndex
      ].sections![action.payload.activeSectionIndex].questions;
      const firstNotDoneQuestionIndex = questions.findIndex(
        (q) => !q.questionDone
      );
      const currentQuestionIndex =
        firstNotDoneQuestionIndex === -1
          ? questions.length - 1
          : firstNotDoneQuestionIndex
          ? firstNotDoneQuestionIndex
          : 0;

      return {
        ...state,
        currentPage: "section",
        currentSectionIndex: action.payload.activeSectionIndex,
        currentQuestionIndex: currentQuestionIndex,
      };
    }

    case SET_CURRENT_QUESTION_INDEX: {
      return {
        ...state,
        currentPage: "question",
        currentQuestionIndex: action.payload.activeQuestionIndex,
      };
    }

    case SET_USER_ANSWER: {
      const currentSurveyCampaningIndex = state.currentSurveyCampaningIndex;
      const currentSectionIndex = state.currentSectionIndex;
      const currentQuestionIndex = state.currentQuestionIndex;

      const currentQuestion = state.data!.surveyCampanings[
        currentSurveyCampaningIndex
      ].sections[currentSectionIndex].questions[currentQuestionIndex];

      const currentQuestionDone = questionValidation(
        action.payload.userAnswer,
        currentQuestion
      );
      const isChildrenAnswer = action.payload.questionId !== currentQuestion.id;

      return {
        ...state,
        data: {
          ...state.data!,
          surveyCampanings: state.data!.surveyCampanings.map((item, index) => {
            if (index === currentSurveyCampaningIndex) {
              return {
                ...item,
                sections: state.data!.surveyCampanings[
                  currentSurveyCampaningIndex
                ].sections.map((section, index) => {
                  if (index === currentSectionIndex) {
                    return {
                      ...section,
                      questions: state.data!.surveyCampanings[
                        currentSurveyCampaningIndex
                      ].sections[currentSectionIndex].questions.map(
                        (question, index) => {
                          if (index === currentQuestionIndex) {
                            if (isChildrenAnswer) {
                              return {
                                ...question,
                                children: {
                                  ...question.children,
                                  [action.payload.questionId]: {
                                    ...question.children[
                                      action.payload.questionId
                                    ],
                                    userAnswer: action.payload.userAnswer,
                                    questionDone: currentQuestionDone,
                                  },
                                },
                              };
                            }
                            return {
                              ...question,
                              userAnswer: action.payload.userAnswer,
                              questionDone: currentQuestionDone,
                            };
                          }
                          return question;
                        }
                      ),
                    };
                  }
                  return section;
                }),
              };
            }
            return item;
          }),
        },
      };
    }
    case SET_USER_COMMENT: {
      const currentSurveyCampaningIndex = state.currentSurveyCampaningIndex;
      const currentSectionIndex = state.currentSectionIndex;
      const currentQuestionIndex = state.currentQuestionIndex;

      return {
        ...state,
        data: {
          ...state.data!,
          surveyCampanings: state.data!.surveyCampanings.map((item, index) => {
            if (index === currentSurveyCampaningIndex) {
              return {
                ...item,
                sections: state.data!.surveyCampanings[
                  currentSurveyCampaningIndex
                ].sections.map((section, index) => {
                  if (index === currentSectionIndex) {
                    return {
                      ...section,
                      questions: state.data!.surveyCampanings[
                        currentSurveyCampaningIndex
                      ].sections[currentSectionIndex].questions.map(
                        (question, index) => {
                          if (index === currentQuestionIndex) {
                            return {
                              ...question,
                              commentValue: action.payload.commentValue,
                            };
                          }
                          return question;
                        }
                      ),
                    };
                  }
                  return section;
                }),
              };
            }
            return item;
          }),
        },
      };
    }

    case RULE_EXECUTION: {
      const rule = action.payload.rule;
      const ruleValue = action.payload.ruleValue;
      const path = findPath(state, "id", rule.targetId);
      // console.log(getValue(state, `${path}.isActive`));
      return set(state, `${path}.isActive`, ruleValue) as IState;
    }

    default:
      return state;
  }
};
