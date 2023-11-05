import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  notification,
} from "antd";
import styles from "./SaveVoucher.module.css";
import {
  EditOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
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
import ModalAddCustomer from "./ModalAddCustomer";

const options = [
  { label: "VND", value: "vnd" },
  { label: "%", value: "%" },
];

const optionsobjectUse = [
  { label: "Tất cả", value: "all" },
  { label: "Thành viên", value: "member" },
];

const validationSchema = Yup.object().shape({
  voucherName: Yup.string().required("* Tên voucher không được bỏ trống."),
  voucherMethod: Yup.string(),
  voucherValue: Yup.string()
    .required("* Giá trị giảm không được bỏ trống")
    .matches(/^[0-9,]+$/, "Sai định dạng")
    .test(
      "voucher-value",
      "* Giá trị không được vượt quá 100%",
      function (voucherValue) {
        const { voucherMethod } = this.parent;
        if (voucherValue && voucherMethod !== "vnd") {
          return voucherValue < 100;
        }
        return true;
      }
    ),
  voucherValueMax: Yup.string().matches(/^[0-9,]+$/, "Sai định dạng"),
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
      "* Ngày bắt đầu phải lớn hơn ngày hiện tại tối thiểu 10 phút",
      function (startDate) {
        // const { status } = this.parent;
        // if (startDate && status !== "ACTIVE") {
        //   return startDate > dayjs().add(10, "minute");
        // }
        return true;
      }
    ),
  endDate: Yup.date()
    .required("* Ngày kết thúc không được bỏ trống")
    .test(
      "end-date",
      "* Ngày kết thúc phải lớn hơn ngày bắt đầu 30 phút",
      function (endDate) {
        const { startDate } = this.parent;
        if (startDate && endDate) {
          return endDate > dayjs(startDate).add(30, "minute");
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
  isCheckSendEmail: Yup.boolean().test(
    "sendEmail",
    "* Vui lòng không bỏ trống",
    function (isCheckSendEmail) {
      const { objectUse } = this.parent;

      if (objectUse === "member") {
        return isCheckSendEmail === true;
      }

      return true;
    }
  ),
});

//date
dayjs.extend(customParseFormat);
const dateFormat = "HH:mm:ss DD/MM/YYYY";

function disabledDate(current) {
  return current && current <= moment(dayjs());
}

const { confirm } = Modal;

const baseUrl = "http://localhost:8080/api/admin/vouchers/";

function SaveVoucher() {
  const ref = useRef();
  const navigate = useNavigate();
  const { showSuccessNotification } = useContext(NotificationContext);
  const [apiNotification, contextProviderNotification] =
    notification.useNotification();
  const { code } = useParams();
  const [errorsServer, setErrorsServer] = useState({});
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
          const usernames = ref.current?.values.usernames.map((user) => {
            const { key, stt, ...rest } = user;

            if (rest.gender === "Nam") {
              return { ...rest, gender: true };
            } else {
              return { ...rest, gender: false };
            }
          });

          const usernamesCurrent = ref.current?.values.usernamesCurrent.map(
            (user) => {
              const { key, stt, ...rest } = user;

              if (rest.gender === "Nam") {
                return { ...rest, gender: true };
              } else {
                return { ...rest, gender: false };
              }
            }
          );

          const differentList = usernames.reduce((result, item) => {
            if (
              Array.isArray(usernamesCurrent) &&
              usernamesCurrent.length > 0
            ) {
              if (
                usernamesCurrent.some((el) => el.username !== item.username)
              ) {
                return [...result, item];
              }
            } else {
              return [...result, item];
            }
            return result;
          }, []);

          console.log("Values: ", differentList);
          console.log("usernamesCurrent: ", usernamesCurrent);
          console.log("usernames: ", usernames);

          setIsLoading(true);
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
                objectUse: voucher?.objectUse,
                emailDetails: {
                  messageBody:
                    "Hi bạn, \n Men's Shirt Shop gửi bạn voucher đặc biệt: \n\t1. Mã voucher: ASDFSAF724, Bạn có thể lên shop hoặc tới cửa hàng để sử dụng voucher này.\nThanks.",
                  subject: "Men's Shirt Shop",
                  attachment: null,
                  recipient: [],
                },
                isCheckSendEmail: voucher?.isCheckSendEmail,
                usernames: voucher?.voucherId ? differentList : usernames,
              })
              .then(() => {
                setIsLoading(false);
                navigate("/api/admin/vouchers");
                showSuccessNotification("Thao tác thành công", "voucher");
              })
              .catch((err) => {
                setIsLoading(false);
                const error = err.response.data;
                setErrorsServer(error);
                apiNotification.error({
                  message: `Lỗi`,
                  description: `${err.response.data.message}`,
                });
              });
          } else {
            setIsLoading(false);
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
              objectUse,
              isCheckSendEmail,
              emailDetails,
              usernames,
            } = res.data;

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
            ref.current.setFieldValue("objectUse", objectUse);
            ref.current.setFieldValue("isCheckSendEmail", isCheckSendEmail);
            ref.current.setFieldValue("emailDetails", emailDetails);
            ref.current.setFieldValue("usernames", usernames);
            ref.current.setFieldValue("usernamesCurrent", usernames);
          });
        }
        getVoucher();
      }
    },
    [code]
  );

  return (
    <div className={styles.saveVoucher}>
      <div className={styles.content}>
        {contextProviderNotification}
        <Spin
          tip="Loading..."
          spinning={isLoading}
          size="large"
          style={{ width: "100%" }}
        >
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
                  voucherNameCurrent: "",
                  voucherMethod: "vnd",
                  voucherValue: "",
                  voucherValueMax: "",
                  limitQuantity: "",
                  voucherCondition: "",
                  startDate: "",
                  endDate: "",
                  objectUse: "all",
                  status: "",
                  isCheckSendEmail: false,
                  emailDetails: {},
                  usernames: [],
                  usernamesCurrent: [],
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
                                  disabled={
                                    values.status === "INACTIVE" ||
                                    values.status === "CANCEL"
                                  }
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
                                    disabled={
                                      values.status === "INACTIVE" ||
                                      values.status === "CANCEL"
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

                                      if (!values.voucherId) {
                                        setFieldValue(
                                          "voucherCurrentName",
                                          e.target.value
                                        );
                                      }
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
                                  setFieldValue(
                                    "voucherMethod",
                                    v.target.value
                                  );
                                }}
                                value={values.voucherMethod}
                                optionType="button"
                                disabled={
                                  values.status === "INACTIVE" ||
                                  values.status === "ACTIVE" ||
                                  values.status === "CANCEL"
                                }
                              />
                            </Col>
                            {values.voucherMethod === "vnd" ? (
                              <Col span={20}>
                                <FloatingLabels
                                  label="Giá trị giảm"
                                  name="voucherValue"
                                  value={values.voucherValue}
                                  zIndex={true}
                                  disabled={
                                    values.status === "INACTIVE" ||
                                    values.status === "ACTIVE" ||
                                    values.status === "CANCEL"
                                  }
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
                                    disabled={
                                      values.status === "INACTIVE" ||
                                      values.status === "ACTIVE" ||
                                      values.status === "CANCEL"
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
                                    disabled={
                                      values.status === "INACTIVE" ||
                                      values.status === "ACTIVE" ||
                                      values.status === "CANCEL"
                                    }
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
                                      disabled={
                                        values.status === "INACTIVE" ||
                                        values.status === "ACTIVE" ||
                                        values.status === "CANCEL"
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
                                    disabled={
                                      values.status === "INACTIVE" ||
                                      values.status === "ACTIVE" ||
                                      values.status === "CANCEL"
                                    }
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
                                      disabled={
                                        values.status === "INACTIVE" ||
                                        values.status === "ACTIVE" ||
                                        values.status === "CANCEL"
                                      }
                                    />
                                  </FloatingLabels>
                                  {touched?.voucherValueMax && (
                                    <div className={styles.errors}>
                                      {errors.voucherValueMax}
                                      {errorsServer.voucherValueMax}
                                    </div>
                                  )}
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
                                disabled={
                                  values.status === "INACTIVE" ||
                                  values.status === "ACTIVE" ||
                                  values.status === "CANCEL"
                                }
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
                                  disabled={
                                    values.status === "INACTIVE" ||
                                    values.status === "ACTIVE" ||
                                    values.status === "CANCEL"
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
                                disabled={
                                  values.status === "INACTIVE" ||
                                  values.status === "ACTIVE" ||
                                  values.status === "CANCEL"
                                }
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
                                  disabled={
                                    values.status === "INACTIVE" ||
                                    values.status === "ACTIVE" ||
                                    values.status === "CANCEL"
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
                                disabled={
                                  values.status === "INACTIVE" ||
                                  values.status === "ACTIVE" ||
                                  values.status === "CANCEL"
                                }
                              >
                                <DatePicker
                                  name="startDate"
                                  disabledDate={disabledDate}
                                  format={dateFormat}
                                  size="large"
                                  placeholder={null}
                                  style={{ width: "100%" }}
                                  value={values.startDate}
                                  onChange={(e) =>
                                    setFieldValue("startDate", e)
                                  }
                                  onBlur={handleBlur}
                                  status={
                                    (touched.startDate && errors.startDate) ||
                                    errorsServer.startDate
                                      ? "error"
                                      : ""
                                  }
                                  disabled={
                                    values.status === "INACTIVE" ||
                                    values.status === "ACTIVE" ||
                                    values.status === "CANCEL"
                                  }
                                  showTime={{
                                    defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                                  }}
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
                                disabled={
                                  values.status === "INACTIVE" ||
                                  values.status === "CANCEL"
                                }
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
                                  disabled={
                                    values.status === "INACTIVE" ||
                                    values.status === "CANCEL"
                                  }
                                  showTime={{
                                    defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                                  }}
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
                            <Col span={12}>
                              <Space
                                style={{ width: "100%" }}
                                direction="vertical"
                              >
                                <FloatingLabels
                                  label="Đối tượng sử dụng"
                                  name="status"
                                  value={values.objectUse}
                                  disabled={
                                    values.status === "INACTIVE" ||
                                    values.status === "ACTIVE" ||
                                    values.status === "CANCEL"
                                  }
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
                                    disabled={
                                      values.status === "INACTIVE" ||
                                      values.status === "ACTIVE" ||
                                      values.status === "CANCEL"
                                    }
                                  />
                                </FloatingLabels>
                                <Checkbox
                                  style={{ marginTop: "20px" }}
                                  checked={values.isCheckSendEmail}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "isCheckSendEmail",
                                      e.target.checked
                                    );
                                    console.log("values: ", e.target.checked);
                                  }}
                                  disabled={
                                    values.status === "INACTIVE" ||
                                    values.status === "ACTIVE" ||
                                    values.status === "CANCEL" ||
                                    values.status === "ACTIVE"
                                  }
                                >
                                  Gửi mã giảm giá cho khách hàng
                                </Checkbox>
                                {touched.isCheckSendEmail && (
                                  <div className={styles.errors}>
                                    {errors.isCheckSendEmail}{" "}
                                    {errorsServer.isCheckSendEmail}
                                  </div>
                                )}
                                <div className={styles.errors}>
                                  {values.objectUse === "member" &&
                                  customers.length === 0
                                    ? "* Vui lòng chọn khách hàng cần gửi."
                                    : ""}
                                </div>
                              </Space>
                            </Col>
                          </Row>

                          <Row>
                            <Col span={18}>
                              <Space size={10}>
                                <Button
                                  size="large"
                                  onClick={() =>
                                    navigate("/api/admin/vouchers")
                                  }
                                >
                                  {`${
                                    values.status === "INACTIVE"
                                      ? "Quay lại"
                                      : "Hủy"
                                  }`}
                                </Button>

                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  size="large"
                                  disabled={
                                    values.status === "INACTIVE" ||
                                    values.status === "CANCEL" ||
                                    (values.objectUse === "member" &&
                                      customers.length === 0)
                                  }
                                >
                                  Xác nhận
                                </Button>
                              </Space>
                            </Col>

                            <Col span={6}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                {(values.objectUse === "member" &&
                                  values.isCheckSendEmail) ||
                                customers.length ? (
                                  <Button
                                    type="primary"
                                    ghost
                                    icon={<PlusOutlined />}
                                    onClick={() => setIsLoadingModal(true)}
                                    size="large"
                                    disabled={
                                      values.status === "INACTIVE" ||
                                      values.status === "CANCEL"
                                    }
                                  >
                                    Chọn khách hàng
                                  </Button>
                                ) : null}
                              </div>
                            </Col>
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
                      <ModalAddCustomer
                        isLoadingModal={isLoadingModal}
                        setIsLoadingModal={setIsLoadingModal}
                        values={values}
                        setFieldValue={setFieldValue}
                        customers={customers}
                        setCustomers={setCustomers}
                      />
                    </Space>
                  </>
                )}
              </Formik>
            </Row>
          </Space>
        </Spin>
      </div>
    </div>
  );
}

export default SaveVoucher;
