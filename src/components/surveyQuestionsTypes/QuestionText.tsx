import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { ISetAnswer, ITextQuestion } from "../../duck/fakeData/surveyData";
import { TextField } from "@material-ui/core";
import { IBackendQuestion } from "../../survey.types";

const useStyles = makeStyles(theme => ({
	root: {
		"&.MuiFormControl-root": {
			width: "100%",
		},
	},
	typography: {
		fontSize: "22px",
		color: "#000000!important",
	},
	newPaddig: {
		padding: 0,
		margin: 0,
	},

	comment: {
		"&.MuiFormControl-root": {
			marginTop: "20px",
		},

		"& .MuiInputLabel-root": {
			color: "#46ACAF",
		},
		"& .MuiFilledInput-root": {
			border: "1px solid #46ACAF",
			overflow: "hidden",
			borderRadius: 4,
			backgroundColor: "#fcfcfb",
			transition: theme.transitions.create([
				"border-color",
				"background-color",
				"box-shadow",
			]),
			"&:hover": {
				backgroundColor: "transparent",
			},
			"&.Mui-focused": {
				backgroundColor: "transparent",
				boxShadow: "#46ACAF",
				borderColor: "#46ACAF",
			},
		},
	},
}));

export type IQuestionText = {
	currentQuestionIndex: number;
	question: IBackendQuestion;
	setAnswer: ISetAnswer;
};

const QuestionText: React.FC<IQuestionText> = ({
	currentQuestionIndex,
	question,
	setAnswer,
}) => {
	const classes = useStyles();
	// const { id: questionId, questionText, userAnswer } = question;
	const questionId = String(question.docID);
	const questionText = question.title;
	const userAnswer = question.answers;

	const textFieldValue =
		userAnswer.length === 0 ? "" : userAnswer[0].answerText;

	return (
		<div>
			<FormControl className={classes.root}>
				<FormLabel
					className={classes.typography}
					id={questionId}
					component="legend"
				>
					{currentQuestionIndex + 1}. {questionText}
				</FormLabel>

				<TextField
					id="outlined-multiline-static"
					className={classes.comment}
					InputProps={{ disableUnderline: true }}
					label="Ответ"
					color="primary"
					fullWidth
					multiline
					minRows={6}
					variant="filled"
					value={textFieldValue}
					onChange={e => {
						setAnswer(
							{
								...question,
								answers: [{ idocID: "0", answerText: e.target.value }],
							},
							currentQuestionIndex
						);
						// setAnswer({
						// 	...question,
						// 	userAnswer: [{ id: "0", answerText: e.target.value }],
						// });
					}}
				/>
			</FormControl>
		</div>
	);
};

export default QuestionText;
