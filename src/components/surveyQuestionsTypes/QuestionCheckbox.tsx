import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import SurveyComment from "../surveyComment/SurveyComment";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  ICheckbox,
  ISetAnswer,
  ISimpleChoise,
  IUserAnswer,
} from "../../duck/fakeData/surveyData";

const useStyles = makeStyles((theme) => ({
  typography: {
    fontSize: "22px",
    color: "#000000!important",
  },
  newPaddig: {
    padding: 0,
    margin: 0,
  },
}));

export type IQuestionCheckbox = {
  currentQuestionIndex: number;
  question: ICheckbox;
  setAnswer: ISetAnswer;
};

const QuestionCheckbox: React.FC<IQuestionCheckbox> = ({
  currentQuestionIndex,
  question,
  setAnswer,
}) => {
  const classes = useStyles();

  const { id: questionId, questionText, choices, userAnswer } = question;
  const GreenCheckbox = withStyles({
    root: {
      color: "#46ACAF",
      "&$checked": {
        color: "##145d5f",
      },
    },
    checked: {},
  })(
    (props: {
      choice: IUserAnswer[0];
      userAnswer: IUserAnswer;
      handleChange: (
        value: IUserAnswer[0],
        userAnswer: IUserAnswer
      ) => IUserAnswer;
    }) => {
      const { choice, userAnswer, handleChange, ...rest } = props;
      const isChecked = userAnswer.map((item) => item.id).includes(choice.id);
      return (
        <Checkbox
          color="default"
          onChange={() =>
            setAnswer({
              ...question,
              userAnswer: handleChange(choice, userAnswer),
            })
          }
          checked={isChecked}
          {...rest}
        />
      );
    }
  );

  const handleChange = (
    value: IUserAnswer[0],
    userAnswer: IUserAnswer
  ): IUserAnswer => {
    if (userAnswer.map((item) => item.id).includes(value.id)) {
      return userAnswer.filter((item) => item.id !== value.id);
    }
    return [...userAnswer, value];
  };

  return (
    <div>
      <FormControl>
        <FormLabel
          className={classes.typography}
          id={questionId}
          component="legend"
        >
          {currentQuestionIndex + 1}. {questionText}
        </FormLabel>
        <FormGroup>
          {choices.map((choicesItem, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <GreenCheckbox
                    choice={choicesItem}
                    userAnswer={userAnswer}
                    handleChange={handleChange}
                  />
                }
                label={choicesItem.answerText}
              />
            );
          })}
        </FormGroup>
        {/* <FormHelperText>
          Error text
        </FormHelperText> */}
      </FormControl>
      {/* {comment ? (
        <SurveyComment/>
      ) : null} */}
    </div>
  );
};

export default QuestionCheckbox;
