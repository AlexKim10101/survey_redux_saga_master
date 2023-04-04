import { IBackendQuestion } from "../survey.types";
import {
	IError,
	IId,
	IPageName,
	IParams,
	IRule,
	ISlideMoveDirection,
	IState,
	IUserAnswer,
} from "./fakeData/surveyData";
import {
	SET_NEW_STATE,
	CHANGE_CURRENT_PAGE,
	CHANGE_SLIDE_MOVE_DIRECTION,
	SET_CURRENT_SECTION_INDEX,
	SET_CURRENT_QUESTION_INDEX,
	SET_USER_ANSWER,
	SET_USER_COMMENT,
	SET_CURRENT_SURVEY_CAMPANING_INDEX,
	RULE_EXECUTION,
	SET_ERROR,
} from "./types";

export const setNewState = (payload: { state: IState }) =>
	<const>{
		type: SET_NEW_STATE,
		payload,
	};

export const setError = (payload: { error: IError }) =>
	<const>{
		type: SET_ERROR,
		payload,
	};

export const changeCurrentPage = (payload: { pageName: IPageName }) =>
	<const>{
		type: CHANGE_CURRENT_PAGE,
		payload,
	};

export const changeSlideMoveDirection = (payload: {
	slideMoveDirection: ISlideMoveDirection;
}) =>
	<const>{
		type: CHANGE_SLIDE_MOVE_DIRECTION,
		payload,
	};

export const setActiveSurveyCampaning = (payload: {
	activeSurveyCampaningIndex: number;
}) =>
	<const>{
		type: SET_CURRENT_SURVEY_CAMPANING_INDEX,
		payload,
	};

export const setActiveSection = (payload: { activeSectionIndex: number }) =>
	<const>{
		type: SET_CURRENT_SECTION_INDEX,
		payload,
	};

export const setActiveQuestion = (payload: { activeQuestionIndex: number }) =>
	<const>{
		type: SET_CURRENT_QUESTION_INDEX,
		payload,
	};

export const setUserAnswer = (payload: {
	question: IBackendQuestion;
	questionIndex: number;
}) =>
	<const>{
		type: SET_USER_ANSWER,
		payload,
	};

export const setUserComment = (payload: { commentValue: string }) =>
	<const>{
		type: SET_USER_COMMENT,
		payload,
	};

export const applyRule = (payload: { rule: IRule; ruleValue: boolean }) =>
	<const>{
		type: RULE_EXECUTION,
		payload,
	};
