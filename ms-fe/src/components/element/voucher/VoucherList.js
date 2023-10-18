import { Card, Col, Radio, Row } from "antd";

const image = "/vouchers/voucher.png";

function VoucherList({ data }) {
  return (
    <Row>
      <Col span={24}>
        <Card bordered={true}>
          <Row style={{ height: "100%" }}>
            <Col span={7} style={{ background: "#ccc" }}>
              <img src={image} alt={data.voucherName} />
            </Col>
            <Col span={15}>bla bla</Col>
            <Col span={2}>
              <Radio />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default VoucherList;
