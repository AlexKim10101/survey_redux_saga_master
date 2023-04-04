import { NumberLiteralType } from "typescript";

export type IPathname =
	| "/"
	| "/campaning"
	| "/section"
	| "/question"
	| "/answer";

export type IBackendData = {
	docID: number;
	name: string;
	isClosed: boolean;
	beginDate: string;
	endDate: string;
	closeDate: string;
	isLimitTimeForCompletion: boolean;
	limitTime: number;
	pages: IBackendPage[];
};

export type IBackendPage = {
	docID: number;
	title: string;
	surveyID: number;
	order: number;
	questions: IBackendQuestion[];
};

export type IBackendQuestion = {
	docID: number;
	surveyID: number; //???
	pageID: number;

	type: number; //???
	title: string;

	order: number;
	comment: string;
	answers: IBackendAnswer[];
	branchRules: IBackendBranchRule[];
	quoteRules: IBackendQuoteRule[];
	visibilityRules: IBackendVisibilityRule[];
	config: IConfig;
};

export type IOption = {
	docID: number;
	height: number;
	order: number;
	photoID: number;
	title: string;
	width: number;
};

export type IConfig = {
	dataType: IDataType;
	isConfirmable: boolean;
	isEnable: boolean;
	isMultiline: boolean;
	isRequired: boolean;
	isSaveTime: boolean;
	isShowOnButton: boolean;
	isTimeLimited: boolean;
	timeLimit: number;
	title: string;
	options?: IOption[];
};

export type IDataType =
	| "select"
	| "dropdown"
	| "multiselect"
	| "multidropdown"
	| "matrix"
	| "matrix3d"
	| "free"
	| "freelist"
	| "freematrix"
	| "order"
	| "ratingscale"
	| "paircompare"
	| "complex";

export type IBackendAnswer = any;
export type IBackendBranchRule = {};
export type IBackendQuoteRule = {};
export type IBackendVisibilityRule = {};
