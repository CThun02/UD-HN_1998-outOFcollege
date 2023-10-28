import { Modal, Space, Radio, Input } from "antd";
import styles from "./FormUsingVoucher.module.css";
import { useEffect, useState } from "react";
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
  const [voucherCodeOrName, setVoucherCodeOrName] = useState("");

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
      try {
        const condition = {
          username,
          priceBill,
          voucherCodeOrName,
        };
        const res = await axios.post(
          baseUrl + "/display-modal-using",
          condition
        );
        const data = await res.data;
        setVouchers(data);
      } catch (err) {
        console.log(err);
      }
    }
    getVouchers();
  }, [priceBill, username, voucherCodeOrName]);

  return (
    <Modal
      title="Chọn mã giảm giá"
      open={isOpen}
      footer={null}
      onCancel={handleCancel}
      className={styles.scroll}
      centered
    >
      <div style={{ padding: "10px 0" }}>
        <Input
          placeholder="Nhập mã hoặc tên voucher"
          size="large"
          onChange={(e) => setVoucherCodeOrName(e.target.value)}
          value={voucherCodeOrName}
        />
      </div>
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
              value={voucher}
            />
          ))}
        </Radio.Group>
      </Space>
    </Modal>
  );
}

export default FormUsingVoucher;
