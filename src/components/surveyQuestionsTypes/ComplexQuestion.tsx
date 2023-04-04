// import React, { useState } from "react";
// import FormLabel from "@material-ui/core/FormLabel";
// import FormControl from "@material-ui/core/FormControl";
// import { withStyles, makeStyles } from "@material-ui/core/styles";
// import {
// 	IComplex,
// 	IId,
// 	IParsedSurveyQuestion,
// 	ISetAnswer,
// } from "../../duck/fakeData/surveyData";
// import {
// 	Select,
// 	MenuItem,
// 	OutlinedInput,
// 	List,
// 	ListItem,
// 	Button,
// 	IconButton,
// } from "@material-ui/core";
// import { getSurveyQuestion } from "../surveyQuestion/SurveyQuestion";
// import CloseIcon from "@material-ui/icons/Close";
// import AddIcon from "@material-ui/icons/Add";

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		"&.MuiFormControl-root": {
// 			width: "100%",
// 		},
// 		"& .MuiOutlinedInput-root": {
// 			visibility: "hidden",
// 		},
// 	},
// 	typography: {
// 		fontSize: "22px",
// 		color: "#000000!important",
// 	},
// 	newPaddig: {
// 		padding: 0,
// 		margin: 0,
// 	},

// 	comment: {
// 		"&.MuiFormControl-root": {
// 			marginTop: "40px",
// 			marginBottom: "80px",
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
// 	listItem: {
// 		width: "100%",
// 		display: "flex",
// 		justifyContent: "space-between",
// 		fontSize: "1rem",
// 	},
// }));

// export type IComplexQuestion = {
// 	question: IComplex;
// 	currentQuestionIndex: number;
// 	setAnswer: ISetAnswer;
// };

// const ComplexQuestion: React.FC<IComplexQuestion> = ({
// 	question,
// 	currentQuestionIndex,
// 	setAnswer,
// }) => {
// 	const classes = useStyles();

// 	const [open, setOpen] = useState(false);

// 	const handleClose = () => {
// 		setOpen(false);
// 	};

// 	const handleOpen = () => {
// 		setOpen(true);
// 	};

// 	const getActualChoicesItems = (question: IComplex) => {
// 		const { choices, userAnswer, children } = question;
// 		return choices
// 			.filter(id => userAnswer.map(item => item.id).includes(id))
// 			.map((id: IId) => children[id]);
// 	};

// 	const actualsChoicesItems = getActualChoicesItems(question);

// 	const selectedItems = question.userAnswer
// 		.map(item => item.id)
// 		.map((id: IId) => question.children[id]);

// 	const removeUserAnswerItem = (id: string) => {
// 		setAnswer({
// 			...question,
// 			userAnswer: question.userAnswer.filter(item => item.id !== id),
// 		});
// 	};

// 	const addUserAnswerItem = (id: string) => {
// 		setAnswer({
// 			...question,
// 			userAnswer: [
// 				...question.userAnswer,
// 				{ id: id, answerText: question.children[id].questionText },
// 			],
// 		});
// 	};

// 	const handleChange = (event: any) => {
// 		addUserAnswerItem(event.target.value);
// 	};

// 	const renderMenuItems = (actualsChoicesItems: IParsedSurveyQuestion[]) => {
// 		return actualsChoicesItems.map((item, index) => (
// 			<MenuItem key={index} value={item.id}>
// 				{item.questionText}
// 			</MenuItem>
// 		));
// 	};

// 	const renderChildrenQuestions = (selectedItems: IParsedSurveyQuestion[]) => {
// 		return selectedItems.map((item, index) => (
// 			<ListItem key={index} className={classes.listItem}>
// 				{/* {getSurveyQuestion({
// 					question: item,
// 					currentQuestionIndex: index,
// 					setAnswer,
// 				})}
// 				<IconButton onClick={() => removeUserAnswerItem(item.id)}>
// 					<CloseIcon />
// 				</IconButton> */}
// 			</ListItem>
// 		));
// 	};

// 	return (
// 		<div>
// 			<FormControl className={classes.root}>
// 				<FormLabel
// 					className={classes.typography}
// 					id={question.id}
// 					component="legend"
// 				>
// 					{currentQuestionIndex + 1}. {question.questionText}
// 				</FormLabel>

// 				<List>{renderChildrenQuestions(selectedItems)}</List>
// 				<Button
// 					variant="outlined"
// 					startIcon={<AddIcon />}
// 					onClick={handleOpen}
// 					disabled={actualsChoicesItems.length === 0}
// 				>
// 					Добавить
// 				</Button>
// 			</FormControl>
// 			<FormControl className={classes.root}>
// 				<Select
// 					value=""
// 					input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
// 					onChange={handleChange}
// 					open={open}
// 					onClose={handleClose}
// 					onOpen={handleOpen}
// 				>
// 					{renderMenuItems(actualsChoicesItems)}
// 				</Select>
// 			</FormControl>
// 		</div>
// 	);
// };

// export default ComplexQuestion;
