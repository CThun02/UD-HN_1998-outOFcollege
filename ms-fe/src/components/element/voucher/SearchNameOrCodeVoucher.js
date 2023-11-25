import { AutoComplete } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import OptionVoucher from "./OptionVoucher";
import { getToken } from "../../../service/Token";

const baseUrl = "http://localhost:8080/api/admin/vouchers";
const image = "/vouchers/voucher_img.png";

function SearchNameOrCodeVoucher({ username, priceBill, setVoucher, voucher }) {
  const [options, setOptions] = useState([]);
  const [code, setCode] = useState("");

  function handleSelecedVoucher(value) {
    setVoucher(value);
    setCode(value.voucherCode);
  }

  useEffect(() => {
    async function getVouchers() {
      try {
        const condition = {
          username,
          priceBill,
        };
        const res = await axios.post(
          baseUrl + "/display-modal-using",
          condition,
          {
            headers: {
              Authorization: `Bearer ${getToken(true)}`,
            },
          }
        );
        const data = await res.data;
        const arrays = data?.map((e) => ({
          key: e.voucherId,
          value: (
            <>
              <img
                key={e.voucherId}
                src={image}
                alt="voucher-img"
                style={{ width: "50px", marginRight: "20px" }}
              />
              <span>{e.voucherCode}</span>
            </>
          ),
          voucher: e,
        }));
        setOptions(arrays);
      } catch (err) {
        console.log(err);
      }
      setCode(voucher.voucherCode);
    }

    getVouchers();
  }, [priceBill, username, voucher]);

  return (
    <AutoComplete
      style={{ width: 200 }}
      options={options}
      placeholder="Nhập tên hoặc mã giảm giá"
      filterOption={(inputValue, option) =>
        option.voucher.voucherCode
          .toUpperCase()
          .indexOf(inputValue.toUpperCase()) !== -1
      }
      allowClear
      onSelect={(value, option) => handleSelecedVoucher(option.voucher)}
      onChange={(e) => setCode(e)}
      value={code}
    />
  );
}

export default SearchNameOrCodeVoucher;
