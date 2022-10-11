import axios from "axios";
import { IData, IParams } from "../../duck/fakeData/surveyData";

export const basePath =
  "http://95.163.85.171:27802/WebSurvey/api/sa/SurveyService/survey";

export const fethData = (surveyID: string) => {
  return axios(`${basePath}?surveyID=${surveyID}`);
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
