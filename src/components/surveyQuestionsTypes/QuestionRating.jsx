import React from "react";
import Rating from "@material-ui/lab/Rating";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import SurveyComment from "../parts/SurveyComment";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  typography: {
    fontSize: "22px",
    color: "#000000",
  },
  rating: {
    marginBottom: "5px",
  },
}));

const QuestionRating = ({ activeQuestionStep, question }) => {
  const classes = useStyles();

  return (
    <div>
      <FormControl>
        <FormLabel className={classes.typography} component="legend">
          {activeQuestionStep + 1}. {question}
        </FormLabel>
        <Rating name="simple-controlled" className={classes.rating} />
        <Typography variant="body2" color="textSecondary">
          Минимум: Плохо
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Максимум: Хорошо
        </Typography>
      </FormControl>
    </div>
  );
};

export default QuestionRating;
