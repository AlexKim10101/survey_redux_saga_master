import { IParsedSurveyQuestion, IRule } from "../duck/fakeData/surveyData";

type IRuleIsActive = (q: IParsedSurveyQuestion, rule: IRule) => boolean;

export const ruleIsActive: IRuleIsActive = (q, rule) => {
  switch (q.type) {
    case "textMessage": {
      return true;
    }

    // case "rating": {
    //   if (Number(rule.reasonValue) > q.userAnswer) {
    //     return false;
    //   }
    //   return true;
    // }

    case "complex":
    case "checkbox": {
      if (!q.userAnswer.map((item) => item.id).includes(rule.reasonValue)) {
        return false;
      }
      return true;
    }

    case "radio":
    case "textQuestion": {
      if (rule.reasonValue !== q.userAnswer[0].answerText) {
        return false;
      }
      return true;
    }
    default: {
      return false;
    }
  }
};
