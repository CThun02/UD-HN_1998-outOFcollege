import { isString } from "antd/es/button";

export function isFormInputEmpty(object) {
  for (let key in object) {
    if (object[key].toString().trim() === "") {
      return true;
    } else if (object[key] === null || object[key] === undefined) {
      return true;
    }
  }
  return false;
}
