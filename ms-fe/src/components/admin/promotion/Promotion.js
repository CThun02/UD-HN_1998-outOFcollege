import { Button, Col, Drawer, Pagination, Row, Space, Table, Tag } from "antd";
import FilterpromotionAndPromotion from "../../element/filter/FilterVoucherAndPromotion";

import styles from "./Promotion.module.css";
import {
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Mã",
    dataIndex: "promotionCode",
    key: "promotionCode",
    render: (code) => <Link to={"/admin/promotion/detail"}>{code}</Link>,
  },
  {
    title: "Tên",
    dataIndex: "promotionName",
    key: "promotionName",
  },
  {
    title: "Số lượng",
    dataIndex: "limitQuantity",
    key: "limitQuantity",
  },
  {
    title: "Giá trị",
    dataIndex: "promotionValue",
    key: "promotionValue",
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
        <Link to={"/admin/promotion/detail"}>
          <EyeOutlined />
        </Link>

        <Link to={"/admin/promotion/update"}>
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
    promotionCode: "promotion_1",
    promotionName: "Black friday",
    limitQuantity: 20,
    promotionValue: 50000,
    startAndEndDate: "2012/20/20 - 2020/20/20",
    status: ["Đang diễn ra"],
  },
  {
    key: "2",
    stt: "2",
    promotionCode: "promotion_2",
    promotionName: "Black friday",
    limitQuantity: 20,
    promotionValue: 50000,
    startAndEndDate: "2012/20/20 - 2020/20/20",
    status: ["Sắp diễn ra"],
  },
  {
    key: "3",
    stt: "3",
    promotionCode: "promotion_3",
    promotionName: "Black friday",
    limitQuantity: 20,
    promotionValue: 50000,
    startAndEndDate: "2012/20/20 - 2020/20/20",
    status: ["Đã kết thúc"],
  },
];

function Promotion() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.promotion}>
      <FilterpromotionAndPromotion />

      <div className={styles.content}>
        <Space style={{ width: "100%" }} direction="vertical" size={16}>
          <Row>
            <Col span={18}>
              <Space size={12} className={styles.color}>
                <i>
                  <UnorderedListOutlined />
                </i>
                <h2>Danh sách Khuyến mại</h2>
              </Space>
            </Col>

            <Col span={6}>
              <Link to="create">
                <Button type="primary" icon={<PlusOutlined />}>
                  Tạo chương trình khuyến mại
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

export default Promotion;
