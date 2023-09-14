import styles from "./Voucher.module.css";

import { Button, Col, Pagination, Row, Space, Table, Tag } from "antd";
import FilterVoucherAndPromotion from "../../element/filter/FilterVoucherAndPromotion";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Mã",
    dataIndex: "voucherCode",
    key: "voucherCode",
    render: (code) => <Link to={"/admin/voucher/detail"}>{code}</Link>,
  },
  {
    title: "Tên",
    dataIndex: "voucherName",
    key: "voucherName",
  },
  {
    title: "Số lượng",
    dataIndex: "limitQuantity",
    key: "limitQuantity",
  },
  {
    title: "Giá trị",
    dataIndex: "voucherValue",
    key: "voucherValue",
  },
  {
    title: "Thời gian",
    dataIndex: "startAndEndDate",
    key: "startAndEndDate",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (_, { status }) => (
      <>
        {status.map((sta) => {
          let color =
            sta === "Đang diễn ra"
              ? "geekblue"
              : sta === "Sắp diễn ra"
              ? "green"
              : "red";
          if (sta === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={sta}>
              {sta.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
    render: (_) => (
      <Space size="middle">
        <Link to={"/admin/voucher/detail"}>
          <EyeOutlined />
        </Link>

        <Link to={"/admin/voucher/update"}>
          <EditOutlined />
        </Link>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    stt: "1",
    voucherCode: "VOUCHER_1",
    voucherName: "Black friday",
    limitQuantity: 20,
    voucherValue: 50000,
    startAndEndDate: "2012/20/20 - 2020/20/20",
    status: ["Đang diễn ra"],
  },
  {
    key: "2",
    stt: "2",
    voucherCode: "VOUCHER_2",
    voucherName: "Black friday",
    limitQuantity: 20,
    voucherValue: 50000,
    startAndEndDate: "2012/20/20 - 2020/20/20",
    status: ["Sắp diễn ra"],
  },
  {
    key: "3",
    stt: "3",
    voucherCode: "VOUCHER_3",
    voucherName: "Black friday",
    limitQuantity: 20,
    voucherValue: 50000,
    startAndEndDate: "2012/20/20 - 2020/20/20",
    status: ["Đã kết thúc"],
  },
];

function Voucher() {
  return (
    <div className={styles.voucher}>
      <FilterVoucherAndPromotion />

      <div className={styles.content}>
        s
        <Space style={{ width: "100%" }} direction="vertical" size={16}>
          <Row>
            <Col span={20}>
              <Space size={12} className={styles.color}>
                <i>
                  <UnorderedListOutlined />
                </i>
                <h2>Danh sách Voucher</h2>
              </Space>
            </Col>

            <Col span={4}>
              <Link to={"/admin/voucher/create"}>
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  className={styles.btn}
                >
                  Tạo Voucher
                </Button>
              </Link>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={data}
            className={styles.table}
            pagination={false}
          />
          <Pagination defaultCurrent={1} total={500} />
        </Space>
      </div>
    </div>
  );
}

export default Voucher;
