import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
	IPageName,
	ISlideMoveDirection,
	IState,
} from "../../duck/fakeData/surveyData";
import FakeMenu from "../fakeMenu/FakeMenu";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { changeCurrentPage, changeSlideMoveDirection } from "../../duck";
import { IPathname } from "../../survey.types";
import { Link, useNavigate } from "react-router-dom";
import { LINK_BACK_TEXT_DICT, PATHNAME_PRIORITY_ARR } from "../../utils/const";

const useStyles = makeStyles(theme => ({
	root: {},
	appbar: {
		background: "#46ACAF",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	toolbar: {
		display: "flex",
		justifyContent: "space-between",
	},
	title: {
		flexGrow: 1,
		color: "#ffffff",
	},
	userInfo: {
		display: "flex",
		alignItems: "center",
	},
	name: {
		marginLeft: "10px",
	},
	button: {
		display: "flex",
		alignItems: "center",
	},
}));

type IAppBarTop = {
	currentLocation: IPathname;
};

type IAppBarTopProps = ConnectedProps<typeof connector>;

const AppBarTop: React.FC<IAppBarTopProps> = ({
	currentLocation,
	openCampaningPage,
}) => {
	const classes = useStyles();

	const backLinkIndex = PATHNAME_PRIORITY_ARR.indexOf(currentLocation);
	const prevLocation = PATHNAME_PRIORITY_ARR[backLinkIndex - 1];
	const linktext = LINK_BACK_TEXT_DICT[currentLocation];

	const navigate = useNavigate();

	return (
		<div className={classes.root}>
			<AppBar className={classes.appbar} position="static">
				<Toolbar className={classes.toolbar}>
					<div className={classes.userInfo}>
						{currentLocation === "/campaning" ? (
							<>
								<Avatar
									alt="Remy Sharp"
									src="https://material-ui.com/static/images/avatar/1.jpg"
								/>
								<Typography variant="caption" className={classes.name}>
									Коновалов Илья Александрович
								</Typography>
							</>
						) : (
							<div className={classes.button}>
								<ArrowBackIosIcon />
								<Typography
									onClick={() => {
										openCampaningPage();
										navigate("/campaning");
									}}
									variant="subtitle1"
									className={classes.title}
								>
									К списку страниц
								</Typography>
							</div>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

const mapStateToProps = (state: IState, props: IAppBarTop) => {
	const { currentLocation } = props;
	const { currentPage, currentSectionIndex, backendData } = state;
	const { pages } = backendData!;

	// const surveyCampanings = state.data ? state.data.surveyCampanings : [];
	// const sections = state.data
	// 	? surveyCampanings[currentSurveyCampaningIndex].sections.filter(
	// 			s => s.isActive
	// 	  )
	// 	: [];
	// const questions = state.data
	// 	? sections[currentSectionIndex].questions.filter(q => q.isActive)
	// 	: [];
	// const hasChecked = Boolean(questions.find(q => q.questionDone));
	// const isLastQuestion =
	// 	currentQuestionIndex + pageQuestionCount >= questions.length;
	// const isLastSection = currentSectionIndex + 1 === sections.length;
	// const validationChecked = !Boolean(questions.find(q => !q.questionDone));
	// const campaningIsDone = state.data
	// 	? isCampaningDone(surveyCampanings[currentSurveyCampaningIndex])
	// 	: false;
	return {
		currentPage,
		currentSectionIndex,
		currentLocation,
	};
};

const mapDispatchToProps = (dispatch: Dispatch, props: IAppBarTop) => {
	return {
		setSlideMoveDirection: (slideMoveDirection: ISlideMoveDirection) => {
			dispatch(changeSlideMoveDirection({ slideMoveDirection }));
		},

		openCampaningPage: () => {
			dispatch(changeCurrentPage({ pageName: "surveyCampaning" }));
		},
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AppBarTop);
