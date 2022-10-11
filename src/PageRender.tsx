import React from "react";
import { IPageName } from "./duck/fakeData/surveyData";
import MainPage from "./pages/MainPage";
import SectionPage from "./pages/SectionPage";
import QuestionPage from "./pages/QuestionPage";
import SurveyCampaningPage from "./pages/CampaningPage";
import ErrorPage from "./pages/ErrorPage";

type IPageRenderProps = {
  currentPage: IPageName;
};

const PageRender: React.FC<IPageRenderProps> = ({ currentPage }) => {
  switch (currentPage) {
    case "main": {
      return <MainPage />;
    }

    case "surveyCampaning": {
      return <SurveyCampaningPage />;
    }

    case "section": {
      return <SectionPage />;
    }
    case "question": {
      return <QuestionPage />;
    }
    case "answer": {
      return <SectionPage />;
    }
    case "error": {
      return <ErrorPage />;
    }
    default: {
      return <div>Page not found</div>;
    }
  }
};

export default PageRender;
