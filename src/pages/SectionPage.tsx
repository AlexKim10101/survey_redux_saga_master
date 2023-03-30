import React from "react";
import { Dispatch } from "redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
	IParsedSurveyQuestion,
	ISection,
	ISlideMoveDirection,
	IState,
	ISurveyQuestion,
} from "../duck/fakeData/surveyData";
import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { changeSlideMoveDirection, setActiveQuestion } from "../duck";
import { connect, ConnectedProps } from "react-redux";
import { selectCurrentSection } from "../duck/selectors";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			backgroundColor: theme.palette.background.paper,
		},
		index: {
			marginRight: "20px",
		},
		title: {
			fontSize: "1.4em",
			margin: "0",
			padding: "20px 20px 0px 20px",
		},
		requiredQuestion: {
			color: "red",
		},
		doneIcon: {
			display: "flex",
			marginRight: "15px",
		},
		doneIconColorGrey: {
			color: "#F5F5F5",
		},
		answer: {
			display: "flex",
			marginTop: "10px",
		},
	})
);

export type ISectionPage = ConnectedProps<typeof connector> & {
	showAnswer: boolean;
};

const SectionPage: React.FC<ISectionPage> = ({
	section,
	setCurrentQuestion,
	showAnswer,
}) => {
	const classes = useStyles();
	const questions = section.questions;
	const navigate = useNavigate();

	const primaryText = (
		questionText: string,
		index: number,
		questionRequired: boolean
	) => {
		return (
			<div>
				{" "}
				{index + 1}. {questionText}{" "}
				{questionRequired ? (
					<span className={classes.requiredQuestion}>*</span>
				) : null}
			</div>
		);
	};

	const secondaryText = (question: ISurveyQuestion) => {
		return (
			<span className={classes.answer}>
				<Typography component="span" variant="body2" color="textPrimary">
					{"Ответ:"}
				</Typography>
				<span
					style={{
						color: "#52C41A",
						marginLeft: "10px",
					}}
				>
					{question.type === "checkbox" ? (
						question.userAnswer.map((q, i) => (
							<span key={i}>{q.answerText} </span>
						))
					) : (
						<span>{question.userAnswer[0].answerText} </span>
					)}
				</span>
			</span>
		);
	};

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<Typography variant="body1" gutterBottom>
					{section.name}
				</Typography>
			</div>
			{questions.length === 0 ? (
				<div>Пусто</div>
			) : (
				<List component="nav" aria-label="secondary mailbox folders">
					{questions.map((item, index) => {
						return (
							<div key={index}>
								<ListItem
									onClick={() => {
										setCurrentQuestion(index);
										navigate("/question");
									}}
									button
								>
									{item.questionDone ? (
										<DoneIcon
											style={{ color: "#52C41A" }}
											className={classes.index}
										/>
									) : (
										<div className={classes.doneIcon}>
											<DoneIcon style={{ color: "#F5F5F5" }} />
										</div>
									)}

									<ListItemText
										primary={primaryText(
											item.questionText,
											index,
											item.questionRequired
										)}
										secondary={
											showAnswer && item.questionDone
												? secondaryText(item)
												: null
										}
									/>
									<ArrowForwardIosIcon
										style={{
											fontSize: 15,
											marginLeft: 10,
											color: "#757575",
										}}
									/>
								</ListItem>
								<Divider />
							</div>
						);
					})}
				</List>
			)}
		</div>
	);
};

const mapStateToProps = (state: IState, props: { showAnswer: boolean }) => {
	const section = selectCurrentSection(state);
	const showAnswer = state.currentPage === "answer";
	return {
		section,
		showAnswer,
	};
};

const mapDispathToProps = (dispatch: Dispatch) => {
	return {
		setCurrentQuestion: (activeQuestionIndex: number) => {
			dispatch(setActiveQuestion({ activeQuestionIndex }));
		},
	};
};

const connector = connect(mapStateToProps, mapDispathToProps);

export default connector(SectionPage);
