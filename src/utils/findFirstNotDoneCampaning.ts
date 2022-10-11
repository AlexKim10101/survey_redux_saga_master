import { IParsedSurveyCampaning } from "../duck/fakeData/surveyData";
import { findFirstNotDoneQuestion } from "./findFirstNotDoneQuestion";

export const isCampaningDone = (campaning: IParsedSurveyCampaning) => {
  let result = true;
  campaning.sections.forEach((section, sectionIndex) => {
    if (findFirstNotDoneQuestion(section) > -1) {
      result = false;
    }
  });
  return result;
};
