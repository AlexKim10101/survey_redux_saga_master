import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { IError, IState } from "../duck/fakeData/surveyData"
import { connect, ConnectedProps } from "react-redux"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: "absolute",
			width: "100%",
			marginTop: "6px",
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
)

export type IErrorPage = ConnectedProps<typeof connector>

const ErrorPage: React.FC<IErrorPage> = ({ error }) => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<Typography variant="body1" gutterBottom>
					{error.message}
				</Typography>
			</div>
		</div>
	)
}

const mapStateToProps = (state: IState) => {
	return { error: state.error }
}

const connector = connect(mapStateToProps)

export default connector(ErrorPage)
