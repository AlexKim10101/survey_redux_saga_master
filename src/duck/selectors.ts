import { createSelector } from "reselect";
import { IState } from "./fakeData/surveyData";

export const selectCurrentCompanyIndex = (state: IState) =>
  state.currentSurveyCampaningIndex;

export const selectCurrentSectionIndex = (state: IState) =>
  state.currentSectionIndex;

export const selectCurrentQuestionIndex = (state: IState) =>
  state.currentQuestionIndex;

export const selectData = (state: IState) => state.data!;

export const selectBackendData = (state: IState) => state.backendData!

export const selectRequestAnswerData = (state: IState) => {
  return { data: state.data, params: state.params };
};

export const selectCurrentCampaning = createSelector(
  selectData,
  selectCurrentCompanyIndex,
  (data, index) => data.surveyCampanings[index]
);

export const selectCurrentSection = createSelector(
  selectCurrentCampaning,
  selectCurrentSectionIndex,
  (company, index) => company.sections[index]
);

export const selectCurrentQuestion = createSelector(
  selectCurrentSection,
  selectCurrentQuestionIndex,
  (section, index) => section.questions[index]
);

export const selectCurrentPage = createSelector(selectBackendData, 
  selectCurrentSectionIndex,
  (data, index)=>data.pages[index]);


/////




