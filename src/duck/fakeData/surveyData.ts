import { nanoid } from "nanoid";

export type IUser = {
  name: string;
  position: string;
  department: string;
  avatar: string;
};

export type IId = string;

export type IParams = {
  [key: string]: string;
};

export type IQuestionType =
  | "text"
  | "checkbox"
  | "radio"
  | "rating"
  | "select"
  | "multiselect"
  | "complex";

export type ISurveyQuestion =
  | IQuestion<"textMessage", null>
  | IQuestion<"textQuestion", null>
  | IQuestion<"checkbox", ISimpleChoise[]>
  | IQuestion<"radio", ISimpleChoise[]>
  | IQuestion<"rating", string[]>
  | IQuestion<"complex", IId[]>;

type IQuestionAction = "toggleQuestion" | "toggleSection";

export type IRule = {
  action: IQuestionAction;
  targetId: IId;
  reasonValue: string;
};

export interface IQuestion<T, C> {
  type: T;
  choices: C;
  userAnswer: IUserAnswer;
  id: string;
  questionText: string;
  questionDone: boolean;
  questionRequired: boolean;
  isActive: boolean;
  comment: boolean;
  commentRequired: boolean;
  commentValue: string;
  validationError: boolean; //??
  validationCommentError: boolean; //??
  rules: IRule[];
}

export interface IParsedQuestion<T, C, CHN> extends IQuestion<T, C> {
  children: CHN;
  index: number;
}

// export type IComplexQuestionChoise =
//   | IParsedQuestion<"textMessage", null, null, null>
//   | IParsedQuestion<"checkbox", ISimpleChoise[], string[], null>
//   | IParsedQuestion<"rating", string[], number, null>;

export type ITextQuestion = IParsedQuestion<
  "textQuestion",
  null,
  { [key: IId]: IParsedSurveyQuestion }
>;
export type ITextMessage = IParsedQuestion<
  "textMessage",
  null,
  { [key: IId]: IParsedSurveyQuestion }
>;
export type ICheckbox = IParsedQuestion<
  "checkbox",
  ISimpleChoise[],
  { [key: IId]: IParsedSurveyQuestion }
>;
export type IRadio = IParsedQuestion<
  "radio",
  ISimpleChoise[],
  { [key: IId]: IParsedSurveyQuestion }
>;
export type IRating = IParsedQuestion<
  "rating",
  string[],
  { [key: IId]: IParsedSurveyQuestion }
>;
export type IComplex = IParsedQuestion<
  "complex",
  IId[],
  { [key: IId]: IParsedSurveyQuestion }
>;

export type IParsedSurveyQuestion =
  | ITextQuestion
  | ITextMessage
  | ICheckbox
  | IRadio
  | IRating
  | IComplex;

export type ISetAnswer = (q: IParsedSurveyQuestion) => void;

export type ISimpleChoise = {
  id: string;
  answerText: string;
  checked: boolean;
};

export type IUserAnswer = Omit<ISimpleChoise, "checked">[];

export type ISection = {
  id: string;
  name: string;
  progress: number;
  allSectionsProgress: number;
  isActive: boolean;
  expanded: boolean;
  disabled: boolean;
  questions: ISurveyQuestion[];
};

export type IParsedSection = Omit<ISection, "questions"> & {
  questions: IParsedSurveyQuestion[];
};

export type ISurveyCampaning = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  // ?????? ?????????????????????? ?????????????? ????????????????: ???????????????? ?????? ???????????????????? questionListTypeLinear: boolean;
  surveyType: "linear" | "nonlinear";
  // ?????????????????????? ???????????? ???????????? ???? ???????????????????? ?????????? ???????????????? questionListViewPreviousPage: boolean;
  reviewStrict: boolean;
  // ?????????????????????? ?????????????????????????? ?????????????????? ???????????? ???? ???????????????????? ?????????? ???????????????? questionListEditPreviousPage: boolean;
  editingStrict: boolean;
  campaningIsDone: boolean;
  sections: ISection[];
};

export type IParsedSurveyCampaning = Omit<ISurveyCampaning, "sections"> & {
  sections: IParsedSection[];
};

export type IData = {
  users: IUser[];
  surveyCampanings: ISurveyCampaning[];
};

export type IParsedData = Omit<IData, "surveyCampanings"> & {
  surveyCampanings: IParsedSurveyCampaning[];
};

export type ISlideMoveDirection = "left-to-right" | "right-to-left";
export type IPageName =
  | "main"
  | "surveyCampaning"
  | "section"
  | "question"
  | "answer"
  | "error";

export type IError = {
  status: boolean;
  message: string;
};

export type IState = {
  loading: boolean;
  error: IError;
  data: IParsedData | null;
  currentUserIndex: number;
  currentSurveyCampaningIndex: number;
  currentSectionIndex: number;
  currentQuestionIndex: number;
  currentPage: IPageName | null;
  slideMoveDirection: ISlideMoveDirection;
  params: IParams;
  // relocate to section
  pageQuestionCount: number;
};

export type IQuestionProps = {
  currentQuestionIndex: number;
  questionId: string;
  questionText: string;
  setAnswer: (userAnswer: IUserAnswer) => void;
};

// export const data: IData = {
//   users: [
//     {
//       name: "?????????????????? ???????? ??????????????????????????",
//       position: "???????????????? ?????????????????? ???? ????????????????",
//       department: "?????????????????????? ?????????????? ????????????",
//       avatar: "https://material-ui.com/static/images/avatar/1.jpg",
//     },
//   ],
//
//   surveyCampanings: [
//     {
//       id: nanoid(),
//       name: "??????????????????????????",
//       startDate: "2022-03-01TT00:00:00",
//       endDate: "2022-03-31TT00:00:00",
//       surveyType: "linear",
//       reviewStrict: true,
//       editingStrict: true,
//       campaningIsDone: false,
//       sections: [
//         {
//           id: nanoid(),
//           name: "???????????? ???????????? ????????????????",
//           disabled: false,
//           progress: 100,
//           allSectionsProgress: 70,
//           expanded: true,
//           isActive: true,
//           // timestamp
//           questions: [
//             {
//               id: "first",
//               type: "textMessage",
//               questionText: "???????????? ?????????????????? ??????????????????",
//               questionDone: false,
//               questionRequired: false,
//               comment: false,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: null,
//               userAnswer: null,
//               rules: [],
//               isActive: true,
//             },
//
//             {
//               id: "second",
//               type: "textQuestion",
//               questionText: "???????????? ?? ?????????????????? ??????????????",
//               questionDone: false,
//               questionRequired: false,
//               comment: false,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: null,
//               userAnswer: "",
//               rules: [],
//               isActive: true,
//             },
//
//             {
//               id: "third",
//               type: "radio",
//               questionText:
//                 "???????????? ???????? ?????????????????? ??????????. ?????????? <????????????????????????> ?????????????? ???????????? ???2 ",
//               questionDone: true,
//               questionRequired: false,
//               comment: false,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: [
//                 {
//                   id: nanoid(),
//                   answerText: "????????????????????????",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "????????????????????",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "????????????????????????",
//                   checked: false,
//                 },
//               ],
//               userAnswer: "????????????????????",
//               rules: [
//                 {
//                   action: "toggleQuestion",
//                   reasonValue: "????????????????????????",
//                   targetId: "secondSectionId",
//                 },
//               ],
//               isActive: true,
//             },
//
//             {
//               id: "five",
//               type: "complex",
//               questionText: "?????????? ???? ???????????????????? ????????????????/??????????????????",
//               questionDone: true,
//               questionRequired: true,
//               comment: false,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: ["six", "first"],
//               userAnswer: [],
//               rules: [],
//               isActive: true,
//             },
//             {
//               id: "six",
//               type: "rating",
//               questionText:
//                 "?????????????? ?????? 1 ?????? ??????????, ?? 5 ?????? ????????????, ???????????????????? ???????????? ???????????????? ?????? ???????????? ????????????. ???????????????? 4 ?? ???????? ?????????????? ???????????? ???4",
//               questionDone: false,
//               questionRequired: false,
//               comment: true,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: ["item1", "item2", "item3"],
//               userAnswer: 0,
//               rules: [
//                 {
//                   action: "toggleQuestion",
//                   reasonValue: "4",
//                   targetId: "seven",
//                 },
//               ],
//               isActive: true,
//             },
//             {
//               id: "seven",
//               type: "rating",
//               questionText: "?????????? ????????????. ??????????????",
//               questionDone: false,
//               questionRequired: false,
//               comment: true,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: ["item1", "item2", "item3", "item4", "item5"],
//               userAnswer: 0,
//               rules: [],
//               isActive: false,
//             },
//           ],
//         },
//         {
//           id: "secondSectionId",
//           name: "???????????? ???????????? ????????????????",
//           expanded: true,
//           disabled: false,
//           isActive: false,
//
//           progress: 45,
//           allSectionsProgress: 70,
//           questions: [
//             {
//               id: nanoid(),
//               type: "checkbox",
//               questionText: "???????????? ???????????? ???????????????? Checkbox",
//               questionDone: false,
//               questionRequired: true,
//               comment: false,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: [
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????1",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????2",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????3",
//                   checked: false,
//                 },
//               ],
//               userAnswer: [],
//               rules: [],
//               isActive: true,
//             },
//             {
//               id: nanoid(),
//               type: "radio",
//               questionText: "???????????? ???????????? ???????????????? Radio",
//               questionDone: false,
//               questionRequired: false,
//               comment: true,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: [
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????1",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????2",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????3",
//                   checked: false,
//                 },
//               ],
//               userAnswer: "",
//               rules: [],
//               isActive: true,
//             },
//             {
//               id: nanoid(),
//               type: "rating",
//               questionText: "???????????? ???????????? ???????????????? Rating",
//               questionDone: false,
//               questionRequired: true,
//               comment: true,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: ["item1", "item2", "item3"],
//               userAnswer: 0,
//               rules: [],
//               isActive: true,
//             },
//           ],
//         },
//         {
//           id: nanoid(),
//           name: "???????????? ???????????? ????????????????",
//           expanded: true,
//           disabled: false,
//           isActive: true,
//
//           progress: 65,
//           allSectionsProgress: 75,
//           questions: [
//             {
//               id: nanoid(),
//               type: "checkbox",
//               questionText: "???????????? ???????????? ???????????????? Checkbox",
//               questionRequired: true,
//               questionDone: false,
//
//               comment: false,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: [
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????1",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????2",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????3",
//                   checked: false,
//                 },
//               ],
//               userAnswer: [],
//               rules: [],
//               isActive: true,
//             },
//             {
//               id: nanoid(),
//               type: "radio",
//               questionText: "???????????? ???????????? ???????????????? Radio",
//               questionRequired: false,
//               questionDone: false,
//
//               comment: true,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: [
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????1",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????2",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????3",
//                   checked: false,
//                 },
//               ],
//               userAnswer: "",
//               rules: [],
//               isActive: true,
//             },
//             {
//               id: nanoid(),
//               type: "rating",
//               questionText: "???????????? ???????????? ???????????????? Rating",
//               questionRequired: true,
//               questionDone: false,
//               comment: true,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: ["item1", "item2", "item3"],
//               userAnswer: 0,
//               rules: [],
//               isActive: true,
//             },
//           ],
//         },
//         {
//           id: nanoid(),
//           name: "?????????????????? ???????????? ????????????????",
//           expanded: true,
//           disabled: false,
//           isActive: true,
//
//           allSectionsProgress: 75,
//           progress: 55,
//           questions: [
//             {
//               id: nanoid(),
//               type: "checkbox",
//               questionText: "?????????????????? ???????????? ???????????????? Checkbox",
//               questionDone: false,
//               questionRequired: true,
//               comment: false,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: [
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????1",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????2",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????3",
//                   checked: false,
//                 },
//               ],
//               userAnswer: [],
//               rules: [],
//               isActive: true,
//             },
//             {
//               id: nanoid(),
//               type: "radio",
//               questionText: "?????????????????? ???????????? ???????????????? Radio",
//               questionDone: false,
//               questionRequired: false,
//               comment: true,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: [
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????1",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????2",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????3",
//                   checked: false,
//                 },
//               ],
//               userAnswer: "",
//               rules: [],
//               isActive: true,
//             },
//             {
//               id: nanoid(),
//               type: "rating",
//               questionText: "?????????????????? ???????????? ???????????????? Rating",
//               questionDone: false,
//               questionRequired: true,
//               comment: true,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: ["item1", "item2", "item3"],
//               userAnswer: 0,
//               rules: [],
//               isActive: true,
//             },
//           ],
//         },
//         {
//           id: nanoid(),
//           name: "?????????? ???????????? ????????????????",
//           expanded: true,
//           disabled: false,
//           isActive: true,
//
//           progress: 0,
//           allSectionsProgress: 75,
//           questions: [
//             {
//               id: nanoid(),
//               type: "checkbox",
//               questionText: "?????????? ???????????? ???????????????? Checkbox",
//               questionDone: false,
//               questionRequired: true,
//               comment: false,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: [
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????1",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????2",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????3",
//                   checked: false,
//                 },
//               ],
//               userAnswer: [],
//               rules: [],
//               isActive: true,
//             },
//             {
//               id: nanoid(),
//               type: "radio",
//               questionText: "?????????? ???????????? ???????????????? Radio",
//               questionDone: false,
//               questionRequired: false,
//               comment: true,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: [
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????1",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????2",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????3",
//                   checked: false,
//                 },
//               ],
//               userAnswer: "",
//               rules: [],
//               isActive: true,
//             },
//             {
//               id: nanoid(),
//               type: "rating",
//               questionText: "?????????? ???????????? ???????????????? Rating",
//               questionDone: false,
//               questionRequired: true,
//               comment: true,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: ["item1", "item2", "item3"],
//               userAnswer: 0,
//               rules: [],
//               isActive: true,
//             },
//           ],
//         },
//         {
//           id: nanoid(),
//           name: "???????????? ???????????? ????????????????",
//           expanded: true,
//           disabled: true,
//           isActive: true,
//
//           progress: 0,
//           allSectionsProgress: 75,
//           questions: [
//             {
//               id: nanoid(),
//               type: "checkbox",
//               questionText: "???????????? ???????????? ???????????????? Checkbox",
//               questionDone: false,
//               questionRequired: true,
//               comment: false,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: [
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????1",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????2",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????3",
//                   checked: false,
//                 },
//               ],
//               userAnswer: [],
//               rules: [],
//               isActive: true,
//             },
//             {
//               id: nanoid(),
//               type: "radio",
//               questionText: "???????????? ???????????? ???????????????? Radio",
//               questionDone: false,
//               questionRequired: false,
//               comment: true,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: [
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????1",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????2",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????3",
//                   checked: false,
//                 },
//               ],
//               userAnswer: "",
//               rules: [],
//               isActive: true,
//             },
//             {
//               id: nanoid(),
//               type: "rating",
//               questionText: "???????????? ???????????? ???????????????? Rating",
//               questionDone: false,
//               questionRequired: true,
//               comment: true,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: ["item1", "item2", "item3"],
//               userAnswer: 0,
//               rules: [],
//               isActive: true,
//             },
//           ],
//         },
//         {
//           id: nanoid(),
//           name: "?????????????? ???????????? ????????????????",
//           expanded: true,
//           disabled: true,
//           isActive: true,
//
//           progress: 0,
//           allSectionsProgress: 75,
//           questions: [
//             {
//               id: nanoid(),
//               type: "checkbox",
//               questionText: "?????????????? ???????????? ???????????????? Checkbox",
//               questionDone: false,
//               questionRequired: true,
//               comment: false,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: [
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????1",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????2",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????3",
//                   checked: false,
//                 },
//               ],
//               userAnswer: [],
//               rules: [],
//               isActive: true,
//             },
//             {
//               id: nanoid(),
//               type: "radio",
//               questionText: "?????????????? ???????????? ???????????????? Radio",
//               questionDone: false,
//               questionRequired: false,
//               comment: true,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: [
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????1",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????2",
//                   checked: false,
//                 },
//                 {
//                   id: nanoid(),
//                   answerText: "??????????????3",
//                   checked: false,
//                 },
//               ],
//               userAnswer: "",
//               rules: [],
//               isActive: true,
//             },
//             {
//               id: nanoid(),
//               type: "rating",
//               questionText: "?????????????? ???????????? ???????????????? Rating",
//               questionDone: false,
//               questionRequired: true,
//               comment: true,
//               commentRequired: false,
//               commentValue: "",
//               validationError: false,
//               validationCommentError: false,
//               choices: ["item1", "item2", "item3"],
//               userAnswer: 0,
//               rules: [],
//               isActive: true,
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

type IDataParser = (data: IData) => IParsedData;

type IQuestionsDict = any;

export type IQuestionChildren = {
  [key: IId]: IParsedSurveyQuestion;
};

export const dataParser: IDataParser = (data) => {
  const campanings = data.surveyCampanings;
  const parsedSurveyCampanings: IParsedSurveyCampaning[] = campanings.map(
    (campany) => {
      const sections = campany.sections;
      const parsedSections = sections.map((section) => {
        const questions = section.questions;
        const questionsChildrenArr: IId[] = [];
        const questionsDict: {
          [key: IId]: IParsedSurveyQuestion;
        } = questions.reduce(
          (
            dict: {
              [key: IId]: IParsedSurveyQuestion;
            },
            question,
            index
          ) => {
            //
            dict[question.id] = {
              ...question,
              index,
              children: {},
            };
            if (question.type === "complex") {
              questionsChildrenArr.push(...question.choices);
            }
            return dict;
          },
          {}
        );

        const parsedQuestions: IParsedSurveyQuestion[] = [];
        questions.forEach((question) => {
          // ?????????????????? ???????? children
          if (question.type === "complex") {
            questionsDict[question.id].children = question.choices.reduce(
              (childrenDict: IQuestionChildren, id) => {
                childrenDict[id] = questionsDict[id];
                return childrenDict;
              },
              {}
            );
          }
          // ?????????? ????????????????????
          if (questionsChildrenArr.includes(question.id)) return;
          parsedQuestions.push(questionsDict[question.id]);
        });

        return { ...section, questions: parsedQuestions };
      });

      return { ...campany, sections: parsedSections };
    }
  );

  return { ...data, surveyCampanings: parsedSurveyCampanings };
};
