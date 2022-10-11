import { IState } from "../../duck/fakeData/surveyData";

export const selectData = (state: IState) => {
  return { data: state.data, params: state.params };
};
