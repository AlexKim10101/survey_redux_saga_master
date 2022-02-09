import React from "react";
import { Progress } from "antd";
import Typography from "@material-ui/core/Typography";
import "./styles/style.css";

const ProgressLinear = ({ progress }) => {
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
          Выполнено вопросов: 210/350
        </Typography>
      </div>
    </div>
  );
};

export default ProgressLinear;
