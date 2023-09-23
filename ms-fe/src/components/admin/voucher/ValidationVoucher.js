import { isString } from "antd/es/button";
import moment from "moment";

function ValidNotBlank(object) {
  for (let key in object) {
    if (isString(object[key])) {
      if (object[key].trim() === "") {
        return { status: true };
      }
    } else if (object[key] === null || object[key] === undefined) {
      return { status: false, message: "Không được bỏ trống." };
    }
  }
}

function ValidStartDateAndEndDate(startDate, endDate) {
  if (moment.isDate(startDate?.$d) && moment.isDate(endDate?.$d)) {
    if (
      moment(startDate?.$d).format("DD-MM-YYYY") <
      moment(endDate?.$d).format("DD-MM-YYYY")
    ) {
      return { status: true };
    } else {
      return {
        status: false,
        message: "Ngày kết thúc phải lớn hơn ngày bắt đầu.",
      };
    }
  }

  return {
    status: false,
    messsage:
      "Sai định dạng hoặc ngày bắt đầu và kết thúc phải lớn hơn ngày hiện tại",
  };
}

export { ValidNotBlank, ValidStartDateAndEndDate };
