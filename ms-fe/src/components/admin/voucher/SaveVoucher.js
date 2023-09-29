import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import styles from "./SaveVoucher.module.css";
import { EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import FloatingLabels from "../../element/FloatingLabels/FloatingLabels";
import moment from "moment";
import { Formik } from "formik";
import React, { useContext, useRef } from "react";
import * as Yup from "yup";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../element/notification/Notification";

const options = [
  { label: "VND", value: "vnd" },
  { label: "%", value: "%" },
];

const optionsPrivate = [
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
          console.log("startDate: ", startDate);
          console.log("currentDate: ", currentDate);
          return (
            moment(startDate).format(dateFormat) >
            moment(currentDate).format(dateFormat)
          );
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

function SaveVoucher() {
  const ref = useRef();
  const navigate = useNavigate();
  const { showSuccessNotification } = useContext(NotificationContext);

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
      title: "Bạn có chắc là muốn thêm voucher này không?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        console.log("submit!", values, actions);
        console.log("test: ", ref);

        navigate("/admin/vouchers");
        showSuccessNotification("Thêm voucher thành công");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className={styles.saveVoucher}>
      <div className={styles.content}>
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
                voucherMethod: "vnd",
                voucherValue: "",
                voucherValueMax: "",
                limitQuantity: "",
                voucherCondition: "",
                startDate: "",
                endDate: "",
                private: "all",
              }}
              onSubmit={handleOnSubmit}
              validationSchema={validationSchema}
              innerRef={ref}
            >
              {({
                handleBlur,
                handleSubmit,
                handleChange,
                isValid,
                setFieldValue,
                values,
                errors,
                touched,
                setTouched,
                setErrors,
              }) => (
                <>
                  <Col span={3}></Col>

                  <Col span={18}>
                    <Form onFinish={handleSubmit}>
                      <Input style={{ display: "none" }} />
                      <Input style={{ display: "none" }} />

                      <Space
                        style={{ width: "100%" }}
                        size={20}
                        direction="vertical"
                      >
                        <Row gutter={16}>
                          <Col span={24}>
                            <FloatingLabels
                              label="Tên voucher"
                              name="voucherName"
                              value={values.voucherName}
                              zIndex={true}
                            >
                              <Input
                                size="large"
                                name="voucherName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.voucherName}
                                allowClear
                                status={
                                  touched.voucherName && errors.voucherName
                                    ? "error"
                                    : "success"
                                }
                              />
                              {touched.voucherName && (
                                <div className={styles.errors}>
                                  {errors.voucherName}
                                </div>
                              )}
                            </FloatingLabels>
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
                                    touched.voucherValue && errors.voucherValue
                                      ? "error"
                                      : ""
                                  }
                                />
                              </FloatingLabels>
                              {touched.voucherValue && (
                                <div className={styles.errors}>
                                  {errors.voucherValue}
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
                                      touched.voucherValue &&
                                      errors.voucherValue
                                        ? "error"
                                        : ""
                                    }
                                  />
                                </FloatingLabels>
                                {touched.voucherValue && (
                                  <div className={styles.errors}>
                                    {errors.voucherValue}
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
                                      touched.voucherValueMax &&
                                      errors.voucherValueMax
                                        ? "error"
                                        : ""
                                    }
                                  />
                                </FloatingLabels>
                                {touched.voucherValueMax && (
                                  <div className={styles.errors}>
                                    {errors.voucherValueMax}
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
                                  touched.limitQuantity && errors.limitQuantity
                                    ? "error"
                                    : ""
                                }
                              />
                            </FloatingLabels>
                            {touched.limitQuantity && (
                              <div className={styles.errors}>
                                {errors.limitQuantity}
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
                                  touched.voucherCondition &&
                                  errors.voucherCondition
                                    ? "error"
                                    : ""
                                }
                              />
                            </FloatingLabels>
                            {touched.voucherCondition && (
                              <div className={styles.errors}>
                                {errors.voucherCondition}
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
                                values={values.startDate}
                                onChange={(e) => setFieldValue("startDate", e)}
                                onBlur={handleBlur}
                                status={
                                  touched.startDate && errors.startDate
                                    ? "error"
                                    : ""
                                }
                              />
                            </FloatingLabels>
                            {touched.startDate && (
                              <div className={styles.errors}>
                                {errors.startDate}
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
                                values={values.endDate}
                                onChange={(e) => setFieldValue("endDate", e)}
                                onBlur={handleBlur}
                                status={
                                  touched.endDate && errors.endDate
                                    ? "error"
                                    : ""
                                }
                              />
                            </FloatingLabels>
                            {touched.endDate && (
                              <div className={styles.errors}>
                                {errors.endDate}
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
                                value={values.private}
                              >
                                <Select
                                  name="private"
                                  className={styles.selectedItem}
                                  onChange={(e) => setFieldValue("private", e)}
                                  onBlur={handleBlur}
                                  options={optionsPrivate}
                                  value={values.private}
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
                            <Button size="large">Hủy</Button>

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
                    {values?.private === "member" ? (
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
