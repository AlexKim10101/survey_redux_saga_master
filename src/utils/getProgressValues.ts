import { ISection } from "../duck/fakeData/surveyData";

const accumFunc = (
  prevAcc: { allQuestionsDoneCount: number; allQuestionCount: number },
  acc: { allQuestionsDoneCount: number; allQuestionCount: number }
) => {
  return {
    allQuestionsDoneCount:
      prevAcc.allQuestionsDoneCount + acc.allQuestionsDoneCount,
    allQuestionCount: prevAcc.allQuestionCount + acc.allQuestionCount,
  };
};

export const getProgressValues = (sections: ISection[]) => {
  const { allQuestionsDoneCount, allQuestionCount } = sections.reduce(
    (
      acc: { allQuestionsDoneCount: number; allQuestionCount: number },
      section: ISection
    ) => {
      return accumFunc(
        acc,
        section.questions.reduce(
          (
            acc: { allQuestionsDoneCount: number; allQuestionCount: number },
            question
          ) => {
            return {
              allQuestionsDoneCount: question.questionDone
                ? acc.allQuestionsDoneCount + 1
                : acc.allQuestionsDoneCount,
              allQuestionCount: acc.allQuestionCount + 1,
            };
          },
          { allQuestionsDoneCount: 0, allQuestionCount: 0 }
        )
      );
    },
    { allQuestionsDoneCount: 0, allQuestionCount: 0 }
  );
  return { allQuestionsDoneCount, allQuestionCount };
};
