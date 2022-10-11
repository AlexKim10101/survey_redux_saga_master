import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AppBarTop from "./components/appBarTop/AppBarTop";
import AppBarBottom from "./components/appBarBottom/AppBarBottom";
import PageRender from "./PageRender";
import { TIMEOUT_VALUE } from "./utils/const";
import { IState } from "./duck/fakeData/surveyData";
import "./styles/survey.css";

type ISurveyComponentProps = ConnectedProps<typeof connector>;

const SurveyComponent: React.FC<ISurveyComponentProps> = ({
  currentPage,
  slideMoveDirection,
  fetchData,
  sendData,
}) => {
  useEffect(() => {
    fetchData();
  }, []);

  if (!currentPage) return null;

  return (
    <div className="wrapper">
      <AppBarTop />
      <TransitionGroup
        className="slider"
        childFactory={(child) =>
          React.cloneElement(child, {
            classNames: slideMoveDirection,
          })
        }
      >
        <CSSTransition
          key={currentPage}
          classNames="left-to-right"
          timeout={{ enter: TIMEOUT_VALUE, exit: TIMEOUT_VALUE }}
        >
          <div className="slider-item">
            <PageRender currentPage={currentPage} />
          </div>
        </CSSTransition>
      </TransitionGroup>
      {currentPage !== "main" && <AppBarBottom sendData={sendData} />}
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    currentPage: state.currentPage,
    slideMoveDirection: state.slideMoveDirection,
  };
};

const mapDispathToProps = (dispatch: Dispatch) => {
  return {
    fetchData: () => {
      dispatch({ type: "FETCH_SURVEY_DATA" });
    },
    sendData: () => {
      dispatch({ type: "SEND_SURVEY_DATA" });
    },
  };
};

const connector = connect(mapStateToProps, mapDispathToProps);

export default connector(SurveyComponent);
