import { isString } from "antd/es/button";

export function isFormInputEmpty(object) {
  for (let key in object) {
    if (isString(object[key])) {
      if (object[key].trim() === "") {
        return true;
      }
    } else if (object[key] === null || object[key] === undefined) {
      return true;
    } else {
      return false;
    }
  }
}
