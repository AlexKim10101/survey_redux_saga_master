import React from "react";
import QuestionCheckbox from "../surveyQuestionsTypes/QuestionCheckbox";
import QuestionRadio from "../surveyQuestionsTypes/QuestionRadio";
import QuestionRating from "../surveyQuestionsTypes/QuestionRating";
import { makeStyles } from "@material-ui/core/styles";
import "./styles/style.css";
import {
  IPageName,
  IParsedQuestion,
  IParsedSurveyQuestion,
  ISetAnswer,
  ISurveyQuestion,
  IUserAnswer,
} from "../../duck/fakeData/surveyData";
import TextField from "@material-ui/core/TextField";
import QuestionText from "../surveyQuestionsTypes/QuestionText";
import Message from "../surveyQuestionsTypes/Message";
import ComplexQuestion from "../surveyQuestionsTypes/ComplexQuestion";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  surveyQuestionElementStyles: {
    marginTop: "40px",
    marginBottom: "40px",
  },
  comment: {
    "&.MuiFormControl-root": {
      marginTop: "20px",
      marginBottom: "40px",
    },

    "& .MuiInputLabel-root": {
      color: "#46ACAF",
    },
    "& .MuiFilledInput-root": {
      border: "1px solid #46ACAF",
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: "#fcfcfb",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&.Mui-focused": {
        backgroundColor: "transparent",
        boxShadow: "#46ACAF",
        borderColor: "#46ACAF",
      },
    },
  },
}));

export type IGetSurveyQuestionProps = {
  question: IParsedSurveyQuestion;
  currentQuestionIndex: number;
  setAnswer: ISetAnswer;
};

export const getSurveyQuestion: React.FC<IGetSurveyQuestionProps> = ({
  question,
  currentQuestionIndex,
  setAnswer,
}) => {
  switch (question.type) {
    case "complex": {
      return (
        <div className="surveyQuestionElementStyles">
          <ComplexQuestion
            currentQuestionIndex={currentQuestionIndex}
            question={question}
            setAnswer={setAnswer}
          />
        </div>
      );
    }
    case "textQuestion": {
      return (
        <div className="surveyQuestionElementStyles">
          <QuestionText
            currentQuestionIndex={currentQuestionIndex}
            question={question}
            setAnswer={setAnswer}
          />
        </div>
      );
    }
    case "textMessage": {
      return (
        <div className="surveyQuestionElementStyles">
          <Message
            currentQuestionIndex={currentQuestionIndex}
            question={question}
            setAnswer={setAnswer}
          />
        </div>
      );
    }

    case "checkbox":
      return (
        <div className="surveyQuestionElementStyles">
          <QuestionCheckbox
            currentQuestionIndex={currentQuestionIndex}
            question={question}
            setAnswer={setAnswer}
          />
        </div>
      );

    case "radio":
      return (
        <div className="surveyQuestionElementStyles">
          <QuestionRadio
            currentQuestionIndex={currentQuestionIndex}
            question={question}
            setAnswer={setAnswer}
          />
        </div>
      );

    case "rating":
      return (
        <div className="surveyQuestionElementStyles">
          <QuestionRating
            currentQuestionIndex={currentQuestionIndex}
            question={question}
            setAnswer={setAnswer}
          />
        </div>
      );

    default:
      return <div>Вопросов не найдено</div>;
  }
};

export type ISurveyQuestionProps = {
  questions: IParsedSurveyQuestion[];
  currentQuestionIndex: number;
  setAnswer: ISetAnswer;
  setComment: (userComment: string) => void;
};

const SurveyQuestion: React.FC<ISurveyQuestionProps> = ({
  questions,
  currentQuestionIndex,
  setAnswer,
  setComment,
}) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        {questions.map((question, index) => (
          <div key={index}>
            {getSurveyQuestion({
              question,
              currentQuestionIndex: question.index,
              setAnswer,
            })}

            {question.comment && (
              <TextField
                id="outlined-multiline-static"
                className={classes.comment}
                InputProps={{ disableUnderline: true }}
                label="Комментарий"
                color="primary"
                minRows="6"
                fullWidth
                multiline
                variant="filled"
                value={question.commentValue}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyQuestion;
