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
import AppBarTop from "../components/appBarTop/AppBarTop";
import ProgressLinear from "../components/progressLinear/ProgressLinear";
import {
  ISection,
  ISlideMoveDirection,
  IState,
} from "../duck/fakeData/surveyData";
import ProgressCircular from "../components/progressCircular/ProgressCircular";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { changeSlideMoveDirection, setActiveSection } from "../duck";

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
  sections,
  selectSection,
  setSlideMoveDirection,
}) => {
  const classes = useStyles();

  return (
    <div>
      <ProgressLinear sections={sections} />

      <div className={classes.root}>
        {sections.map((section, index) => {
          const allQuestionCount = section.questions.length;
          const doneQuestionCount = section.questions.filter(
            (q) => q.questionDone
          ).length;
          const requiredQuestionsCount = section.questions.filter(
            (q) => q.questionRequired
          ).length;
          return (
            <Accordion
              key={index}
              classes={{
                root: classes.root,
                disabled: classes.disabled,
              }}
              defaultExpanded={true}
              disabled={section.disabled}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={section.id}
                id={section.id}
              >
                <ProgressCircular
                  progress={Math.floor(
                    (doneQuestionCount / allQuestionCount) * 100
                  )}
                />

                <Typography className={classes.heading}>
                  {section.name}
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
                    selectSection(index);
                    setSlideMoveDirection("right-to-left");
                  }}
                  className={classes.margin}
                >
                  {section.progress === 100 ? "Перейти" : "Перейти"}
                </ColorButton>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const currentSurveyCampaningIndex = state.currentSurveyCampaningIndex;
  return {
    sections: state.data!.surveyCampanings[currentSurveyCampaningIndex]
      .sections,
  };
};

const mapDispathToProps = (dispatch: Dispatch) => {
  return {
    selectSection: (activeSectionIndex: number) => {
      dispatch(setActiveSection({ activeSectionIndex }));
    },
    setSlideMoveDirection: (slideMoveDirection: ISlideMoveDirection) => {
      dispatch(changeSlideMoveDirection({ slideMoveDirection }));
    },
  };
};

const connector = connect(mapStateToProps, mapDispathToProps);

export default connector(SurveyCampaningPage);
