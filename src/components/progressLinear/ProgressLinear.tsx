import React from "react";
import { Progress } from "antd";
import Typography from "@material-ui/core/Typography";
import "./styles/style.css";
import { ISection } from "../../duck/fakeData/surveyData";
import { getProgressValues } from "../../utils/getProgressValues";

export type IProgressLinear = {
  sections: ISection[];
};

const ProgressLinear: React.FC<IProgressLinear> = ({ sections }) => {
  const { allQuestionsDoneCount, allQuestionCount } = getProgressValues(
    sections
  );
  const progress = Math.floor((allQuestionsDoneCount / allQuestionCount) * 100);

  return (
    <div>
      <div className="progress">
        <Typography variant="body1" gutterBottom>
          Общий прогресс
        </Typography>
        <Progress
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          percent={progress}
        />
        <Typography variant="caption" display="block" gutterBottom>
          {`Выполнено вопросов: ${allQuestionsDoneCount}/${allQuestionCount}`}
        </Typography>
      </div>
    </div>
  );
};

export default ProgressLinear;
