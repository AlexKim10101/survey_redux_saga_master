import { IPathname } from "../survey.types";

export const DEFAULT_CURRENT_USER_INDEX = 0;
export const DEFAULT_CURRENT_QUESTION_INDEX = 0;
export const DEFAULT_CURRENT_PAGE = "main";
export const DEFAULT_MOVE_DIRECTION = "left-to-right";
export const DEFAULT_CURRENT_SURVEY_COMPANING_INDEX = 0;
export const DEFAULT_CURRENT_SECTION_INDEX = 0;
export const TIMEOUT_VALUE = 500;
export const DEFAULT_PAGE_QUESTION_COUNT = 2;

export const PATHNAME_PRIORITY_DICT = {
	"/": 0,
	"/campaning": 1,
	"/section": 2,
	"/question": 3,
	"/answer": 4,
};

export const PATHNAME_PRIORITY_ARR: IPathname[] = [
	"/",
	"/campaning",
	"/section",
	"/question",
	"/answer",
];

export const LINK_BACK_TEXT_DICT = {
	"/": "Что-то пошло не так",
	"/campaning": "К списку кампаний",
	"/section": "К разделу",
	"/question": "К списку",
	"/answer": "К ответам",
};
