import { Input, notification } from "antd";
import axios from "axios";
import { useState } from "react";
import { getToken } from "../../service/Token";
import numeral from "numeral";
function InputCallAPI({
  currentValue,
  onChange,
  width,
  url,
  isCallAPI,
  method,
  billId,
  currentPrice,
  handleCreateTimeline,
  billStatus,
  isPaid,
  totalPrice,
}) {
  const [timer, setTimer] = useState(null);

  const styleInput = {
    width: width ? width : "30%",
  };

  const inputChanged = (e) => {
    onChange(e?.target?.value);

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      if (e?.target?.value !== currentPrice) {
        try {
          const priceValue = Number(e?.target?.value.replace(",", ""));
          if (priceValue < 10000 || priceValue > 1000000) {
            onChange(currentPrice);

            notification.error({
              message: "Thông báo",
              description: "Phí vận chuyển không hợp lệ.",
            });
          } else {
            if (isCallAPI) {
              axios
                .put(
                  url,
                  { billId, shippingPrice: e?.target?.value },
                  {
                    headers: {
                      Authorization: `Bearer ${getToken(true)}`,
                    },
                  }
                )
                .then(() => {
                  notification.success({
                    message: "Thông báo",
                    description: "Cập nhật phí vận chuyển thành công",
                  });
                  handleCreateTimeline(
                    `Cập nhật phí vận chuyển ${numeral(currentPrice).format(
                      "0,0"
                    )}đ (cũ), ${e?.target?.value}đ (mới).`,
                    "Update",
                    null
                  );
                })
                .catch(() => {
                  onChange(currentPrice);
                  notification.error({
                    message: "Thông báo",
                    description: "Cập nhật thất bại.",
                  });
                });
            }
          }
        } catch (err) {
          onChange(currentPrice);
          notification.error({
            message: "Thông báo",
            description: "Sai định dạng.",
          });
        }
      }
    }, 1000);

    setTimer(newTimer);
  };

  return (
    <Input
      style={styleInput}
      value={currentValue}
      onChange={inputChanged}
      readOnly={billStatus !== "wait_for_confirm" || isPaid}
    />
  );
}

export default InputCallAPI;
