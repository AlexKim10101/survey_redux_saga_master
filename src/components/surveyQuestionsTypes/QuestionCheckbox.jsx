import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
  newPaddig: {
    padding: 0,
    margin: 0,
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: "#46ACAF",
    "&$checked": {
      color: "##145d5f",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const QuestionCheckbox = ({
  activeQuestionStep,
  questionID,
  question,
  choices,
}) => {
  const classes = useStyles();

  return (
    <div>
      <FormControl>
        <FormLabel
          className={classes.typography}
          id={questionID}
          component="legend"
        >
          {activeQuestionStep + 1}. {question}
        </FormLabel>
        <FormGroup>
          {choices.map((choicesItem, index) => {
            return (
              <FormControlLabel
                control={<GreenCheckbox name={choicesItem.answer} />}
                label={choicesItem.answer}
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
