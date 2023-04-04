// import React, { useEffect } from "react";
// import FormLabel from "@material-ui/core/FormLabel";
// import FormControl from "@material-ui/core/FormControl";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   ISetAnswer,
//   ITextMessage,
//   IUserAnswer,
// } from "../../duck/fakeData/surveyData";

// const useStyles = makeStyles((theme) => ({
//   typography: {
//     fontSize: "22px",
//     color: "#000000!important",
//   },
//   newPaddig: {
//     padding: 0,
//     margin: 0,
//   },
// }));

// export type IMessage = {
//   currentQuestionIndex: number;
//   question: ITextMessage;
//   setAnswer: ISetAnswer;
// };

// const Message: React.FC<IMessage> = ({
//   currentQuestionIndex,
//   question,
//   setAnswer,
// }) => {
//   const classes = useStyles();
//   useEffect(() => {
//     setAnswer(question);
//   }, []);
//   return (
//     <div>
//       <FormControl>
//         <FormLabel
//           className={classes.typography}
//           id={question.id}
//           component="legend"
//         >
//           {currentQuestionIndex + 1}. {question.questionText}
//         </FormLabel>
//       </FormControl>
//     </div>
//   );
// };

// export default Message;
