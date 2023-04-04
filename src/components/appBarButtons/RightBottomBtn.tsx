import React from "react";
import {
	IPageName,
	ISlideMoveDirection,
	IState,
} from "../../duck/fakeData/surveyData";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import {
	changeCurrentPage,
	changeSlideMoveDirection,
	setActiveQuestion,
	setActiveSection,
} from "../../duck";
import ForwardButton from "../common/ForwardButton";
import { isCampaningDone } from "../../utils/findFirstNotDoneCampaning";
import { useNavigate } from "react-router-dom";

type IRightBottomButton = {
	sendData: () => void;
};
type IRightBottomButtonProps = ConnectedProps<typeof connector>;

const RightBottomButton: React.FC<IRightBottomButtonProps> = ({
	currentPage,
	currentSectionIndex,
	// currentQuestionIndex,
	// pageQuestionCount,
	// campaningIsDone,
	// hasChecked,
	// isLastQuestion,
	// isLastSection,
	// validationChecked,
	setCurrentQuestion,
	setSlideMoveDirection,
	openAnswerPage,
	openCampaningPage,
	selectSection,
	sendData,
}) => {
	// console.log("!!!currentPage", currentPage);
	// const pageName = currentPage as IPageName;
	// const campaningBtnText = campaningIsDone ? "Сохранить и отправить" : "Вперед";
	// const sectionBtnText = hasChecked ? "Продолжить" : "Начать";
	// const questionBtnText = isLastQuestion ? "Завершить" : "Вперед";
	// const questionHandleClick = isLastQuestion
	// 	? () => {
	// 			openAnswerPage();
	// 			setSlideMoveDirection("right-to-left");
	// 	  }
	// 	: () => {
	// 			setCurrentQuestion(currentQuestionIndex + pageQuestionCount);
	// 			setSlideMoveDirection("right-to-left");
	// 	  };

	// const answerBtnText = isLastSection ? "Завершить" : "Следующий раздел";

	// const answerHandleClick = isLastSection
	// 	? () => {
	// 			openCampaningPage();
	// 			// callback to save data
	// 	  }
	// 	: () => {
	// 			selectSection(currentSectionIndex + 1);
	// 			// callback to save data
	// 	  };

	// const buttonsDict = {
	// 	main: {
	// 		handleClick: () => {},
	// 		text: "Что-то пошло не так",
	// 		disable: true,
	// 	},

	// 	surveyCampaning: {
	// 		handleClick: campaningIsDone
	// 			? () => {
	// 					sendData();
	// 			  }
	// 			: () => {
	// 					selectSection(currentSectionIndex);
	// 					setSlideMoveDirection("right-to-left");
	// 			  },
	// 		text: campaningBtnText,
	// 		disable: false,
	// 	},

	// 	section: {
	// 		handleClick: () => {
	// 			setCurrentQuestion(currentQuestionIndex);
	// 			setSlideMoveDirection("right-to-left");
	// 		},
	// 		text: sectionBtnText,
	// 		disable: false,
	// 	},
	// 	question: {
	// 		handleClick: questionHandleClick,
	// 		text: questionBtnText,
	// 		disable: false,
	// 	},
	// 	answer: {
	// 		handleClick: answerHandleClick,
	// 		text: answerBtnText,
	// 		disable: !validationChecked,
	// 	},
	// 	error: {
	// 		handleClick: () => {},
	// 		text: "",
	// 		disable: true,
	// 	},
	// };

	const navigate = useNavigate();
	const pageName = currentPage as "surveyCampaning" | "section";

	const buttonsDict = {
		surveyCampaning: {
			handleClick: () => {
				selectSection(currentSectionIndex);
				setSlideMoveDirection("right-to-left");
				navigate("/page");
			},
			text: "Начать",
			disable: false,
		},
		section: {
			handleClick: () => {
				selectSection(currentSectionIndex + 1);
				setSlideMoveDirection("right-to-left");
			},
			text: "Далее",
			disable: false,
		},
	};

	return (
		<ForwardButton
			disable={buttonsDict[pageName].disable}
			handleClick={buttonsDict[pageName].handleClick}
			text={buttonsDict[pageName].text}
		/>
	);
};

const mapStateToProps = (state: IState) => {
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
	};
};

const mapDispatchToProps = (dispatch: Dispatch, props: IRightBottomButton) => {
	const { sendData } = props;
	return {
		setSlideMoveDirection: (slideMoveDirection: ISlideMoveDirection) => {
			dispatch(changeSlideMoveDirection({ slideMoveDirection }));
		},
		setCurrentQuestion: (activeQuestionIndex: number) => {
			dispatch(setActiveQuestion({ activeQuestionIndex }));
		},
		openAnswerPage: () => {
			dispatch(changeCurrentPage({ pageName: "answer" }));
		},
		selectSection: (activeSectionIndex: number) => {
			dispatch(setActiveSection({ activeSectionIndex }));
		},
		sendData: () => {
			sendData();
		},
		openCampaningPage: () => {
			dispatch(changeCurrentPage({ pageName: "surveyCampaning" }));
		},
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(RightBottomButton);
