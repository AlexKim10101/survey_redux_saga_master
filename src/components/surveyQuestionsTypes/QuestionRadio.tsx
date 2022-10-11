import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import SurveyComment from "../surveyComment/SurveyComment";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  IRadio,
  ISetAnswer,
  ISimpleChoise,
  IUserAnswer,
} from "../../duck/fakeData/surveyData";

const useStyles = makeStyles((theme) => ({
  typography: {
    fontSize: "22px",
    color: "#000000!important",
  },
}));

export type IQuestionRadio = {
  currentQuestionIndex: number;
  question: IRadio;
  setAnswer: ISetAnswer;
};

const QuestionRadio: React.FC<IQuestionRadio> = ({
  currentQuestionIndex,
  question,
  setAnswer,
}) => {
  const classes = useStyles();
  const { questionText, choices, userAnswer } = question;
  const GreenRadio = withStyles({
    root: {
      color: "#46ACAF",
      "&$checked": {
        color: "##145d5f",
      },
    },
    checked: {},
  })((props: { choice: ISimpleChoise; userAnswer: IUserAnswer }) => {
    const { choice, userAnswer, ...rest } = props;
    const textFieldValue =
      userAnswer.length === 0 ? "" : userAnswer[0].answerText;
    return (
      <Radio
        color="default"
        checked={choice.answerText === textFieldValue}
        onChange={() =>
          setAnswer({
            ...question,
            userAnswer: [{ id: choice.id, answerText: choice.answerText }],
          })
        }
        {...rest}
      />
    );
  });

  return (
    <div>
      <FormControl>
        <FormLabel className={classes.typography} component="legend">
          {currentQuestionIndex + 1}. {questionText}
        </FormLabel>
        <RadioGroup>
          {choices.map((choicesItem, index) => {
            return (
              <div key={index}>
                <FormControlLabel
                  value={choicesItem.answerText}
                  control={
                    <GreenRadio choice={choicesItem} userAnswer={userAnswer} />
                  }
                  label={choicesItem.answerText}
                />
              </div>
            );
          })}
        </RadioGroup>
        {/* <FormHelperText>
          Error text
        </FormHelperText> */}
      </FormControl>
      {/* {comment ? (
          <SurveyComment
          />
        ) : null}  */}
    </div>
  );
};

export default QuestionRadio;
