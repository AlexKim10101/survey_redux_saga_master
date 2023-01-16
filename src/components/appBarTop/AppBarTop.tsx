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
import { Link } from "react-router-dom";
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
}));

type IAppBarTopProps = {
	currentLocation: IPathname;
};

const AppBarTop: React.FC<IAppBarTopProps> = ({ currentLocation }) => {
	const classes = useStyles();

	const backLinkIndex = PATHNAME_PRIORITY_ARR.indexOf(currentLocation);
	const prevLocation = PATHNAME_PRIORITY_ARR[backLinkIndex - 1];
	const linktext = LINK_BACK_TEXT_DICT[currentLocation];

	return (
		<div className={classes.root}>
			<AppBar className={classes.appbar} position="static">
				<Toolbar className={classes.toolbar}>
					<div className={classes.userInfo}>
						{currentLocation === "/" ? (
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
							<Link to={prevLocation}>{linktext}</Link>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default AppBarTop;
