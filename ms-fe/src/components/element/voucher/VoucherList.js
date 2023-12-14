import { Card, Col, Radio, Row } from "antd";
import numeral from "numeral";
import styles from "./VoucherList.module.css";
import moment from "moment/moment";

const image = "/vouchers/voucher_img.png";

function VoucherList({ data, setValue, value }) {
  function handleOnClick(e) {
    console.log("onClick: ", e);
    if (e.target.checked) {
      setValue({});
    }
  }

  return (
    <Row className={styles.width600}>
      <Col span={7}>
        <img src={image} alt={data.voucherName} />
      </Col>
      <Col span={15} className={styles.padding}>
        <h3 className={styles.fontWeight500}>
          {`Giảm ${numeral(data.voucherValue).format("0,0")}`}
          {`${data.voucherMethod === "vnd" ? "đ" : "%"}`}
        </h3>
        <h3 className={styles.fontWeight400}>
          Đơn tối thiểu {numeral(data.voucherCondition).format("0,0")}đ{" "}
          {`${
            data.voucherMethod === "%"
              ? "Giảm tối đa " +
                numeral(data.voucherValueMax).format("0,0") +
                "đ"
              : ""
          }`}
        </h3>
        <h4 className={`${styles.fontWeight400} ${styles.color}`}>
          HSD: {moment(data.endDate).format("DD.MM.YYYY")}
        </h4>
      </Col>
      <Col span={2} className={styles.flex}>
        <Radio value={data} onClick={handleOnClick} />
      </Col>
    </Row>
  );
}

export default VoucherList;
