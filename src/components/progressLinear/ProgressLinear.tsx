import React from "react";
import { Progress } from "antd";
import Typography from "@material-ui/core/Typography";
import "./styles/style.css";
import { ISection } from "../../duck/fakeData/surveyData";
import { getProgress, getProgressValues } from "../../utils/getProgressValues";
import { IBackendPage } from "../../survey.types";

export type IProgressLinear = {
	// sections: ISection[];
	pages: IBackendPage[];
};

const ProgressLinear: React.FC<IProgressLinear> = ({ pages }) => {
	// getProgress;
	const { allQuestionsDoneCount, allQuestionCount } = getProgress(pages);
	// const progress = Math.floor((allQuestionsDoneCount / allQuestionCount) * 100);
	const progress = 20;
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
