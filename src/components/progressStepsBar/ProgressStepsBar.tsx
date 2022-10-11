// import React from "react";
// import "./styles/style.css";
// import SurveyQuestion from "../surveyQuestion/SurveyQuestion";
// import Typography from "@material-ui/core/Typography";
//
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   IPageName,
//   ISlideMoveDirection,
//   ISurveyQuestion,
//   IUserAnswer,
// } from "../../duck/fakeData/surveyData";
// import ProgressQuestionList from "../progressLine/ProgressQuestionList";
// import { TIMEOUT_VALUE } from "../../utils/const";
//
// const useStyles = makeStyles((theme) => ({
//   typography: {
//     fontSize: "1.4em",
//   },
// }));
//
// export type IProgressStepsBar = {
//   currentPage: IPageName;
//   questions: ISurveyQuestion[];
//   name: string;
//   currentQuestionIndex: number;
//   setAnswer: (userAnswer: IUserAnswer) => void;
//   slideMoveDirection: ISlideMoveDirection;
// };
// //разбить на 2 компонента
//
// const ProgressStepsBar: React.FC<IProgressStepsBar> = ({
//   questions,
//   name,
//   currentQuestionIndex,
//   setAnswer,
//   currentPage,
//   slideMoveDirection,
// }) => {
//   return (
//     <div className="all">
//       {currentPage === "question" && (
//         <>
//           <div className="title">
//             <Typography variant="body1" gutterBottom>
//               {name}
//             </Typography>
//           </div>
//
//           <ProgressQuestionList
//             questions={questions}
//             currentQuestionIndex={currentQuestionIndex}
//           />
//         </>
//       )}
//       <TransitionGroup
//         childFactory={(child) =>
//           React.cloneElement(child, {
//             classNames: slideMoveDirection,
//           })
//         }
//       >
//         <CSSTransition
//           key={currentPage + currentQuestionIndex}
//           classNames="left-to-right"
//           timeout={{ enter: TIMEOUT_VALUE, exit: TIMEOUT_VALUE }}
//         >
//           <SurveyQuestion
//             question={questions[currentQuestionIndex]}
//             currentQuestionIndex={currentQuestionIndex}
//             setAnswer={setAnswer}
//           />
//         </CSSTransition>
//       </TransitionGroup>
//     </div>
//   );
// };
//
// export default ProgressStepsBar;
