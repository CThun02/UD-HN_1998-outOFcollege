import { isString } from "antd/es/button";

export function isFormInputEmpty(object) {
  for (let key in object) {
    if (isString(object[key])) {
      if (object[key].trim() === "") {
        return true;
      }
    }
  }
}
