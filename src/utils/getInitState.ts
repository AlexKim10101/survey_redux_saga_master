import {
	dataParser,
	IData,
	IParams,
	ISection,
	IState,
	ISurveyCampaning,
	ISurveyQuestion,
} from "../duck/fakeData/surveyData";
import { IBackendData } from "../survey.types";
import {
	DEFAULT_CURRENT_USER_INDEX,
	DEFAULT_CURRENT_PAGE,
	DEFAULT_CURRENT_QUESTION_INDEX,
	DEFAULT_MOVE_DIRECTION,
	DEFAULT_CURRENT_SURVEY_COMPANING_INDEX,
	DEFAULT_CURRENT_SECTION_INDEX,
	DEFAULT_PAGE_QUESTION_COUNT,
} from "./const";

type IParsedSurveyQuestion = ISurveyQuestion & {
	index: number;
	children: IParsedSurveyQuestion[];
};

// export type IParsedData = IData & {
//   surveyCampanings: ISurveyCampaning &
//     {
//       sections: ISection &
//         {
//           questions: IParsedSurveyQuestion[];
//         }[];
//     }[];
// };

export const backendDataParser = (data: IBackendData) => data;

export const getInitState = (data: IBackendData, params: IParams): IState => {
	return {
		// data: data ? dataParser(data) : null,
		data: null,
		backendData: backendDataParser(data),
		loading: false,
		error: {
			status: false,
			message: "",
		},
		currentUserIndex: DEFAULT_CURRENT_USER_INDEX,
		currentSurveyCampaningIndex: DEFAULT_CURRENT_SURVEY_COMPANING_INDEX,
		currentPage: DEFAULT_CURRENT_PAGE,
		currentQuestionIndex: DEFAULT_CURRENT_QUESTION_INDEX,
		slideMoveDirection: DEFAULT_MOVE_DIRECTION,
		currentSectionIndex: DEFAULT_CURRENT_SECTION_INDEX,
		params: params,
		pageQuestionCount: DEFAULT_PAGE_QUESTION_COUNT,
	};
};
