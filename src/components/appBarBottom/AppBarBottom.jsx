import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
} from "@material-ui/core/styles";

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
    justifyContent: "space-between",
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
  },
}));

const AppBarBottom = ({
  handleNextStep,
  handlePrevStep,
  activeQuestionStep,
  openSecondPage,
  setActiveQuetionStep,
  onClickListSecondPage,
  questionsList,
  openAswersPage,
  setOpenAnswersPage,
  onClickEndQuestion,
  onClickFirstPage,
  onClickAccordionItemButton,
  setQuestionListIndex,

}) => {
  const classes = useStyles();

  const onClickMobileButton = () => {
    if (activeQuestionStep === null) {
      setActiveQuetionStep(0);
      onClickListSecondPage(true);
    } else {
      onClickListSecondPage(true);
    }
  };

  const onClickMobileButtonEndSurvey = () => {
    onClickEndQuestion(false);
    onClickListSecondPage(false);
    onClickFirstPage(false);
  }

  const onClickMobileButtonNextSurvey = () => {
    onClickEndQuestion(false);
    onClickListSecondPage(false);
    setQuestionListIndex(1)
    onClickFirstPage(true);
  }

  const bottomButtonsLogicSecondScreen = (activeQuestionStep) => {
    if (activeQuestionStep === null) {
      return (
        <Toolbar className={classes.toolbarSecondScreen}>
          <div className={classes.button}>
            <Typography
              onClick={onClickMobileButton}
              variant="subtitle1"
              className={classes.title}
            >
              Начать
            </Typography>
            <ArrowForwardIosIcon className={classes.arrow} />
          </div>
        </Toolbar>
      );
    } else {
      return (
        <Toolbar className={classes.toolbarSecondScreen}>
          <div className={classes.button}>
            <Typography
              onClick={onClickMobileButton}
              variant="subtitle1"
              className={classes.title}
            >
              Продолжить
            </Typography>
            <ArrowForwardIosIcon className={classes.arrow} />
          </div>
        </Toolbar>
      );
    }
  };

  const bottomButtonsLogicThirdScreen = (activeQuestionStep, questionsList) => {
    console.log("questionsList.length", questionsList.length);
    if (activeQuestionStep === 0) {
      return (
        <Toolbar className={classes.toolbarThirdScreen}>
          <div className={classes.button}>
            <Typography
              onClick={handleNextStep}
              variant="subtitle1"
              className={classes.title}
            >
              Вперед
            </Typography>
            <ArrowForwardIosIcon className={classes.arrow} />
          </div>
        </Toolbar>
      );
    } else if (activeQuestionStep !== 0) {
      if (activeQuestionStep < questionsList.length - 1) {
        return (
          <Toolbar className={classes.toolbar}>
            <div className={classes.button}>
              <ArrowBackIosIcon />
              <Typography
                onClick={handlePrevStep}
                variant="subtitle1"
                className={classes.title}
              >
                Назад
              </Typography>
            </div>
            <div className={classes.button}>
              <Typography
                onClick={handleNextStep}
                variant="subtitle1"
                className={classes.title}
              >
                Вперед
              </Typography>
              <ArrowForwardIosIcon className={classes.arrow} />
            </div>
          </Toolbar>
        );
      } else {
        return (
          <div>
            {openAswersPage ? (
              <Toolbar className={classes.toolbar}>
                <div className={classes.button}>
                  <ArrowBackIosIcon />
                  <Typography
                    onClick={onClickMobileButtonEndSurvey}
                    variant="subtitle1"
                    className={classes.titleQuestionEndPage}
                  >
                    К разделам
                  </Typography>
                </div>

                <div className={classes.button}>
                  <Typography
                    onClick={onClickMobileButtonNextSurvey}
                    variant="subtitle1"
                    className={classes.titleQuestionEndPage}
                  >
                    Следующий раздел
                  </Typography>
                  <ArrowForwardIosIcon className={classes.arrow} />
                </div>
              </Toolbar>
            ) : (
              <Toolbar className={classes.toolbar}>
                <div className={classes.button}>
                  <ArrowBackIosIcon />
                  <Typography
                    onClick={handlePrevStep}
                    variant="subtitle1"
                    className={classes.title}
                  >
                    Назад
                  </Typography>
                </div>

                <div className={classes.button}>
                  <Typography
                    onClick={() => {
                      onClickEndQuestion(true);
                    }}
                    variant="subtitle1"
                    className={classes.title}
                  >
                    Завершить
                  </Typography>
                  <ArrowForwardIosIcon className={classes.arrow} />
                </div>
              </Toolbar>
            )}
          </div>
        );
      }
    }
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        {openSecondPage
          ? bottomButtonsLogicThirdScreen(activeQuestionStep, questionsList)
          : bottomButtonsLogicSecondScreen(activeQuestionStep)}
      </AppBar>
    </React.Fragment>
  );
};

export default AppBarBottom;
