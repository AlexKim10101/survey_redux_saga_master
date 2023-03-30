import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
	makeStyles,
	Theme,
	withStyles,
	createStyles,
} from "@material-ui/core/styles";
import { ISlideMoveDirection, IState } from "../duck/fakeData/surveyData";
import { isCampaningDone } from "../utils/findFirstNotDoneCampaning";
import { changeSlideMoveDirection, setActiveSurveyCampaning } from "../duck";
import { selectData } from "../duck/selectors";
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
const ColorButton = withStyles(() => ({
	root: {
		color: "#ffffff",
		backgroundColor: "#46acaf",
		margin: 0,
	},
}))(Button);

export type IMainPage = ConnectedProps<typeof connector>;

const MainPage: React.FC<IMainPage> = ({
	surveyCampanings,
	selectSurveyCampaning,
}) => {
	const classes = useStyles();
	console.log("MainPage");

	const navigate = useNavigate();

	return null;

	// return (
	// 	<div className={classes.root}>
	// 		<div className={classes.title}>
	// 			<Typography variant="body1" gutterBottom>
	// 				Список опросов
	// 			</Typography>
	// 		</div>
	// 		<List component="nav" aria-label="secondary mailbox folders">
	// 			{surveyCampanings.map((campaning, index) => {
	// 				// const campaningIsDone = isCampaningDone(campaning);
	// 				return (
	// 					<div key={index}>
	// 						<ListItem
	// 							onClick={() => {
	// 								selectSurveyCampaning(index);
	// 								navigate("campaning", {
	// 									state: { campaningId: campaning.id },
	// 								});
	// 							}}
	// 							button
	// 						>
	// 							{/* {campaningIsDone ? (
	// 								<DoneIcon
	// 									style={{ color: "#52C41A" }}
	// 									className={classes.index}
	// 								/>
	// 							) : (
	// 								<div className={classes.doneIcon}>
	// 									<DoneIcon style={{ color: "#F5F5F5" }} />
	// 								</div>
	// 							)} */}

	// 							<ListItemText primary={campaning.name} secondary="" />
	// 							<ArrowForwardIosIcon
	// 								style={{
	// 									fontSize: 15,
	// 									marginLeft: 10,
	// 									color: "#757575",
	// 								}}
	// 							/>
	// 						</ListItem>
	// 						<Divider />
	// 					</div>
	// 				);
	// 			})}
	// 		</List>
	// 	</div>
	// );
};

const mapStateToProps = (state: IState) => {
	// const data = selectData(state);
	// return { surveyCampanings: data.surveyCampanings };
	return { surveyCampanings: [] };
};

const mapDispathToProps = (dispatch: Dispatch) => {
	return {
		selectSurveyCampaning: (activeSurveyCampaningIndex: number) => {
			dispatch(setActiveSurveyCampaning({ activeSurveyCampaningIndex }));
		},
	};
};

const connector = connect(mapStateToProps, mapDispathToProps);

export default connector(MainPage);
