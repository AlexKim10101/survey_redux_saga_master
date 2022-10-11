type IFindPath = (ob: {}, key: string, value: string) => string;

export const findPath: IFindPath = (ob, key, value) => {
  const path: string[] = [];

  const keyExists = (obj: { [key: string]: any }, key: string): boolean => {
    if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
      return false;
    } else if (obj.hasOwnProperty(key) && obj[key] === value) {
      return true;
    } else if (Array.isArray(obj)) {
      let parentKey = path.length ? path.pop() : "";

      for (let i = 0; i < obj.length; i++) {
        path.push(`${parentKey}[${i}]`);
        const result = keyExists(obj[i], key);
        if (result) {
          return result;
        } else {
          path.pop();
        }
      }
      path.push(`${parentKey}`);
    } else {
      for (const k in obj) {
        path.push(k);
        const result = keyExists(obj[k], key);
        if (result) {
          return result;
        } else path.pop();
      }
    }
    return false;
  };

  keyExists(ob, key);

  return path.join(".");
};
