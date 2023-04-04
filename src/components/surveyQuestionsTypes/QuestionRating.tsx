// import React from "react";
// import Rating from "@material-ui/lab/Rating";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
// import Typography from "@material-ui/core/Typography";

// import { makeStyles } from "@material-ui/core/styles";
// import { IRating, ISetAnswer } from "../../duck/fakeData/surveyData";

// const useStyles = makeStyles((theme) => ({
//   typography: {
//     fontSize: "22px",
//     color: "#000000",
//   },
//   rating: {
//     marginBottom: "5px",
//   },
// }));

// export type IQuestionRating = {
//   currentQuestionIndex: number;
//   question: IRating;
//   setAnswer: ISetAnswer;
// };

// const QuestionRating: React.FC<IQuestionRating> = ({
//   currentQuestionIndex,
//   question,
//   setAnswer,
// }) => {
//   const classes = useStyles();
//   const { questionText, userAnswer } = question;
//   const textFieldValue =
//     userAnswer.length === 0 ? "" : userAnswer[0].answerText;
//   return (
//     <div>
//       <FormControl>
//         <FormLabel className={classes.typography} component="legend">
//           {currentQuestionIndex + 1}. {questionText}
//         </FormLabel>
//         <Rating
//           name="simple-controlled"
//           value={Number(textFieldValue)}
//           onChange={(_, newValue) => {
//             setAnswer({
//               ...question,
//               userAnswer: [{ id: "0", answerText: String(newValue) }],
//             });
//           }}
//           className={classes.rating}
//         />
//         <Typography variant="body2" color="textSecondary">
//           Минимум: Плохо
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           Максимум: Хорошо
//         </Typography>
//       </FormControl>
//     </div>
//   );
// };

// export default QuestionRating;
