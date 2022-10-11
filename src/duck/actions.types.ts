import { IInferValueTypes } from "../utils/ts-utils";
import * as actions from "./actions";

export type ISurveyAction = ReturnType<IInferValueTypes<typeof actions>>;
