import axios from "axios";
import { IData, IParams } from "../../duck/fakeData/surveyData";

export const basePath =
	"http://95.163.85.171:27802/WebSurvey/api/sa/SurveyService/survey";

const newPath = "http://192.168.0.133:5002/api/survey/1";

// const headers = {
// 	Accept:
// 		"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
// 	"Accept-Encoding": "gzip, deflate",
// 	"Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
// };

export const fethData = (surveyID: string) => {
	// return axios(`${basePath}?surveyID=${surveyID}`);
	return axios(newPath, {
		// headers: headers,
	});
};

export const sendData = ({
	data,
	params,
}: {
	data: IData;
	params: IParams;
}) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	return axios.post(
		`http://95.163.85.171:27802/WebSurvey/api/sa/SurveyService/completeSurvey`,
		{ ...data, params: params },
		config
	);
};
