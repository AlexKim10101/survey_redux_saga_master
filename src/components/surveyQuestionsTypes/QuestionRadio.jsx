import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import SurveyComment from "../surveyComment/SurveyComment";

import {
  withStyles,
  makeStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  typography: {
    fontSize: "22px",
    color: "#000000!important",
  },
}));

const GreenRadio = withStyles({
  root: {
    color: "#46ACAF",
    "&$checked": {
      color: "##145d5f",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const QuestionRadio = ({
  activeQuestionStep,
  questionID,
  question,
  choices,
}) => {
  const classes = useStyles();

  return (
    <div>
      <FormControl>
        <FormLabel className={classes.typography} component="legend">
          {activeQuestionStep + 1}. {question}
        </FormLabel>
        <RadioGroup>
          {choices.map((choicesItem) => {
            return (
              <div>
                <FormControlLabel
                  value={choicesItem.answer}
                  control={<GreenRadio />}
                  label={choicesItem.answer}
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
