import setWith from "lodash/setWith";
import clone from "lodash/clone";
import get from "lodash/get";

export const set = (obj: Record<string, unknown>, path: string, value: any) =>
  setWith(clone(obj), path, value, clone);

export const getValue = (obj: Record<string, unknown>, path: string) =>
  get(clone(obj), path);
