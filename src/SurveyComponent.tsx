import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AppBarTop from "./components/appBarTop/AppBarTop";
import AppBarBottom from "./components/appBarBottom/AppBarBottom";
import PageRender from "./PageRender";
import { PAGENAME_PATHNAME_DICT, TIMEOUT_VALUE } from "./utils/const";
import { IState } from "./duck/fakeData/surveyData";
import "./styles/survey.css";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import usePrevLocation from "./utils/usePrevLocation";
import getSlideDirection from "./utils/getSlideDirection";
import { IPathname } from "./survey.types";

type ISurveyComponentProps = ConnectedProps<typeof connector>;

const SurveyComponent: React.FC<ISurveyComponentProps> = ({
	isEmptyData,
	currentPage,
	fetchData,
	currentSectionIndex,
}) => {
	const { pathname } = useLocation();

	const currentLocation = pathname as IPathname;
	const from = usePrevLocation(currentLocation);

	const direction = getSlideDirection(from, currentLocation);
	// console.log("direction", direction);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isEmptyData) return;
		// console.log("redirect", PAGENAME_PATHNAME_DICT[currentPage]);
		// console.log();
		navigate(PAGENAME_PATHNAME_DICT[currentPage]);
		// navigate("/campaning");
	}, [isEmptyData]);

	useEffect(() => {
		fetchData();
	}, []);

	if (!isEmptyData) return null;

	return (
		<div className="wrapper">
			<AppBarTop currentLocation={currentLocation} />
			<TransitionGroup
				className="slider"
				childFactory={child =>
					React.cloneElement(child, {
						classNames: direction,
					})
				}
			>
				<CSSTransition
					key={pathname + currentSectionIndex}
					classNames="left-to-right"
					timeout={{ enter: TIMEOUT_VALUE, exit: TIMEOUT_VALUE }}
				>
					<div className="slider-item">
						<PageRender />
					</div>
				</CSSTransition>
			</TransitionGroup>
			{currentLocation !== "/" && <AppBarBottom />}
		</div>
	);
};

const mapStateToProps = (state: IState) => {
	const isEmptyData = !!state.backendData;
	const { currentSectionIndex } = state;
	return {
		currentPage: state.currentPage,
		currentSectionIndex,
		// slideMoveDirection: state.slideMoveDirection,
		isEmptyData,
	};
};

const mapDispathToProps = (dispatch: Dispatch) => {
	return {
		fetchData: () => {
			dispatch({ type: "FETCH_SURVEY_DATA" });
		},
	};
};

const connector = connect(mapStateToProps, mapDispathToProps);

export default connector(SurveyComponent);

// <TransitionGroup
// 	className="slider"
// 	childFactory={child =>
// 		React.cloneElement(child, {
// 			classNames: direction,
// 		})
// 	}
// >
// 	<CSSTransition
// 		key={pathname}
// 		classNames="left-to-right"
// 		timeout={{ enter: TIMEOUT_VALUE, exit: TIMEOUT_VALUE }}
// 	>
// 		<div className="slider-item">
// 			<PageRender />
// 		</div>
// 	</CSSTransition>
// </TransitionGroup>;
