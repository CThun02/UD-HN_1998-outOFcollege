import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
  notification,
} from "antd";
import styles from "./SaveVoucher.module.css";
import { EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import FloatingLabels from "../../element/FloatingLabels/FloatingLabels";
import moment from "moment";
import { Formik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import numeral from "numeral";
import { useNavigate, useParams } from "react-router-dom";
import { NotificationContext } from "../../element/notification/Notification";
import axios from "axios";

const options = [
  { label: "VND", value: "vnd" },
  { label: "%", value: "%" },
];

const optionsobjectUse = [
  { label: "Tất cả", value: "all" },
  { label: "Thành viên", value: "member" },
];

const validationSchema = Yup.object().shape({
  voucherName: Yup.string()
    .required("* Tên voucher không được bỏ trống.")
    .matches(/^[a-zA-Z0-9 ]+$/, "* Tên voucher không được chứa kí tự đặc biệt"),
  voucherMethod: Yup.string(),
  voucherValue: Yup.string()
    .required("* Giá trị giảm không được bỏ trống")
    .matches(/^[0-9,]+$/, "Sai định dạng"),
  voucherValueMax: Yup.string().when(
    "voucherMethod",
    (voucherMethod, schema) => {
      if (voucherMethod && voucherMethod[0] === "%") {
        return schema.required("* Giá trị giảm tối đa không được bỏ trống");
      }
      return schema;
    }
  ),
  limitQuantity: Yup.string()
    .required("* Số lượng giới hạn không được bỏ trống")
    .matches(/^[0-9,]+$/, "Sai định dạng"),
  voucherCondition: Yup.string()
    .required("* Điều kiện giảm là bắt buộc")
    .matches(/^[0-9,]+$/, "Sai định dạng"),
  startDate: Yup.date()
    .required("* Ngày bắt đầu không được bỏ trống")
    .test(
      "start-date-current",
      "* Ngày bắt đầu phải lớn hơn ngày hiện tại",
      function (startDate) {
        const currentDate = new Date();
        if (startDate) {
          return startDate > currentDate;
        }
        return true;
      }
    ),
  endDate: Yup.date()
    .required("* Ngày kết thúc không được bỏ trống")
    .test(
      "end-date",
      "* Ngày kết thúc phải lớn hơn ngày bắt đầu",
      function (endDate) {
        const { startDate } = this.parent;
        if (startDate && endDate) {
          return (
            moment(endDate).format(dateFormat) >
            moment(startDate).format(dateFormat)
          );
        }
        return true;
      }
    )
    .test(
      "end-date-current",
      "* Ngày kết thúc phải lớn hơn ngày hiện tại",
      function (endDate) {
        const currentDate = new Date();
        if (endDate) {
          return endDate > currentDate;
        }
        return true;
      }
    ),
});

//date
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";

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

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Họ và tên",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
];

const data = [
  {
    key: "1",
    stt: "1",
    username: "tuanpaph26902",
    fullName: "Phạm Anh Tuấn",
    gender: "Nam",
    email: "tuanpaph26902@fpt.edu.vn",
    phoneNumber: "0123456789",
  },
  {
    key: "2",
    stt: "2",
    username: "kienptph26901",
    fullName: "Phạm Trung Kiên",
    gender: "Nam",
    email: "kienptph26901@fpt.edu.vn",
    phoneNumber: "0123456789",
  },
];

const { confirm } = Modal;

const baseUrl = "http://localhost:8080/admin/api/voucher/";

function SaveVoucher() {
  const ref = useRef();
  const navigate = useNavigate();
  const { showSuccessNotification } = useContext(NotificationContext);
  const [apiNotification, contextProviderNotification] =
    notification.useNotification();
  const [errorsServer, setErrorsServer] = useState({});
  const { code } = useParams();

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("row: ", selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  function handleChangeNumber(value) {
    const formattedValue = numeral(value).format("0,0");
    if (formattedValue === "0") return "";
    else return formattedValue;
  }

  const handleOnSubmit = (values, actions) => {
    confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc là muốn lưu thay đổi không?",

      onOk() {
        async function saveVoucher() {
          const voucher = ref.current?.values;
          if (voucher) {
            await axios
              .post(baseUrl + "add", {
                ...voucher,
                startDate: moment(voucher?.startDate.$d).format(
                  "YYYY-MM-DDTHH:mm:ss.SSS"
                ),
                endDate: moment(voucher?.endDate.$d).format(
                  "YYYY-MM-DDTHH:mm:ss.SSS"
                ),
                limitQuantity: isNaN(voucher?.limitQuantity)
                  ? Number.parseInt(voucher?.limitQuantity?.replace(/,/g, ""))
                  : voucher?.limitQuantity,
                voucherValue: isNaN(voucher?.voucherValue)
                  ? Number.parseInt(voucher?.voucherValue?.replace(/,/g, ""))
                  : voucher?.voucherValue,
                voucherValueMax: isNaN(voucher?.voucherValueMax)
                  ? Number.parseInt(voucher?.voucherValueMax?.replace(/,/g, ""))
                  : voucher?.voucherValueMax,
                voucherCondition: isNaN(voucher?.voucherCondition)
                  ? Number.parseInt(
                      voucher?.voucherCondition?.replace(/,/g, "")
                    )
                  : voucher?.voucherCondition,
                voucherId: voucher?.voucherId ? voucher?.voucherId : "",
                voucherCode: voucher?.voucherCode ? voucher?.voucherCode : "",
                voucherCurrentName: voucher?.voucherCurrentName,
              })
              .then(() => {
                navigate("/admin/vouchers");
                showSuccessNotification("Thêm voucher thành công");
              })
              .catch((err) => {
                const error = err.response.data;
                setErrorsServer(error);
                apiNotification.error({
                  message: `Lỗi`,
                  description: `${err.response.data.message}`,
                });
              });
          } else {
            apiNotification.error({
              message: `Lỗi`,
            });
          }
        }

        saveVoucher();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  useEffect(
    function () {
      console.log("code: ", baseUrl + code);
      if (code) {
        async function getVoucher() {
          await axios.get(baseUrl + code).then((res) => {
            const {
              voucherId,
              voucherCode,
              voucherName,
              voucherMethod,
              voucherValue,
              voucherValueMax,
              limitQuantity,
              voucherCondition,
              startDate,
              endDate,
              status,
            } = res.data;

            console.log(
              "startDate: ",
              dayjs(moment(startDate).format(dateFormat), dateFormat)
            );
            console.log(
              "endDate: ",
              dayjs(moment(endDate).format(dateFormat), dateFormat)
            );

            ref.current.setFieldValue("voucherId", voucherId);
            ref.current.setFieldValue("voucherCode", voucherCode);
            ref.current.setFieldValue("voucherName", voucherName);
            ref.current.setFieldValue("voucherNameCurrent", voucherName);
            ref.current.setFieldValue("voucherMethod", voucherMethod);
            ref.current.setFieldValue(
              "voucherValue",
              handleChangeNumber(voucherValue)
            );
            ref.current.setFieldValue(
              "voucherValueMax",
              handleChangeNumber(voucherValueMax)
            );
            ref.current.setFieldValue(
              "limitQuantity",
              handleChangeNumber(limitQuantity)
            );
            ref.current.setFieldValue(
              "voucherCondition",
              handleChangeNumber(voucherCondition)
            );
            ref.current.setFieldValue(
              "startDate",
              dayjs(moment(startDate).format(dateFormat), dateFormat)
            );
            ref.current.setFieldValue(
              "endDate",
              dayjs(moment(endDate).format(dateFormat), dateFormat)
            );
            ref.current.setFieldValue("status", status);
          });
        }

        getVoucher();
      }
    },
    [code]
  );

  const isCheck =
    ref.current?.values.status === "" ||
    ref.current?.values.status === "UPCOMING"
      ? false
      : ref.current?.values.status === "ACTIVE" ||
        ref.current?.values.status === "INACTIVE"
      ? true
      : true;

  return (
    <div className={styles.saveVoucher}>
      <div className={styles.content}>
        {contextProviderNotification}
        <Space style={{ width: "100%" }} direction="vertical" size={30}>
          <Space size={16} className={styles.color}>
            <i>
              <EditOutlined />
            </i>
            <h2>Tạo Voucher</h2>
          </Space>

          <Row>
            <Formik
              initialValues={{
                voucherId: "",
                voucherCode: "",
                voucherName: "",
                voucherCurrentName: "",
                voucherMethod: "vnd",
                voucherValue: "",
                voucherValueMax: "",
                limitQuantity: "",
                voucherCondition: "",
                startDate: "",
                endDate: "",
                objectUse: "all",
                status: "",
              }}
              onSubmit={handleOnSubmit}
              validationSchema={validationSchema}
              innerRef={ref}
            >
              {({
                handleBlur,
                handleSubmit,
                handleChange,
                setFieldValue,
                values,
                errors,
                touched,
              }) => (
                <>
                  <Col span={3}></Col>

                  <Col span={18}>
                    <Form onFinish={handleSubmit}>
                      <Input
                        style={{ display: "none" }}
                        name="voucherId"
                        value={values.voucherId}
                        onChange={handleChange}
                      />
                      <Input
                        style={{ display: "none" }}
                        name="voucherCode"
                        value={values.voucherCode}
                        onChange={handleChange}
                      />

                      <Space
                        style={{ width: "100%" }}
                        size={20}
                        direction="vertical"
                      >
                        <Row gutter={16}>
                          <Col span={24}>
                            {code ? (
                              <FloatingLabels
                                label="Tên voucher"
                                name="voucherNameCurrent"
                                value={values.voucherNameCurrent}
                                zIndex={true}
                              >
                                <Input
                                  size="large"
                                  name="voucherNameCurrent"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "voucherNameCurrent",
                                      e.target.value
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  value={values.voucherNameCurrent}
                                  allowClear
                                  status={
                                    (touched.voucherNameCurrent &&
                                      errors.voucherNameCurrent) ||
                                    errorsServer?.voucherNameCurrent
                                      ? "error"
                                      : "success"
                                  }
                                />
                                {touched.voucherNameCurrent && (
                                  <div className={styles.errors}>
                                    {errors.voucherNameCurrent}
                                    {errorsServer.voucherNameCurrent}
                                  </div>
                                )}
                              </FloatingLabels>
                            ) : (
                              <FloatingLabels
                                label="Tên voucher"
                                name="voucherName"
                                value={values.voucherName}
                                zIndex={true}
                              >
                                <Input
                                  size="large"
                                  name="voucherName"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "voucherName",
                                      e.target.value
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  value={values.voucherName}
                                  allowClear
                                  status={
                                    (touched.voucherName &&
                                      errors.voucherName) ||
                                    errorsServer?.voucherName
                                      ? "error"
                                      : "success"
                                  }
                                />
                                {touched.voucherName && (
                                  <div className={styles.errors}>
                                    {errors.voucherName}
                                    {errorsServer.voucherName}
                                  </div>
                                )}
                              </FloatingLabels>
                            )}
                          </Col>
                        </Row>

                        <Row gutter={16}>
                          <Col span={4}>
                            <Radio.Group
                              name="voucherMethod"
                              className={styles.label}
                              style={{ width: "100%" }}
                              size="large"
                              options={options}
                              onChange={(v) => {
                                setFieldValue("voucherMethod", v.target.value);
                              }}
                              value={values.voucherMethod}
                              optionType="button"
                            />
                          </Col>
                          {values.voucherMethod === "vnd" ? (
                            <Col span={20}>
                              <FloatingLabels
                                label="Giá trị giảm"
                                name="voucherValue"
                                value={values.voucherValue}
                                zIndex={true}
                              >
                                <Input
                                  name="voucherValue"
                                  size="large"
                                  suffix={"VND"}
                                  allowClear
                                  onChange={(e) =>
                                    setFieldValue(
                                      "voucherValue",
                                      handleChangeNumber(e.target.value)
                                    )
                                  }
                                  onBlur={handleBlur}
                                  value={values.voucherValue}
                                  status={
                                    (touched.voucherValue &&
                                      errors.voucherValue) ||
                                    errorsServer?.voucherValue
                                      ? "error"
                                      : ""
                                  }
                                />
                              </FloatingLabels>
                              {touched.voucherValue && (
                                <div className={styles.errors}>
                                  {errors.voucherValue}
                                  {errorsServer?.voucherValue}
                                </div>
                              )}
                            </Col>
                          ) : (
                            <>
                              <Col span={8}>
                                <FloatingLabels
                                  label="Giá trị giảm"
                                  name="voucherValue"
                                  value={values.voucherValue}
                                  zIndex={true}
                                >
                                  <Input
                                    name="voucherValue"
                                    size="large"
                                    suffix={"%"}
                                    value={values.voucherValue}
                                    onChange={(e) =>
                                      setFieldValue(
                                        "voucherValue",
                                        handleChangeNumber(e.target.value)
                                      )
                                    }
                                    onBlur={handleBlur}
                                    allowClear
                                    status={
                                      (touched.voucherValue &&
                                        errors.voucherValue) ||
                                      errorsServer.voucherValue
                                        ? "error"
                                        : ""
                                    }
                                  />
                                </FloatingLabels>
                                {touched.voucherValue && (
                                  <div className={styles.errors}>
                                    {errors.voucherValue}
                                    {errorsServer.voucherValue}
                                  </div>
                                )}
                              </Col>

                              <Col span={12}>
                                <FloatingLabels
                                  label="Giá trị giảm tối đa"
                                  name="voucherValueMax"
                                  value={values.voucherValueMax}
                                  zIndex={true}
                                >
                                  <Input
                                    name="voucherVoucherMax"
                                    size="large"
                                    suffix={"VND"}
                                    value={values.voucherValueMax}
                                    onChange={(e) =>
                                      setFieldValue(
                                        "voucherValueMax",
                                        handleChangeNumber(e.target.value)
                                      )
                                    }
                                    onBlur={handleBlur}
                                    allowClear
                                    status={
                                      (touched?.voucherValueMax &&
                                        errors.voucherValueMax) ||
                                      errorsServer.voucherValueMax
                                        ? "error"
                                        : ""
                                    }
                                  />
                                </FloatingLabels>
                                {/* {touched?.voucherValueMax(
                                  <div className={styles.errors}>
                                    {errors.voucherValueMax}
                                    {errorsServer.voucherValueMax}
                                  </div>
                                )} */}
                              </Col>
                            </>
                          )}
                        </Row>

                        <Row gutter={16}>
                          <Col span={12}>
                            <FloatingLabels
                              label="Số lượng giới hạn"
                              name="limitQuantity"
                              value={values.limitQuantity}
                              zIndex={true}
                            >
                              <Input
                                name="limitQuantity"
                                size="large"
                                allowClear
                                value={values.limitQuantity}
                                onChange={(e) =>
                                  setFieldValue(
                                    "limitQuantity",
                                    handleChangeNumber(e.target.value)
                                  )
                                }
                                onBlur={handleBlur}
                                status={
                                  (touched.limitQuantity &&
                                    errors.limitQuantity) ||
                                  errorsServer.limitQuantity
                                    ? "error"
                                    : ""
                                }
                              />
                            </FloatingLabels>
                            {touched.limitQuantity && (
                              <div className={styles.errors}>
                                {errors.limitQuantity}
                                {errorsServer.limitQuantity}
                              </div>
                            )}
                          </Col>

                          <Col span={12}>
                            <FloatingLabels
                              label="Đơn hàng tối thiểu"
                              name="voucherCondition"
                              value={values.voucherCondition}
                              zIndex={true}
                            >
                              <Input
                                name="voucherCondition"
                                size="large"
                                suffix={"VND"}
                                allowClear
                                value={values.voucherCondition}
                                onChange={(e) =>
                                  setFieldValue(
                                    "voucherCondition",
                                    handleChangeNumber(e.target.value)
                                  )
                                }
                                onBlur={handleBlur}
                                status={
                                  (touched.voucherCondition &&
                                    errors.voucherCondition) ||
                                  errorsServer.voucherCondition
                                    ? "error"
                                    : ""
                                }
                              />
                            </FloatingLabels>
                            {touched.voucherCondition && (
                              <div className={styles.errors}>
                                {errors.voucherCondition}
                                {errorsServer.voucherCondition}
                              </div>
                            )}
                          </Col>
                        </Row>

                        <Row gutter={16}>
                          <Col span={12}>
                            <FloatingLabels
                              label="Ngày bắt đầu"
                              name="endDate"
                              value={values.startDate}
                            >
                              <DatePicker
                                name="startDate"
                                disabledDate={disabledDate}
                                format={dateFormat}
                                size="large"
                                placeholder={null}
                                style={{ width: "100%" }}
                                value={values.startDate}
                                onChange={(e) => setFieldValue("startDate", e)}
                                onBlur={handleBlur}
                                status={
                                  (touched.startDate && errors.startDate) ||
                                  errorsServer.startDate
                                    ? "error"
                                    : ""
                                }
                              />
                            </FloatingLabels>
                            {touched.startDate && (
                              <div className={styles.errors}>
                                {errors.startDate} {errorsServer.startDate}
                              </div>
                            )}
                          </Col>

                          <Col span={12}>
                            <FloatingLabels
                              label="Ngày kết thúc"
                              name="endDate"
                              value={values.endDate}
                            >
                              <DatePicker
                                name="endDate"
                                disabledDate={disabledDate}
                                format={dateFormat}
                                size="large"
                                placeholder={null}
                                style={{ width: "100%" }}
                                value={values.endDate}
                                onChange={(e) => {
                                  setFieldValue("endDate", e);
                                }}
                                onBlur={handleBlur}
                                status={
                                  (touched.endDate && errors.endDate) ||
                                  errorsServer.endDate
                                    ? "error"
                                    : ""
                                }
                              />
                            </FloatingLabels>
                            {touched.endDate && (
                              <div className={styles.errors}>
                                {errors.endDate} {errorsServer.endDate}
                              </div>
                            )}
                          </Col>
                        </Row>

                        <Row>
                          <Col span={5}>
                            <Space
                              style={{ width: "100%" }}
                              direction="vertical"
                            >
                              <FloatingLabels
                                label="Đối tượng sử dụng"
                                name="status"
                                value={values.objectUse}
                              >
                                <Select
                                  name="objectUse"
                                  className={styles.selectedItem}
                                  onChange={(e) =>
                                    setFieldValue("objectUse", e)
                                  }
                                  onBlur={handleBlur}
                                  options={optionsobjectUse}
                                  value={values.objectUse}
                                  style={{ width: "100%" }}
                                  placeholder={null}
                                  size="large"
                                />
                              </FloatingLabels>
                            </Space>
                          </Col>
                        </Row>

                        <Row>
                          <Space size={10}>
                            <Button
                              size="large"
                              onClick={() => navigate("/admin/vouchers")}
                            >
                              Hủy
                            </Button>

                            <Button
                              type="primary"
                              htmlType="submit"
                              size="large"
                            >
                              Xác nhận
                            </Button>
                          </Space>
                        </Row>
                      </Space>
                    </Form>
                  </Col>

                  <Col span={3}></Col>

                  <Space
                    style={{ width: "100%" }}
                    direction="vertical"
                    size={12}
                  >
                    {values?.objectUse === "member" ? (
                      <Space
                        style={{ width: "100%" }}
                        direction="vertical"
                        size={12}
                      >
                        <Table
                          style={{ width: "100%" }}
                          rowSelection={{
                            type: rowSelection,
                            ...rowSelection,
                          }}
                          columns={columns}
                          dataSource={data}
                          pagination={false}
                          // dataSource={vouchers.map((voucher, index) => ({
                          //   key: voucher.voucherId,
                          //   stt: calculateStt(index),
                          //   voucherCode: voucher.voucherCode,
                          //   voucherName: voucher.voucherName,
                          //   limitQuantity: numeral(voucher.limitQuantity).format("0,0"),
                          //   voucherValue: `${numeral(voucher.voucherValue).format("0,0")} ${
                          //     voucher.voucherMethod === "vnd" ? "VND" : "%"
                          //   }`,
                          //   startAndEndDate: `${moment(voucher.startDate).format(
                          //     "DD/MM/YYYY"
                          //   )} - ${moment(voucher.endDate).format("DD/MM/YYYY")}`,
                          //   status:
                          //     voucher.status === "ACTIVE"
                          //       ? "Đang diễn ra"
                          //       : voucher.status === "INACTIVE"
                          //       ? "Đã kết thúc"
                          //       : voucher.status === "UPCOMING"
                          //       ? "Sắp diễn ra"
                          //       : null,
                          //   action: voucher.voucherCode,
                          // }))}
                          // className={styles.table}
                        />
                        {/* <Pagination
                defaultCurrent={pageNo}
                total={totalElements}
                showSizeChanger={true}
                pageSize={pageSize}
                pageSizeOptions={["5", "10", "20", "50", "100"]}
                onShowSizeChange={handlePageSize}
                onChange={(page) => setPageNo(page)}
              /> */}
                      </Space>
                    ) : (
                      ""
                    )}
                  </Space>
                </>
              )}
            </Formik>
          </Row>
        </Space>
      </div>
    </div>
  );
}

export default SaveVoucher;
