import { ISurveyQuestion, IUserAnswer } from "../duck/fakeData/surveyData";
import { IBackendQuestion } from "../survey.types";

export const questionValidation = (
	userAnswer: IUserAnswer,
	question: ISurveyQuestion
): boolean => {
	if (
		question.type === "checkbox" ||
		question.type === "radio" ||
		question.type === "textQuestion"
	) {
		const answer = userAnswer.length;
		return answer > 0;
	}

	if (question.type === "textMessage") {
		return true;
	}

	return true;
};

export const isQuestionDone = (question: IBackendQuestion): boolean => {
	// switch(question.config.dataType)
	return !(question.answers.length === 0);
};
