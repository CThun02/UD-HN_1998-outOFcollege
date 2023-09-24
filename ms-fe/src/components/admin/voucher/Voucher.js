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
  message,
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
import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import numeral from "numeral";
import axios from "axios";
import moment from "moment";
import * as Yup from "yup";

import FloatingLabels from "../../element/FloatingLabels/FloatingLabels";
import { ValidNotBlank, ValidStartDateAndEndDate } from "./ValidationVoucher";

dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY";

const baseUrl = "http://localhost:8080/admin/api/voucher/";

const Context = React.createContext({ name: "Default" });

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

  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
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
  const [vouchers, setVouchers] = useState([]);
  const [totalElements, setTotalElements] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  //nofitication
  const [api, nofiticationContextHolder] = notification.useNotification();

  //error
  const [error, setError] = useState({});
  const [isCheckSubmit, setIsCheckSubmit] = useState(false);

  const calculateStt = (index) => {
    return (pageNo - 1) * pageSize + index + 1;
  };

  function handlePageSize(current, size) {
    setPageNo(current);
    setPageSize(size);
  }

  const onChangevoucherMethod = ({ target: { value } }) => {
    console.log("voucher method checked", value);
    setVoucherValue("");
    setVoucherMethod(value);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setIsUpdate(false);
    setIsCheckSubmit(false);

    setVoucherId("");
    setVoucherCode("");
    setVoucherName("");
    setLimitQuantity("");
    setVoucherValue("");
    setVoucherValueMax("");
    setVoucherCondition("");
    setStartDate("");
    setEndDate("");
    setVoucherMethod("vnd");
  };

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

  function handleChangeDate(date, dateString) {
    if (
      moment(startDate.$d).format("DD-MM-YYYY") >
      moment(endDate.$d).format("DD-MM-YYYY")
    ) {
      setError({ ...error, endDate: { status: true } });
    }
    return date;
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
      open,
      status,
    ]
  );

  let isCheckNotEmpty = null;
  let isCheckStartDateAndEndDate = null;

  function handleOnSubmit(placement) {
    setIsCheckSubmit(true);

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
            setOpen(false);
            setIsCheckSubmit(false);

            api.success({
              message: `Thêm thành công.`,
              description: (
                <Context.Consumer>
                  {() => `Sản phẩm đã được thêm`}
                </Context.Consumer>
              ),
              placement,
            });

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
            api.error({
              message: `Cố lỗi xảy ra.`,
              description: (
                <Context.Consumer>
                  {() => err.response.data.message}
                </Context.Consumer>
              ),
              placement,
            });
            const errors = err.response.data;
            setError({ ...error, voucher: errors });
            console.log("Error: ", err.response.data);
          });
      } catch (err) {
        console.log("errorCatch: ", err.response.data);
      }
    } else {
      api.error({
        message: `Cố lỗi xảy ra.`,
        description: (
          <Context.Consumer>
            {() =>
              `${isCheckNotEmpty?.status ? "" : isCheckNotEmpty?.message} 
              ${
                isCheckStartDateAndEndDate?.status
                  ? ""
                  : isCheckStartDateAndEndDate?.message
              } `
            }
          </Context.Consumer>
        ),
        placement,
      });
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

      setIsUpdate(true);
      setOpen(true);
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
                <Button
                  type="primary"
                  onClick={showDrawer}
                  icon={<PlusOutlined />}
                >
                  Tạo voucher
                </Button>
                <Drawer
                  title={`${isUpdate ? "Cập nhập voucher" : "Tạo voucher"}`}
                  width={720}
                  onClose={onClose}
                  open={open}
                  bodyStyle={{ paddingBottom: 80 }}
                >
                  <Context.Provider value={{ name: "xin chao" }}>
                    {nofiticationContextHolder}
                    <Form layout="vertical">
                      <Input style={{ display: "none" }} value={voucherId} />
                      <Input style={{ display: "none" }} value={voucherCode} />

                      <Space
                        style={{ width: "100%" }}
                        size={8}
                        direction="vertical"
                      >
                        <Row gutter={16}>
                          <Col span={24}>
                            <FloatingLabels
                              label="Tên voucher"
                              name="voucherName"
                              value={voucherName}
                              zIndex={true}
                            >
                              <Input
                                size="large"
                                name="voucherName"
                                allowClear
                                value={voucherName}
                                onChange={(e) =>
                                  handleCheckNameVoucher(e.target.value)
                                }
                                status={
                                  !isCheckSubmit
                                    ? ""
                                    : voucherName === "" ||
                                      error?.voucher?.voucherName === "error"
                                    ? "error"
                                    : ""
                                }
                              />
                            </FloatingLabels>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={5}>
                            <Radio.Group
                              style={{ width: "100%" }}
                              size="large"
                              options={options}
                              onChange={onChangevoucherMethod}
                              value={voucherMethod}
                              optionType="button"
                            />
                          </Col>
                          {voucherMethod === "vnd" ? (
                            <Col span={19}>
                              <FloatingLabels
                                label="Giá trị voucher"
                                name="voucherValue"
                                value={voucherValue}
                                zIndex={true}
                              >
                                <Input
                                  size="large"
                                  suffix={"VND"}
                                  allowClear
                                  value={
                                    voucherValue === ""
                                      ? ""
                                      : numeral(voucherValue).format("0,0")
                                  }
                                  onChange={(e) =>
                                    setVoucherValue(e.target.value)
                                  }
                                  status={
                                    !isCheckSubmit
                                      ? ""
                                      : voucherValue === "" ||
                                        error?.voucher?.voucherValue === "error"
                                      ? "error"
                                      : ""
                                  }
                                />
                              </FloatingLabels>
                            </Col>
                          ) : (
                            <>
                              <Col span={7}>
                                <FloatingLabels
                                  label="Giá trị voucher"
                                  name="voucherValue"
                                  value={voucherValue}
                                  zIndex={true}
                                >
                                  <Input
                                    size="large"
                                    suffix={"%"}
                                    allowClear
                                    value={
                                      voucherValue === ""
                                        ? ""
                                        : numeral(voucherValue).format("0,0")
                                    }
                                    onChange={(e) =>
                                      setVoucherValue(e.target.value)
                                    }
                                    status={
                                      !isCheckSubmit
                                        ? ""
                                        : voucherValue === "" ||
                                          error?.response?.data
                                            ?.voucherValue === "error"
                                        ? "error"
                                        : ""
                                    }
                                  />
                                </FloatingLabels>
                              </Col>

                              <Col span={12}>
                                <FloatingLabels
                                  label="Giá trị voucher tối đa"
                                  name="voucherValueMax"
                                  value={voucherValueMax}
                                  zIndex={true}
                                >
                                  <Input
                                    size="large"
                                    suffix={"VND"}
                                    allowClear
                                    value={
                                      voucherValueMax === ""
                                        ? ""
                                        : numeral(voucherValueMax).format("0,0")
                                    }
                                    onChange={(e) =>
                                      setVoucherValueMax(e.target.value)
                                    }
                                    status={
                                      !isCheckSubmit
                                        ? ""
                                        : voucherValueMax === "" ||
                                          error?.response?.data
                                            ?.voucherValueMax === "error"
                                        ? "error"
                                        : ""
                                    }
                                  />
                                </FloatingLabels>
                              </Col>
                            </>
                          )}
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <FloatingLabels
                              label="Số lượng"
                              name="limitQuantity"
                              value={limitQuantity}
                              zIndex={true}
                            >
                              <Input
                                size="large"
                                allowClear
                                value={
                                  limitQuantity === ""
                                    ? ""
                                    : numeral(limitQuantity).format("0,0")
                                }
                                onChange={(e) =>
                                  setLimitQuantity(e.target.value)
                                }
                                status={
                                  !isCheckSubmit
                                    ? ""
                                    : limitQuantity === "" ||
                                      error?.voucher?.limitQuantity === "error"
                                    ? "error"
                                    : ""
                                }
                              />
                            </FloatingLabels>
                          </Col>

                          <Col span={12}>
                            <FloatingLabels
                              label="Điều kiện áp dụng"
                              name="voucherCondition"
                              value={voucherCondition}
                              zIndex={true}
                            >
                              <Input
                                size="large"
                                suffix={"VND"}
                                allowClear
                                value={
                                  voucherCondition === ""
                                    ? ""
                                    : numeral(voucherCondition).format("0,0")
                                }
                                onChange={(e) =>
                                  setVoucherCondition(e.target.value)
                                }
                                status={
                                  !isCheckSubmit
                                    ? ""
                                    : voucherCondition === "" ||
                                      error?.response?.data
                                        ?.voucherCondition === "error"
                                    ? "error"
                                    : ""
                                }
                              />
                            </FloatingLabels>
                          </Col>
                        </Row>

                        <Row gutter={16}>
                          <Col span={12}>
                            <FloatingLabels
                              label="Ngày bắt đầu"
                              name="startDate"
                              value={startDate}
                            >
                              <DatePicker
                                disabledDate={disabledDate}
                                format={dateFormat}
                                size="large"
                                placeholder={null}
                                style={{ width: "100%" }}
                                value={startDate}
                                onChange={(date, dateString) =>
                                  setStartDate(
                                    handleChangeDate(date, dateString)
                                  )
                                }
                                status={
                                  !isCheckSubmit
                                    ? ""
                                    : startDate === "" ||
                                      error?.voucher?.startDate === "error"
                                    ? "error"
                                    : ""
                                }
                              />
                            </FloatingLabels>
                          </Col>

                          <Col span={12}>
                            <FloatingLabels
                              label="Ngày kết thúc"
                              name="endDate"
                              value={endDate}
                            >
                              <DatePicker
                                disabledDate={disabledDate}
                                format={dateFormat}
                                size="large"
                                placeholder={null}
                                style={{ width: "100%" }}
                                value={endDate}
                                onChange={(date, dateString) =>
                                  setEndDate(handleChangeDate(date, dateString))
                                }
                                status={
                                  !isCheckSubmit
                                    ? ""
                                    : endDate === "" ||
                                      error?.endDate?.status ||
                                      error?.voucher?.endDate === "error"
                                    ? ""
                                    : "error"
                                }
                              />
                            </FloatingLabels>
                          </Col>
                        </Row>

                        <Row
                          gutter={16}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Space>
                            <Button onClick={onClose}>Hủy</Button>
                            <Button
                              type="primary"
                              htmlType="submit"
                              onClick={() => handleOnSubmit("topRight")}
                            >
                              Xác nhận
                            </Button>
                          </Space>
                        </Row>
                      </Space>
                    </Form>
                  </Context.Provider>
                </Drawer>
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
