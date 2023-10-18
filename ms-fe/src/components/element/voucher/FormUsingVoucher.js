import { Modal, Space, Radio } from "antd";
import styles from "./FormUsingVoucher.module.css";
import { useEffect, useRef, useState } from "react";
import VoucherList from "./VoucherList";
import axios from "axios";
import "./global.css";

const baseUrl = "http://localhost:8080/api/admin/vouchers";

function FormUsingVoucher({
  setIsOpen,
  isOpen,
  setVoucher,
  voucher,
  priceBill,
  username,
}) {
  const [vouchers, setVouchers] = useState([]);

  const handleOnChange = (value) => {
    setVoucher(value);
  };

  function handleOk() {
    setIsOpen(false);
  }

  function handleCancel() {
    setIsOpen(false);
  }

  useEffect(() => {
    async function getVouchers() {
      if (username) {
        const res = await axios.get(
          baseUrl +
            "/display-modal-using?username=" +
            username +
            "&priceBill=" +
            priceBill
        );
        const data = await res.data;
        setVouchers(data);
      } else {
        try {
          const res = await axios.get(baseUrl + "/display-modal-using");
          const data = await res.data;
          setVouchers(data);
        } catch (e) {
          console.log("Fetch data error: ", e);
        }
      }
    }
    getVouchers();
  }, [priceBill, username]);

  return (
    <Modal
      title="Chọn mã giảm giá"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className={styles.scroll}
      centered
    >
      <Space style={{ width: "100%" }} direction="vertical">
        <Radio.Group
          onChange={(e) => {
            handleOnChange(e.target.value);
          }}
          value={voucher}
        >
          {vouchers.map((data) => (
            <VoucherList
              key={data.voucherId}
              data={data}
              setValue={setVoucher}
            />
          ))}
        </Radio.Group>
      </Space>
    </Modal>
  );
}

export default FormUsingVoucher;
