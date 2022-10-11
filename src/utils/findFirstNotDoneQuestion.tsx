import { IParsedSection } from "../duck/fakeData/surveyData";

export const findFirstNotDoneQuestion = (section: IParsedSection) => {
  // console.log(section);
  return section.questions.findIndex((q) => !q.questionDone);
};
