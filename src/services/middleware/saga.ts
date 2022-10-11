import { AxiosError } from "axios";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { setError, setNewState } from "../../duck";
import { IData, IState } from "../../duck/fakeData/surveyData";
import { getInitState } from "../../utils/getInitState";
import { selectData } from "../../utils/selectors/selectors";
import { fethData, sendData } from "../api/api";

type IResult = { data: IData };

function* fetchSurveyData() {
  const params = new URLSearchParams(document.location.search);
  const surveyID = params.get("surveyID");
  const paramsObj: { [key: string]: any } = {};

  for (const [key, value] of params) {
    paramsObj[String(key)] = value;
  }

  try {
    const result: IResult = yield call(() => fethData(surveyID!));
    const state: IState = getInitState(result.data, paramsObj);
    yield put(setNewState({ state }));
  } catch (e) {
    const error = e as AxiosError;
    yield put(setError({ error: { status: true, message: error.message } }));
  }
}

function* sendSurveyData() {
  const { data, params } = yield select(selectData);

  try {
    const result: {} = yield call(() => sendData({ data, params }));
    console.log("success", result);
  } catch (err) {
    console.log("error", err);
  }
}

function* mySaga() {
  yield takeEvery("FETCH_SURVEY_DATA", fetchSurveyData);
  yield takeEvery("SEND_SURVEY_DATA", sendSurveyData);
}

export default mySaga;
