import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  IPageName,
  ISlideMoveDirection,
  IState,
} from "../../duck/fakeData/surveyData";
import Button from "@material-ui/core/Button";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import {
  changeCurrentPage,
  changeSlideMoveDirection,
  setActiveQuestion,
  setActiveSection,
  setActiveSurveyCampaning,
} from "../../duck";
import { isCampaningDone } from "../../utils/findFirstNotDoneCampaning";
import LeftBottomButton from "../appBarButtons/LeftBottomBtn";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
    background: "#46ACAF",
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    "& :last-child": {
      marginLeft: "auto",
    },
  },
  toolbarSecondScreen: {
    display: "flex",
    justifyContent: "flex-end",
  },
  toolbarThirdScreen: {
    display: "flex",
    justifyContent: "flex-end",
  },
  marginLeftButton: {
    marginLeft: "35px",
  },
  marginRightButton: {
    marginRight: "35px",
  },
  title: {
    color: "#ffffff",
  },
  titleQuestionEndPage: {
    color: "#ffffff",
  },
  button: {
    display: "flex",
    alignItems: "center",
  },
  arrow: {
    marginLeft: "5px",
    color: "#ffffff",
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    boxShadow: "none",
    textTransform: "none",
    color: "#ffffff",
  },
}))(Button);

export type IAppBarBottom = {
  sendData: () => void;
};

const AppBarBottom: React.FC<IAppBarBottomProps> = ({
  currentPage,
  currentSectionIndex,
  selectSection,
  currentQuestionIndex,
  setCurrentQuestion,
  openAnswerPage,
  setSlideMoveDirection,
  openMainPage,
  openCampaningPage,
  hasChecked,
  isLastQuestion,
  isLastSection,
  campaningIsDone,
  validationChecked,
  sendData,
  pageQuestionCount,
}) => {
  const classes = useStyles();

  // type ILeftBottomButton = {
  //   setCurrentQuestion: (activeQuestionIndex: number) => void;
  //   currentQuestionIndex: number;
  //   setSlideMoveDirection: (slideMoveDirection: ISlideMoveDirection) => void;
  // };
  // const LeftBottomButton: React.FC<ILeftBottomButton> = ({
  //   currentQuestionIndex,
  //   setCurrentQuestion,
  //   setSlideMoveDirection,
  // }) => {
  //   return (
  //     <div className={classes.button}>
  //       <ArrowBackIosIcon />
  //       <Typography
  //         onClick={() => {
  //           setCurrentQuestion(currentQuestionIndex - 1);
  //           setSlideMoveDirection("left-to-right");
  //         }}
  //         variant="subtitle1"
  //         className={classes.title}
  //       >
  //         Назад
  //       </Typography>
  //     </div>
  //   );
  // };

  type IRightBottomButton = {
    currentPage: IPageName;
    currentSectionIndex: number;
    setCurrentQuestion: (activeQuestionIndex: number) => void;
    currentQuestionIndex: number;
    selectSection: (activeSectionIndex: number) => void;
    openAnswerPage: () => void;
    openMainPage: () => void;
    setSlideMoveDirection: (slideMoveDirection: ISlideMoveDirection) => void;
    hasChecked: boolean;
    isLastQuestion: boolean;
    isLastSection: boolean;
    validationChecked: boolean;
    campaningIsDone: boolean;
    sendData: () => void;
    pageQuestionCount: number;
  };
  const RightBottomButton: React.FC<IRightBottomButton> = ({
    currentPage,
    currentQuestionIndex,
    currentSectionIndex,
    openAnswerPage,
    openMainPage,
    selectSection,
    setCurrentQuestion,
    setSlideMoveDirection,
    hasChecked,
    isLastQuestion,
    isLastSection,
    validationChecked,
    campaningIsDone,
    sendData,
    pageQuestionCount,
  }) => {
    const campaningBtnText = campaningIsDone
      ? "Сохранить и отправить"
      : "Вперед";
    const sectionBtnText = hasChecked ? "Продолжить" : "Начать";
    const questionBtnText = isLastQuestion ? "Завершить" : "Вперед";
    const questionHandleClick = isLastQuestion
      ? () => {
          openAnswerPage();
          setSlideMoveDirection("right-to-left");
        }
      : () => {
          setCurrentQuestion(currentQuestionIndex + pageQuestionCount);
          setSlideMoveDirection("right-to-left");
        };

    const answerBtnText = isLastSection ? "Завершить" : "Следующий раздел";

    const answerHandleClick = isLastSection
      ? () => {
          openCampaningPage();
          // callback to save data
        }
      : () => {
          selectSection(currentSectionIndex + 1);
          // callback to save data
        };

    const buttonsDict = {
      main: {
        handleClick: () => {},
        text: "Что-то пошло не так",
        disable: true,
      },

      surveyCampaning: {
        handleClick: campaningIsDone
          ? () => {
              sendData();
            }
          : () => {
              selectSection(currentSectionIndex);
              setSlideMoveDirection("right-to-left");
            },
        text: campaningBtnText,
        disable: false,
      },

      section: {
        handleClick: () => {
          setCurrentQuestion(currentQuestionIndex);
          setSlideMoveDirection("right-to-left");
        },
        text: sectionBtnText,
        disable: false,
      },
      question: {
        handleClick: questionHandleClick,
        text: questionBtnText,
        disable: false,
      },
      answer: {
        handleClick: answerHandleClick,
        text: answerBtnText,
        disable: !validationChecked,
      },
      error: {
        handleClick: () => {},
        text: () => {},
        disable: true,
      },
    };

    return (
      <ColorButton
        //className={classes.button}
        disabled={buttonsDict[currentPage].disable}
        onClick={buttonsDict[currentPage].handleClick}
      >
        <Typography
          // onClick={buttonsDict[currentPage].handleClick}
          variant="subtitle1"
          className={classes.title}
          //disable={buttonsDict[currentPage].disable}
        >
          {buttonsDict[currentPage].text}
        </Typography>
        <ArrowForwardIosIcon className={classes.arrow} />
      </ColorButton>
    );
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {currentPage === "question" && currentQuestionIndex !== 0 && (
          <LeftBottomButton />
        )}

        {currentPage !== "error" && (
          <RightBottomButton
            currentPage={currentPage!}
            currentQuestionIndex={currentQuestionIndex}
            currentSectionIndex={currentSectionIndex}
            openAnswerPage={openAnswerPage}
            selectSection={selectSection}
            setCurrentQuestion={setCurrentQuestion}
            setSlideMoveDirection={setSlideMoveDirection}
            openMainPage={openMainPage}
            hasChecked={hasChecked}
            isLastQuestion={isLastQuestion}
            isLastSection={isLastSection}
            validationChecked={validationChecked}
            campaningIsDone={campaningIsDone}
            sendData={sendData}
            pageQuestionCount={pageQuestionCount}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

// export default AppBarBottom;

// currentPage: IPageName;
// currentSectionIndex: number;

// sendData: () => void;

export type IAppBarBottomProps = ConnectedProps<typeof connector>;

const mapStateToProps = (state: IState) => {
  const {
    currentPage,
    currentSectionIndex,
    currentQuestionIndex,
    currentSurveyCampaningIndex,
  } = state;
  const surveyCampanings = state.data ? state.data.surveyCampanings : [];

  const sections = state.data
    ? surveyCampanings[currentSurveyCampaningIndex].sections.filter(
        (s) => s.isActive
      )
    : [];
  const questions = state.data
    ? sections[currentSectionIndex].questions.filter((q) => q.isActive)
    : [];
  const hasChecked = Boolean(questions.find((q) => q.questionDone));
  const isLastQuestion = currentQuestionIndex + 1 === questions.length;
  const isLastSection = currentSectionIndex + 1 === sections.length;
  const validationChecked = !Boolean(questions.find((q) => !q.questionDone));
  const campaningIsDone = state.data
    ? isCampaningDone(surveyCampanings[currentSurveyCampaningIndex])
    : false;
  const pageQuestionCount = state.pageQuestionCount;
  return {
    currentPage,
    currentSectionIndex,
    currentQuestionIndex,
    hasChecked,
    isLastQuestion,
    isLastSection,
    campaningIsDone,
    validationChecked,
    pageQuestionCount,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, props: IAppBarBottom) => {
  const sendData = props.sendData;
  return {
    openMainPage: () => {
      dispatch(changeCurrentPage({ pageName: "main" }));
    },
    openCampaningPage: () => {
      dispatch(changeCurrentPage({ pageName: "surveyCampaning" }));
    },
    openAnswerPage: () => {
      dispatch(changeCurrentPage({ pageName: "answer" }));
    },
    setSlideMoveDirection: (slideMoveDirection: ISlideMoveDirection) => {
      dispatch(changeSlideMoveDirection({ slideMoveDirection }));
    },
    setCurrentQuestion: (activeQuestionIndex: number) => {
      dispatch(setActiveQuestion({ activeQuestionIndex }));
    },
    selectSurveyCampaning: (activeSurveyCampaningIndex: number) => {
      dispatch(setActiveSurveyCampaning({ activeSurveyCampaningIndex }));
    },
    selectSection: (activeSectionIndex: number) => {
      dispatch(setActiveSection({ activeSectionIndex }));
    },
    sendData: () => {
      sendData();
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AppBarBottom);
