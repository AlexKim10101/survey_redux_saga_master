import { ISurveyQuestion, IUserAnswer } from '../duck/fakeData/surveyData'

export const questionValidation = (
	userAnswer: IUserAnswer,
	question: ISurveyQuestion
): boolean => {
	if (
		question.type === 'checkbox' ||
		question.type === 'radio' ||
		question.type === 'textQuestion'
	) {
		const answer = userAnswer.length
		return answer > 0
	}

	if (question.type === 'textMessage') {
		return true
	}

	return true
}
