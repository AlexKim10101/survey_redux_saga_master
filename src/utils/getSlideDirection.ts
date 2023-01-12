import { ISlideMoveDirection } from "../duck/fakeData/surveyData";
import { IPathname } from "../survey.types";
import { PATHNAME_PRIORITY_DICT } from "./const";

type IGetSlideDirection = (
	from: IPathname,
	to: IPathname
) => ISlideMoveDirection;

const getSlideDirection: IGetSlideDirection = (from, to) => {
	const direction =
		PATHNAME_PRIORITY_DICT[to] > PATHNAME_PRIORITY_DICT[from]
			? "right-to-left"
			: "left-to-right";
	return direction;
};

export default getSlideDirection;
