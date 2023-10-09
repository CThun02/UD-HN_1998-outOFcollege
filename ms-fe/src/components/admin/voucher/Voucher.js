import styles from "./Voucher.module.css";

import {
  Button,
  Col,
  Pagination,
  Row,
  Space,
  Table,
  Tag,
  Spin,
  notification,
  Modal,
} from "antd";
import FilterVoucherAndPromotion from "../../element/filter/FilterVoucherAndPromotion";
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";

import numeral from "numeral";
import axios from "axios";
import moment from "moment";
import { NotificationContext } from "../../element/notification/Notification";
import SockJs from "../../../service/SockJs";

const baseUrl = "http://localhost:8080/api/admin/vouchers/";

const { confirm } = Modal;

function Voucher() {
  // filter
  const [searchNameOrCode, setSearchNameOrCode] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("ALL");

  const [isLoading, setIsLoading] = useState(false);

  //voucher list
  const [vouchers, setVouchers] = useState([]);

  // page and total elements
  const [totalElements, setTotalElements] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  //nofitication
  const [apiNotification, contextHolder] = notification.useNotification();
  const { successMessage, clearNotification, context } =
    useContext(NotificationContext);

  const [reload, setReload] = useState("");

  const calculateStt = (index) => {
    return (pageNo - 1) * pageSize + index + 1;
  };

  function handlePageSize(current, size) {
    setPageNo(current);
    setPageSize(size);
  }

  function handleDelete(value) {
    confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc là hủy voucher này không?",

      onOk() {
        async function changeStatusVoucher() {
          try {
            await axios
              .put(baseUrl + "update/" + value[0])
              .then((res) => {
                apiNotification.success({
                  message: `Success`,
                  description: `Thao tác thành công`,
                });
                setReload(res.data);
              })
              .catch((err) => console.log("Exception: ", err));
          } catch (err) {
            console.log("Error: ", err);
          }
        }
        changeStatusVoucher();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        try {
          const filter = {
            codeOrName: searchNameOrCode,
            startDate:
              searchStartDate !== ""
                ? moment(searchStartDate?.$d, "DD-MM-YYYY").format(
                    "YYYY-MM-DDTHH:mm:ss.SSS"
                  )
                : "",
            endDate:
              searchEndDate !== ""
                ? moment(searchEndDate?.$d, "DD-MM-YYYY").format(
                    "YYYY-MM-DDTHH:mm:ss.SSS"
                  )
                : "",
            status: searchStatus,
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

          console.log("filer: ", filter);
          const data = await res.data;

          setTotalElements(data.totalElements);
          setVouchers(data.content);
        } catch (error) {
          console.error(error.message);
        }
        setIsLoading(false);
      }

      fetchData();
    },
    [
      searchNameOrCode,
      searchStartDate,
      searchEndDate,
      searchStatus,
      pageNo,
      pageSize,
      successMessage,
      clearNotification,
      reload,
    ]
  );

  useEffect(
    function () {
      let isCheck = true;

      async function notification() {
        if (successMessage && isCheck === true && context === "voucher") {
          // Hiển thị thông báo thành công ở đây
          console.log(successMessage);
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
      render: (code) => (
        <Link to={`/admin/vouchers/detail/${code}`}>{code}</Link>
      ),
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
      title: "Đối tượng sử dụng",
      dataIndex: "objectUse",
      key: "objectUse",
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
          <Link to={`/admin/vouchers/detail/${object[0]}`}>
            <Button className={styles.iconButton}>
              <EyeOutlined />
            </Button>
          </Link>
          <Button
            onClick={() => handleDelete(object)}
            className={styles.iconButton}
            disabled={object[1] === "INACTIVE" || object[1] === "CANCEL"}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.voucher}>
      {contextHolder}
      <SockJs setValues={setVouchers} connectTo={"voucher"} />;
      <FilterVoucherAndPromotion
        searchNameOrCode={searchNameOrCode}
        setSearchNameOrCode={setSearchNameOrCode}
        startDate={searchStartDate}
        setStartDate={setSearchStartDate}
        endDate={searchEndDate}
        setEndDate={setSearchEndDate}
        status={searchStatus}
        setStatus={setSearchStatus}
      />
      <div className={styles.content}>
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
              <>
                <Link to="/admin/vouchers/save">
                  <Button type="primary" icon={<PlusOutlined />}>
                    Tạo voucher
                  </Button>
                </Link>
              </>
            </Col>
          </Row>

          <Spin
            tip="Loading..."
            spinning={isLoading}
            size="large"
            style={{ width: "100%" }}
          >
            <>
              <Space style={{ width: "100%" }} direction="vertical" size={12}>
                <Table
                  style={{ width: "100%" }}
                  columns={columns}
                  dataSource={vouchers.map((voucher, index) => ({
                    key: voucher.voucherId,
                    stt: calculateStt(index),
                    voucherCode: voucher.voucherCode,
                    voucherName: voucher.voucherName,
                    limitQuantity: numeral(voucher.limitQuantity).format("0,0"),
                    voucherValue: `${numeral(voucher.voucherValue).format(
                      "0,0"
                    )} ${voucher.voucherMethod === "vnd" ? "VND" : "%"}`,
                    objectUse:
                      voucher.objectUse === "all" ? "Tất cả" : "Thành viên",
                    startAndEndDate: [
                      `${moment(voucher.startDate).format(
                        "HH:mm DD/MM/YYYY"
                      )} - ${moment(voucher.endDate).format(
                        "HH:mm DD/MM/YYYY"
                      )}`,
                      voucher.status === "ACTIVE"
                        ? "Đang diễn ra"
                        : voucher.status === "INACTIVE"
                        ? "Đã kết thúc"
                        : voucher.status === "UPCOMING"
                        ? "Sắp diễn ra"
                        : voucher.status === "CANCEL"
                        ? "Đã hủy"
                        : null,
                    ],
                    action: [voucher.voucherCode, voucher.status],
                  }))}
                  className={styles.table}
                  pagination={false}
                />
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
            </>
          </Spin>
        </Space>
      </div>
    </div>
  );
}

export default Voucher;
