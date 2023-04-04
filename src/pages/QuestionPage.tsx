import React, { useLayoutEffect, useRef } from "react";
import SurveyQuestion from "../components/surveyQuestion/SurveyQuestion";
import Typography from "@material-ui/core/Typography";
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
import { selectCurrentPage, selectCurrentSection } from "../duck/selectors";
import { IBackendQuestion } from "../survey.types";

export type IQuestionPage = ConnectedProps<typeof connector>;

const QuestionPage: React.FC<IQuestionPage> = ({
	questions,
	name,
	// currentQuestionIndex,
	setAnswer,
	currentPage,
	// slideMoveDirection,
	setComment,
	// pageQuestionCount,
}) => {
	console.log("QuestionPage render");

	const ref = useRef<HTMLDivElement>(null);

	// useLayoutEffect(() => {
	// 	ref && ref.current && ref.current.scrollIntoView();
	// }, [currentQuestionIndex]);

	return (
		<div ref={ref} className="all">
			<div className="title">
				<Typography variant="body1" gutterBottom>
					Page.title: {name}
				</Typography>
			</div>

			<SurveyQuestion
				questions={questions}
				setAnswer={setAnswer}
				setComment={setComment}
			/>
		</div>
	);
};

{
	/* <ProgressQuestionList
	questions={questions}
	currentQuestionIndex={currentQuestionIndex}
/>; */
}

const mapStateToProps = (state: IState) => {
	const currentPage = selectCurrentPage(state);

	return {
		name: currentPage.title,
		questions: currentPage.questions,
		currentPage,
	};
};

const mapDispathToProps = (dispatch: Dispatch) => {
	return {
		setAnswer: (q: IBackendQuestion, questionIndex: number) => {
			dispatch(setUserAnswer({ question: q, questionIndex }));

			// dispatch(
			// 	setUserAnswer({
			// 		userAnswer: q.userAnswer,
			// 		questionId: q.id,
			// 		questionIndex: q.index,
			// 	})
			// )
			// q.rules.forEach(rule => {
			// 	const ruleValue = ruleIsActive(q, rule)
			// 	dispatch(applyRule({ rule, ruleValue }))
			// })
		},
		setComment: (commentValue: string) => {
			// dispatch(setUserComment({ commentValue }))
		},
	};
};

const connector = connect(mapStateToProps, mapDispathToProps);

export default connector(QuestionPage);
