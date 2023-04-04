// import React from "react";
// // import QuestionCheckbox from "../surveyQuestionsTypes/QuestionCheckbox";
// // import QuestionRadio from "../surveyQuestionsTypes/QuestionRadio";
// // import QuestionRating from "../surveyQuestionsTypes/QuestionRating";
// import { makeStyles } from "@material-ui/core/styles";
// import "./styles/style.css";
// import {
// 	IPageName,
// 	IParsedQuestion,
// 	IParsedSurveyQuestion,
// 	ISetAnswer,
// 	ISurveyQuestion,
// 	IUserAnswer,
// } from "../../duck/fakeData/surveyData";
// import TextField from "@material-ui/core/TextField";
// import QuestionText from "../surveyQuestionsTypes/QuestionText";
// // import Message from "../surveyQuestionsTypes/Message";
// // import ComplexQuestion from "../surveyQuestionsTypes/ComplexQuestion";

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		flexGrow: 1,
// 		overflow: "hidden",
// 		padding: theme.spacing(0, 3),
// 	},
// 	surveyQuestionElementStyles: {
// 		marginTop: "40px",
// 	},
// 	comment: {
// 		"&.MuiFormControl-root": {
// 			marginTop: "20px",
// 		},

// 		"& .MuiInputLabel-root": {
// 			color: "#46ACAF",
// 		},
// 		"& .MuiFilledInput-root": {
// 			border: "1px solid #46ACAF",
// 			overflow: "hidden",
// 			borderRadius: 4,
// 			backgroundColor: "#fcfcfb",
// 			transition: theme.transitions.create([
// 				"border-color",
// 				"background-color",
// 				"box-shadow",
// 			]),
// 			"&:hover": {
// 				backgroundColor: "transparent",
// 			},
// 			"&.Mui-focused": {
// 				backgroundColor: "transparent",
// 				boxShadow: "#46ACAF",
// 				borderColor: "#46ACAF",
// 			},
// 		},
// 	},
// }));

// export type IGetSurveyQuestionProps = {
// 	question: IParsedSurveyQuestion;
// 	currentQuestionIndex: number;
// 	setAnswer: ISetAnswer;
// };

// export const getSurveyQuestion: React.FC<IGetSurveyQuestionProps> = ({
// 	question,
// 	currentQuestionIndex,
// 	setAnswer,
// }) => {
// 	switch (question.type) {
// 		case "complex": {
// 			return (
// 				<ComplexQuestion
// 					currentQuestionIndex={currentQuestionIndex}
// 					question={question}
// 					setAnswer={setAnswer}
// 				/>
// 			);
// 		}
// 		// case "textQuestion": {
// 		// 	return (
// 		// 		<QuestionText
// 		// 			currentQuestionIndex={currentQuestionIndex}
// 		// 			question={question}
// 		// 			setAnswer={setAnswer}
// 		// 		/>
// 		// 	);
// 		// }
// 		case "textMessage": {
// 			return (
// 				<Message
// 					currentQuestionIndex={currentQuestionIndex}
// 					question={question}
// 					setAnswer={setAnswer}
// 				/>
// 			);
// 		}

// 		case "checkbox":
// 			return (
// 				<QuestionCheckbox
// 					currentQuestionIndex={currentQuestionIndex}
// 					question={question}
// 					setAnswer={setAnswer}
// 				/>
// 			);

// 		case "radio":
// 			return (
// 				<QuestionRadio
// 					currentQuestionIndex={currentQuestionIndex}
// 					question={question}
// 					setAnswer={setAnswer}
// 				/>
// 			);

// 		case "rating":
// 			return (
// 				<QuestionRating
// 					currentQuestionIndex={currentQuestionIndex}
// 					question={question}
// 					setAnswer={setAnswer}
// 				/>
// 			);

// 		default:
// 			return <div>Вопросов не найдено</div>;
// 	}
// };

// export type ISurveyQuestionProps = {
// 	questions: IParsedSurveyQuestion[];
// 	// currentQuestionIndex: number;
// 	setAnswer: ISetAnswer;
// 	setComment: (userComment: string) => void;
// };

// const SurveyQuestion: React.FC<ISurveyQuestionProps> = ({
// 	questions,
// 	setAnswer,
// 	setComment,
// }) => {
// 	const classes = useStyles();

// 	return (
// 		<div>
// 			<div className={classes.root}>
// 				{questions.map((question, index) => (
// 					<div key={index} className={classes.surveyQuestionElementStyles}>
// 						{getSurveyQuestion({
// 							question,
// 							currentQuestionIndex: question.index,
// 							setAnswer,
// 						})}

// 						{question.comment && (
// 							<TextField
// 								id="outlined-multiline-static"
// 								className={classes.comment}
// 								InputProps={{ disableUnderline: true }}
// 								label="Комментарий"
// 								color="primary"
// 								minRows="6"
// 								fullWidth
// 								multiline
// 								variant="filled"
// 								value={question.commentValue}
// 								onChange={e => {
// 									setComment(e.target.value);
// 								}}
// 							/>
// 						)}
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default SurveyQuestion;
