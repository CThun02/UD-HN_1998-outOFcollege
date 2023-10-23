import {
  Button,
  Col,
  Modal,
  Pagination,
  Row,
  Space,
  Spin,
  Table,
  Tag,
  notification,
} from "antd";
import FilterpromotionAndPromotion from "../../element/filter/FilterVoucherAndPromotion";

import styles from "./Promotion.module.css";
import {
  DeleteOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { NotificationContext } from "../../element/notification/Notification";
import numeral from "numeral";
import SockJs from "../../../service/SockJs";

const baseUrl = "http://localhost:8080/api/admin/promotion-product/";
const basePromotionUrl = "http://localhost:8080/api/admin/promotion/";

const { confirm } = Modal;

function Promotion() {
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRender, setIsRender] = useState("");

  //paging
  const [totalElements, setTotalElements] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  //filter
  const [codeOrName, setCodeOrName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(null);

  const { successMessage, clearNotification, context } =
    useContext(NotificationContext);
  const [apiNotification, contextHolder] = notification.useNotification();

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
      render: (code) => <Link to={"/api/admin/promotion/detail"}>{code}</Link>,
    },
    {
      title: "Tên",
      dataIndex: "promotionName",
      key: "promotionName",
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "productQuantity",
      key: "productQuantity",
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
      render: (object) => {
        let color =
          object[1] === "Đang diễn ra"
            ? "geekblue"
            : object[1] === "Sắp diễn ra"
            ? "green"
            : "Đã kết thúc"
            ? "red"
            : null;
        return (
          <Space direction="vertical">
            <div style={{ width: "auto", display: "flex" }}>
              <Tag color={color}>{object[1]}</Tag>
            </div>
            {object[0]}
          </Space>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (object) => (
        <Space size="middle">
          <Link to={`/api/admin/promotion/detail/${object[0]}`}>
            <Button className={styles.iconButton}>
              <EyeOutlined />
            </Button>
          </Link>
          <Button
            className={styles.iconButton}
            disabled={object[1] === "INACTIVE" || object[1] === "CANCEL"}
            onClick={() => handleDeleted(object)}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(
    function () {
      let isCheck = true;

      async function notification() {
        if (successMessage && isCheck === true && context === "promotion") {
          // Hiển thị thông báo thành công ở đây
          apiNotification.success({
            message: `Success`,
            description: `${successMessage}`,
          });
          // Xóa thông báo sau khi đã hiển thị
          clearNotification();
        }
      }

      return () => {
        notification(true);
        isCheck = false;
      };
    },
    [successMessage, clearNotification, apiNotification, context]
  );

  function handleDeleted(value) {
    confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc là hủy chương trình này không?",

      onOk() {
        async function changeStatusPromotion() {
          try {
            await axios
              .get(basePromotionUrl + "update-status/" + value[0])
              .then((res) => {
                apiNotification.success({
                  message: `Success`,
                  description: `Thao tác thành công`,
                });
                setIsRender(res.data);
              })
              .catch((err) => console.log("Exception: ", err));
          } catch (err) {
            console.log("Error: ", err);
          }
        }
        changeStatusPromotion();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
    try {
    } catch (err) {
      console.log("Err");
    }
  }

  function handlePageSize(current, size) {
    setPageNo(current);
    setPageSize(size);
  }

  useEffect(
    function () {
      setIsLoading(true);
      async function getPromotions() {
        try {
          const filter = {
            codeOrName: codeOrName,
            startDate:
              startDate !== null
                ? moment(startDate?.$d, "DD-MM-YYYY").format(
                    "YYYY-MM-DDTHH:mm:ss.SSS"
                  )
                : "",
            endDate:
              endDate !== null
                ? moment(endDate?.$d, "DD-MM-YYYY").format(
                    "YYYY-MM-DDTHH:mm:ss.SSS"
                  )
                : "",
            status: status,
          };

          const res = await axios.post(
            `${
              pageNo !== 1 || pageSize !== 5
                ? baseUrl +
                  "?pageNo=" +
                  (pageNo - 1) +
                  "&" +
                  "pageSize=" +
                  pageSize
                : baseUrl
            }`,
            filter
          );

          const data = res.data;
          setPromotions(data.content);
          setTotalElements(data.totalElements);

          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          setPromotions([]);
          console.log("Error: ", err);
        }
      }

      getPromotions();
    },
    [codeOrName, startDate, endDate, status, pageNo, pageSize, isRender]
  );

  const calculateStt = (index) => {
    return (pageNo - 1) * pageSize + index + 1;
  };

  return (
    <div className={styles.promotion}>
      {contextHolder}
      <FilterpromotionAndPromotion
        searchNameOrCode={codeOrName}
        setSearchNameOrCode={setCodeOrName}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        status={status}
        setStatus={setStatus}
      />
      <SockJs setValues={setPromotions} connectTo="promotion" />
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
                <Button type="primary" icon={<PlusOutlined />} size="large">
                  Tạo chương trình khuyến mại
                </Button>
              </Link>
            </Col>
          </Row>

          <Spin
            tip="Loading..."
            spinning={isLoading}
            size="large"
            style={{ width: "100%" }}
          >
            <Table
              columns={columns}
              dataSource={promotions.map((promotion, index) => ({
                key: promotion.promotionCode,
                stt: calculateStt(index),
                promotionCode: promotion.promotionCode,
                promotionName: promotion.promotionName,
                productQuantity: numeral(promotion.productQuantity).format(
                  "0,0"
                ),
                promotionValue: `${numeral(promotion.promotionValue).format(
                  "0,0"
                )} ${promotion.promotionMethod === "vnd" ? "VND" : "%"}`,
                startAndEndDate: [
                  `${moment(promotion.startDate).format(
                    "HH:mm DD/MM/YYYY"
                  )} - ${moment(promotion.endDate).format("HH:mm DD/MM/YYYY")}`,
                  promotion.status === "ACTIVE"
                    ? "Đang diễn ra"
                    : promotion.status === "INACTIVE"
                    ? "Đã kết thúc"
                    : promotion.status === "UPCOMING"
                    ? "Sắp diễn ra"
                    : promotion.status === "CANCEL"
                    ? "Đã hủy"
                    : null,
                ],
                action: [promotion.promotionCode, promotion.status],
              }))}
              className={styles.table}
              pagination={false}
            />
          </Spin>
          <Pagination
            defaultCurrent={pageNo}
            total={totalElements}
            showSizeChanger={true}
            pageSize={pageSize}
            pageSizeOptions={["5", "10", "20", "50", "100"]}
            onShowSizeChange={handlePageSize}
            onChange={(page) => setPageNo(page)}
          />
        </Space>
      </div>
    </div>
  );
}

export default Promotion;
