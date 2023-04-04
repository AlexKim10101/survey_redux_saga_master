import React from "react";
import Button from "@material-ui/core/Button";
import {
	makeStyles,
	Theme,
	withStyles,
	createStyles,
} from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ProgressLinear from "../components/progressLinear/ProgressLinear";
import { IState } from "../duck/fakeData/surveyData";
import ProgressCircular from "../components/progressCircular/ProgressCircular";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { setActiveSection } from "../duck";
import { selectCurrentCampaning } from "../duck/selectors";
import { useNavigate } from "react-router-dom";
import { isQuestionDone } from "../utils/questionValidation";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			"&$disabled": {
				backgroundColor: "rgba(214, 213, 213, 0.12)",
			},
		},
		disabled: {},
		heading: {
			marginLeft: "10px",
			fontSize: theme.typography.pxToRem(15),
			//fontWeight: theme.typography.fontWeightRegular ,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		details: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
		},
		accordion: {
			background: "#fafafa",
		},
		margin: {
			margin: theme.spacing(1),
		},
		typography: {
			display: "flex",
			msFlexDirection: "row",
			marginTop: "5px",
		},
		questionTypography: {
			fontSize: "1.4em",
			marginLeft: "3px",
		},
	})
);

const ColorButton = withStyles(() => ({
	root: {
		color: "#ffffff",
		backgroundColor: "#46acaf",
		margin: 0,
	},
}))(Button);

export type ISurveyCampaningPage = ConnectedProps<typeof connector>;

const SurveyCampaningPage: React.FC<ISurveyCampaningPage> = ({
	pages,
	selectSection,
}) => {
	const classes = useStyles();
	const navigate = useNavigate();

	// console.log("SurveyCampaningPage");

	return (
		<div>
			<ProgressLinear pages={pages} />
			<div className={classes.root}>
				{pages.map((page, index) => {
					const allQuestionCount = page.questions.length;
					const doneQuestionCount = page.questions.filter(q =>
						isQuestionDone(q)
					).length;
					const requiredQuestionsCount = page.questions.filter(
						q => q.config.isRequired
					).length;
					return (
						<Accordion
							key={index}
							classes={{
								root: classes.root,
								disabled: classes.disabled,
							}}
							defaultExpanded={true}
							disabled={false}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls={String(page.docID)}
								id={String(page.docID)}
							>
								<ProgressCircular
									progress={Math.floor(
										(doneQuestionCount / allQuestionCount) * 100
									)}
								/>

								<Typography className={classes.heading}>
									страница {index + 1}
								</Typography>
							</AccordionSummary>
							<AccordionDetails className={classes.details}>
								<div>
									<div className="questionSize">
										<div className="question">Всего вопросов: </div>
										<div className="questionNumber">{allQuestionCount}</div>
									</div>
									<div className="questionSize">
										<div className="question">Обязательных вопросов: </div>
										<div className="questionNumber">
											{requiredQuestionsCount}
										</div>
									</div>
								</div>

								<ColorButton
									variant="contained"
									size="small"
									color="primary"
									onClick={() => {
										selectSection(index); // select page
										navigate("/page");
									}}
									className={classes.margin}
								>
									Перейти
								</ColorButton>
							</AccordionDetails>
						</Accordion>
					);
				})}
			</div>
		</div>
	);
};

{
	/* <ProgressCircular
	progress={Math.floor((doneQuestionCount / allQuestionCount) * 100)}
/>; */
}

// <ProgressLinear sections={sections} />;

// {
// 	section.progress === 100 ? "Перейти" : "Перейти";
// }
const mapStateToProps = (state: IState) => {
	console.log(state);
	// const currentCampaning = selectCurrentCampaning(state);
	return {
		// sections: currentCampaning.sections,
		pages: state.backendData ? state.backendData.pages : [],
	};
};

const mapDispathToProps = (dispatch: Dispatch) => {
	return {
		selectSection: (activeSectionIndex: number) => {
			dispatch(setActiveSection({ activeSectionIndex }));
		},
	};
};

const connector = connect(mapStateToProps, mapDispathToProps);

export default connector(SurveyCampaningPage);
