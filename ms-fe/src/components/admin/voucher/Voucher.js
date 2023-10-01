import styles from "./Voucher.module.css";

import {
  Button,
  Col,
  Pagination,
  Row,
  Space,
  Table,
  Tag,
  Form,
  Input,
  Drawer,
  DatePicker,
  Radio,
  Spin,
  notification,
} from "antd";
import FilterVoucherAndPromotion from "../../element/filter/FilterVoucherAndPromotion";
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import numeral from "numeral";
import axios from "axios";
import moment from "moment";

import FloatingLabels from "../../element/FloatingLabels/FloatingLabels";
import { ValidNotBlank, ValidStartDateAndEndDate } from "./ValidationVoucher";
import { NotificationContext } from "../../element/notification/Notification";

dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY";

const baseUrl = "http://localhost:8080/admin/api/voucher/";

const options = [
  { label: "VND", value: "vnd" },
  { label: "%", value: "%" },
];

function disabledDate(current) {
  return (
    current &&
    current <
      dayjs(
        moment(new Date().toLocaleDateString()).format(dateFormat),
        dateFormat
      )
  );
}

function Voucher() {
  // filter
  const [searchNameOrCode, setSearchNameOrCode] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("ALL");

  const [isLoading, setIsLoading] = useState(false);

  const [voucherId, setVoucherId] = useState("");
  const [voucherName, setVoucherName] = useState("");
  const [voucherNameCurrent, setVoucherNameCurrent] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [limitQuantity, setLimitQuantity] = useState("");
  const [voucherValue, setVoucherValue] = useState("");
  const [voucherValueMax, setVoucherValueMax] = useState("");
  const [voucherCondition, setVoucherCondition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [voucherMethod, setVoucherMethod] = useState("vnd");

  //voucher list
  const [vouchers, setVouchers] = useState([]);

  // page and total elements
  const [totalElements, setTotalElements] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  //nofitication
  const [apiNotification, contextHolder] = notification.useNotification();
  const { successMessage, clearNotification } = useContext(NotificationContext);
  //error
  const [error, setError] = useState({});

  const calculateStt = (index) => {
    return (pageNo - 1) * pageSize + index + 1;
  };

  function handlePageSize(current, size) {
    setPageNo(current);
    setPageSize(size);
  }

  function handleDelete(value) {
    try {
      axios
        .put(baseUrl + "update/" + value.code)
        .then((res) => {
          console.log(res.data);
          setStatus(res.data.voucherCode);
        })
        .catch((err) => console.log("Exception: ", err));
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  function handleCheckNameVoucher(value) {
    if (voucherId === "") {
      setVoucherName(value);
    } else {
      setVoucherNameCurrent(value);
    }
  }

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        try {
          const filter = {
            voucherCodeOrName: searchNameOrCode,
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
      status,
      successMessage,
      clearNotification,
    ]
  );

  useEffect(
    function () {
      let isCheck = true;

      async function notification() {
        if (successMessage && isCheck === true) {
          // Hiển thị thông báo thành công ở đây
          console.log(successMessage);
          apiNotification.success({
            message: `Thêm thành công. `,
            description: "Voucher đã được thêm",
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
    [successMessage, clearNotification, apiNotification]
  );

  let isCheckNotEmpty = null;
  let isCheckStartDateAndEndDate = null;

  function handleOnSubmit(placement) {
    const voucher = {
      voucherId: voucherId === "" ? "" : voucherId,
      voucherName,
      voucherNameCurrent,
      voucherCode: voucherCode === "" ? "" : voucherCode,
      limitQuantity: isNaN(limitQuantity)
        ? Number.parseInt(limitQuantity?.replace(/,/g, ""))
        : limitQuantity,
      voucherValue: isNaN(voucherValue)
        ? Number.parseInt(voucherValue?.replace(/,/g, ""))
        : voucherValue,
      voucherValueMax: isNaN(voucherValueMax)
        ? Number.parseInt(voucherValueMax?.replace(/,/g, ""))
        : voucherValueMax,
      voucherCondition: isNaN(voucherCondition)
        ? Number.parseInt(voucherCondition?.replace(/,/g, ""))
        : voucherCondition,
      voucherMethod,
      startDate: moment(startDate?.$d, "DD-MM-YYYY").format(
        "YYYY-MM-DDTHH:mm:ss.SSS"
      ),
      endDate: moment(endDate?.$d, "DD-MM-YYYY").format(
        "YYYY-MM-DDTHH:mm:ss.SSS"
      ),
      status,
    };

    console.log("voucher: ", voucher);

    isCheckNotEmpty = ValidNotBlank(voucher);
    isCheckStartDateAndEndDate = ValidStartDateAndEndDate(startDate, endDate);

    console.log("isCheckNotEmpty: ", isCheckNotEmpty);
    console.log("isCheckStartDateAndEndDate: ", isCheckStartDateAndEndDate);

    if (isCheckNotEmpty?.status && isCheckStartDateAndEndDate?.status) {
      try {
        axios
          .post(baseUrl + "add", voucher)
          .then((res) => {
            setVoucherCode("");
            setVoucherName("");
            setLimitQuantity("");
            setVoucherValue("");
            setVoucherValueMax("");
            setVoucherCondition("");
            setVoucherMethod("vnd");
            setStartDate("");
            setEndDate("");
            setStatus("");
          })
          .catch((err) => {
            const errors = err.response.data;
            setError({ ...error, voucher: errors });
            console.log("Error: ", err.response.data);
          });
      } catch (err) {
        console.log("errorCatch: ", err.response.data);
      }
    } else {
      setError({
        empty: isCheckNotEmpty,
        startDate: isCheckStartDateAndEndDate,
        endDate: isCheckStartDateAndEndDate,
      });
    }
  }

  function handleDetailVoucher(value) {
    console.log("code: ", baseUrl + value.code);
    axios.get(baseUrl + value.code).then((res) => {
      const {
        voucherId,
        voucherCode,
        voucherName,
        limitQuantity,
        voucherValue,
        voucherValueMax,
        voucherCondition,
        startDate,
        endDate,
        voucherMethod,
        status,
      } = res.data;

      console.log("handleDetail: ", res.data);

      setVoucherId(voucherId);
      setVoucherCode(voucherCode);
      setVoucherName(voucherName);
      setVoucherNameCurrent(voucherName);
      setLimitQuantity(limitQuantity);
      setVoucherValue(voucherValue);
      setVoucherValueMax(voucherValueMax === null ? "" : voucherValueMax);
      setVoucherCondition(voucherCondition);
      setStartDate(dayjs(moment(startDate).format(dateFormat), dateFormat));
      setEndDate(dayjs(moment(endDate).format(dateFormat), dateFormat));
      setVoucherMethod(voucherMethod);
      setStatus(status);
    });
  }

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
        <Link onClick={() => handleDetailVoucher({ code })}>{code}</Link>
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
      title: "Thời gian",
      dataIndex: "startAndEndDate",
      key: "startAndEndDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "Đang diễn ra"
            ? "geekblue"
            : status === "Sắp diễn ra"
            ? "green"
            : "Đã kết thúc"
            ? "red"
            : null;
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (code) => (
        <Space size="middle">
          <Button
            className={styles.iconButton}
            onClick={() => handleDetailVoucher({ code })}
          >
            <EyeOutlined />
          </Button>
          <Button
            onClick={() => handleDelete({ code })}
            className={styles.iconButton}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.voucher}>
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
        {contextHolder}

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
                    startAndEndDate: `${moment(voucher.startDate).format(
                      "DD/MM/YYYY"
                    )} - ${moment(voucher.endDate).format("DD/MM/YYYY")}`,
                    status:
                      voucher.status === "ACTIVE"
                        ? "Đang diễn ra"
                        : voucher.status === "INACTIVE"
                        ? "Đã kết thúc"
                        : voucher.status === "UPCOMING"
                        ? "Sắp diễn ra"
                        : null,
                    action: voucher.voucherCode,
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
