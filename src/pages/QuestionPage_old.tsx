import React, { useLayoutEffect, useRef } from "react";
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
import { selectCurrentSection } from "../duck/selectors";

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
	console.log("render");

	const ref = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		ref && ref.current && ref.current.scrollIntoView();
	}, [currentQuestionIndex]);

	return (
		<div ref={ref} className="all">
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
				childFactory={child =>
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
					{/* <SurveyQuestion
						questions={submittedQuestions}
						currentQuestionIndex={currentQuestionIndex}
						setAnswer={setAnswer}
						setComment={setComment}
					/> */}
				</CSSTransition>
			</TransitionGroup>
		</div>
	);
};

const mapStateToProps = (state: IState) => {
	const section = selectCurrentSection(state);
	const {
		currentPage,
		currentQuestionIndex,
		slideMoveDirection,
		pageQuestionCount,
	} = state;
	return {
		name: section.name,
		questions: section.questions,
		currentPage,
		currentQuestionIndex,
		slideMoveDirection,
		pageQuestionCount,
	};
};

const mapDispathToProps = (dispatch: Dispatch) => {
	return {
		setAnswer: (q: IParsedSurveyQuestion) => {
			// dispatch(
			// 	setUserAnswer({
			// 		userAnswer: q.userAnswer,
			// 		questionId: q.id,
			// 		questionIndex: q.index,
			// 	})
			// );
			// q.rules.forEach(rule => {
			// 	const ruleValue = ruleIsActive(q, rule);
			// 	dispatch(applyRule({ rule, ruleValue }));
			// });
		},
		setComment: (commentValue: string) => {
			// dispatch(setUserComment({ commentValue }));
		},
	};
};

const connector = connect(mapStateToProps, mapDispathToProps);

export default connector(QuestionPage);
