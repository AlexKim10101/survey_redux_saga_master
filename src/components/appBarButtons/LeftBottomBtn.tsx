import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ISlideMoveDirection, IState } from "../../duck/fakeData/surveyData";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { changeSlideMoveDirection, setActiveQuestion } from "../../duck";

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

type ILeftBottomButtonProps = ConnectedProps<typeof connector>;

const LeftBottomButton: React.FC<ILeftBottomButtonProps> = ({
  currentQuestionIndex,
  setCurrentQuestion,
  setSlideMoveDirection,
  pageQuestionCount,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.button}>
      <ArrowBackIosIcon />
      <Typography
        onClick={() => {
          setCurrentQuestion(currentQuestionIndex - pageQuestionCount);
          setSlideMoveDirection("left-to-right");
        }}
        variant="subtitle1"
        className={classes.title}
      >
        Назад
      </Typography>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const { currentPage, currentSectionIndex, currentQuestionIndex } = state;

  const pageQuestionCount = state.pageQuestionCount;
  return {
    currentPage,
    currentSectionIndex,
    currentQuestionIndex,
    pageQuestionCount,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSlideMoveDirection: (slideMoveDirection: ISlideMoveDirection) => {
      dispatch(changeSlideMoveDirection({ slideMoveDirection }));
    },
    setCurrentQuestion: (activeQuestionIndex: number) => {
      dispatch(setActiveQuestion({ activeQuestionIndex }));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LeftBottomButton);
