import { Modal, Space, Radio, Input, notification } from "antd";
import styles from "./FormUsingVoucher.module.css";
import { useEffect, useState } from "react";
import VoucherList from "./VoucherList";
import axios from "axios";
import "./global.css";
import { getToken } from "../../../service/Token";

const href = window.location.href;
const baseUrl = `http://localhost:8080/api/${
  href.includes("admin") ? `admin` : `client`
}/vouchers`;

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
  const [isLoading, setIsLoading] = useState(true);
  const [apiNotification, contextHolder] = notification.useNotification();

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
      if (voucherCodeOrName) {
        const filter = vouchers?.filter(
          (e) =>
            e?.voucherName
              ?.toLowerCase()
              .includes(voucherCodeOrName?.toLowerCase()) ||
            e?.voucherCode?.includes(voucherCodeOrName)
        );
        if (filter?.length > 0) {
          setVouchers(filter);
          setIsLoading((bool) => !bool);
        } else {
          try {
            const res = await axios.get(
              baseUrl + "/search/" + voucherCodeOrName,
              {
                headers: {
                  Authorization: `Bearer ${getToken(true)}`,
                },
              }
            );
            const data = await res.data;
            setVouchers(data);
            setIsLoading((bool) => !bool);
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        try {
          const condition = {
            username,
            priceBill,
            voucherCodeOrName,
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
          setVouchers(data);
          setIsLoading((bool) => !bool);
        } catch (err) {
          const status = err?.response?.data?.status;

          if (status === 403) {
            apiNotification.error({
              message: "Lỗi",
              description: "Bạn không có quyền xem nội dung này",
            });
            setVouchers([]);
            return;
          }
        }
      }
    }
    getVouchers();
  }, [priceBill, username, voucherCodeOrName]);

  return (
    <>
      {contextHolder}
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
          {vouchers.length > 0 ? (
            <Radio.Group
              onChange={(e) => {
                handleOnChange(e.target.value);
              }}
              value={voucher}
            >
              {vouchers?.map(
                (data) =>
                  data.status !== "CANCEL" && (
                    <VoucherList
                      key={data.voucherId}
                      data={data}
                      setValue={setVoucher}
                      value={voucher}
                    />
                  )
              )}
            </Radio.Group>
          ) : null}
        </Space>
      </Modal>
    </>
  );
}

export default FormUsingVoucher;
