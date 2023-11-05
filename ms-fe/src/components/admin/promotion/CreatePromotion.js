import {
  Button,
  Col,
  DatePicker,
  Input,
  Radio,
  Row,
  Space,
  Form,
  notification,
  Spin,
  Modal,
} from "antd";
import styles from "./CreatePromotion.module.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FloatingLabels from "../../element/FloatingLabels/FloatingLabels";
import numeral from "numeral";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { NotificationContext } from "../../element/notification/Notification";
import TableProduct from "./TableProduct";
import ProductsDetails from "../../element/products-details/ProductsDetails";

const { confirm } = Modal;

function disabledDate(current) {
  return current && current < moment(dayjs());
}

const options = [
  { label: "VND", value: "vnd" },
  { label: "%", value: "%" },
];

const validationSchema = Yup.object().shape({
  promotionName: Yup.string().required(
    "* Tên chương trình không được bỏ trống."
  ),
  promotionMethod: Yup.string(),
  promotionValue: Yup.string()
    .required("* Giá trị giảm không được bỏ trống")
    .matches(/^[0-9,]+$/, "Sai định dạng")
    .test(
      "promotion-value",
      "* Giá trị không được vượt quá 100%",
      function (promotionValue) {
        const { promotionMethod } = this.parent;
        if (promotionValue && promotionMethod !== "vnd") {
          return promotionValue < 100;
        }
        return true;
      }
    ),
  startDate: Yup.date()
    .required("* Ngày bắt đầu không được bỏ trống")
    .test(
      "start-date-current",
      "* Ngày bắt đầu phải lớn hơn ngày hiện tại tối thiểu 10 phút",
      function (startDate) {
        // const { status } = this.parent;
        // if (startDate && status !== "ACTIVE") {
        //   return startDate > dayjs().add(9, "minute");
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
          return endDate > dayjs(startDate).add(29, "minute");
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

dayjs.extend(customParseFormat);

const dateFormat = "HH:mm:ss DD/MM/YYYY";

const baseUrl = "http://localhost:8080/api/admin/promotion/";
const baseUrlPromotionProduct =
  "http://localhost:8080/api/admin/promotion-product/";

function CreatePromotion() {
  const ref = useRef();
  const navigate = useNavigate();
  const { showSuccessNotification } = useContext(NotificationContext);
  const [errorsServer, setErrorsServer] = useState({});
  const [apiNotification, contextProviderNotification] =
    notification.useNotification();
  const { code } = useParams();

  // products
  const [productsDetailsId, setProductsDetailsId] = useState([]);
  const [onDeleteProductDetailIds, setOnDeleteProductDetailIds] = useState([]);
  const [productsId, setProductsId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  function handleChangeNumber(value) {
    const formattedValue = numeral(value).format("0,0");

    if (formattedValue === "0") return "";
    else return formattedValue;
  }

  function handleDateChange(date, dateString) {
    return date;
  }

  function handleOnSubmit(values, actions) {
    confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc là muốn lưu thay đổi không?",

      onOk() {
        async function savePromotion() {
          const promotion = ref.current?.values;

          console.log("ids: ", productsDetailsId);

          if (promotion.promotionId) {
            async function deleteProductDetail() {
              const dto = {
                promotionId: promotion.promotionId,
                productDetailIds: onDeleteProductDetailIds,
              };
              await axios
                .post(baseUrlPromotionProduct + "delete", dto)
                .then((res) => console.log(res))
                .catch((e) => console.log("deleteError: ", e));
            }

            deleteProductDetail();
          }

          setIsLoading(true);
          if (promotion) {
            await axios
              .post(baseUrl + "save", {
                ...promotion,
                startDate: moment(promotion?.startDate.$d).format(
                  "YYYY-MM-DDTHH:mm:ss.SSS"
                ),
                endDate: moment(promotion?.endDate.$d).format(
                  "YYYY-MM-DDTHH:mm:ss.SSS"
                ),
                promotionValue: isNaN(promotion?.promotionValue)
                  ? Number.parseInt(
                      promotion?.promotionValue?.replace(/,/g, "")
                    )
                  : promotion?.promotionValue,
                promotionId: promotion?.promotionId
                  ? promotion?.promotionId
                  : "",
                promotionCode: promotion?.promotionCode
                  ? promotion?.promotionCode
                  : "",
                promotionName: promotion?.promotionName,
                promotionNameCurrent: promotion?.promotionNameCurrent,
                productDetailIds: productsDetailsId,
              })
              .then(() => {
                setIsLoading(false);
                navigate("/api/admin/promotion");
                showSuccessNotification("Thao tác thành công", "promotion");
              })
              .catch((err) => {
                console.log("err: ", err);
                setIsLoading(false);
                const error = err?.response?.data;
                setErrorsServer(error);
                apiNotification.error({
                  message: `Lỗi`,
                  description: `${err?.response?.data?.message}`,
                });
              });
          } else {
            console.log("ERROR");
            setIsLoading(false);
            apiNotification.error({
              message: `Lỗi`,
            });
          }
        }

        savePromotion();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  useEffect(
    function () {
      if (code) {
        async function getPromotion() {
          await axios.get(baseUrl + code).then((res) => {
            const {
              promotionId,
              promotionCode,
              promotionName,
              promotionMethod,
              promotionValue,
              startDate,
              endDate,
              status,
              productDetailIds,
              productIdsResponse,
            } = res.data;

            ref.current.setFieldValue("promotionId", promotionId);
            ref.current.setFieldValue("promotionCode", promotionCode);
            ref.current.setFieldValue("promotionName", promotionName);
            ref.current.setFieldValue("promotionMethod", promotionMethod);
            ref.current.setFieldValue(
              "promotionValue",
              handleChangeNumber(promotionValue)
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
            ref.current.setFieldValue("productsDetailsIdDb", productDetailIds);
            setProductsDetailsId(productDetailIds);
            setProductsId(productIdsResponse);
            setStatus(status);
          });
        }
        getPromotion();
      }
    },
    [code]
  );

  return (
    <>
      <Spin
        tip="Loading..."
        spinning={isLoading}
        size="large"
        style={{ width: "100%" }}
      >
        {contextProviderNotification}
        <div className={styles.createPromotion}>
          <div className={styles.content}>
            <Space style={{ width: "100%" }} size={16} direction="vertical">
              <Row>
                <Col span={20}>
                  <Space size={12} className={styles.color}>
                    <i>
                      <EditOutlined />
                    </i>
                    <h2>Tạo chương trình khuyến mại</h2>
                  </Space>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Formik
                    initialValues={{
                      promotionId: null,
                      promotionCode: "",
                      promotionName: "",
                      promotionNameCurrent: "",
                      promotionMethod: "vnd",
                      promotionValue: "",
                      startDate: "",
                      endDate: "",
                      status: "",
                      productsDetailsIdDb: [],
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
                      <Form layout="vertical" onFinish={handleSubmit}>
                        <Space
                          style={{ width: "100%" }}
                          size={18}
                          direction="vertical"
                        >
                          <Input
                            style={{ display: "none" }}
                            name="promotionId"
                            value={values.promotionId}
                          />
                          <Input
                            style={{ display: "none" }}
                            name="promotionCode"
                            value={values.promotionCode}
                          />

                          <Row gutter={16}>
                            <Col span={24}>
                              <FloatingLabels
                                label="Tên chương trình khuyến mại"
                                name="promotionName"
                                value={values.promotionName}
                                zIndex={true}
                                disabled={
                                  values.status === "INACTIVE" ||
                                  values.status === "CANCEL"
                                }
                              >
                                <Input
                                  size="large"
                                  name="promotionName"
                                  allowClear
                                  value={values.promotionName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  status={
                                    (touched.promotionName &&
                                      errors.promotionName) ||
                                    errorsServer?.promotionName
                                      ? "error"
                                      : "success"
                                  }
                                  disabled={
                                    values.status === "INACTIVE" ||
                                    values.status === "CANCEL"
                                  }
                                />
                                {touched.promotionName && (
                                  <div className={styles.errors}>
                                    {errors.promotionName}
                                    {errorsServer.promotionName}
                                  </div>
                                )}
                              </FloatingLabels>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={7}>
                              <Radio.Group
                                className={styles.radioGroup}
                                style={{ width: "100%" }}
                                size="large"
                                options={options}
                                onChange={(e) =>
                                  setFieldValue(
                                    "promotionMethod",
                                    e.target.value
                                  )
                                }
                                value={values.promotionMethod}
                                optionType="button"
                                disabled={
                                  values.status === "ACTIVE" ||
                                  values.status === "INACTIVE" ||
                                  values.status === "CANCEL"
                                }
                              />
                            </Col>
                            <Col span={17}>
                              <FloatingLabels
                                label="Giá trị khuyến mại"
                                name="voucherValue"
                                value={values.promotionValue}
                                zIndex={true}
                                disabled={
                                  values.status === "ACTIVE" ||
                                  values.status === "INACTIVE" ||
                                  values.status === "CANCEL"
                                }
                              >
                                <Input
                                  name="promotionValue"
                                  size="large"
                                  suffix={
                                    values.promotionMethod === "vnd"
                                      ? "VND"
                                      : "%"
                                  }
                                  allowClear
                                  value={values.promotionValue}
                                  onChange={(e) =>
                                    setFieldValue(
                                      "promotionValue",
                                      handleChangeNumber(e.target.value)
                                    )
                                  }
                                  onBlur={handleBlur}
                                  disabled={
                                    values.status === "ACTIVE" ||
                                    values.status === "INACTIVE" ||
                                    values.status === "CANCEL"
                                  }
                                  status={
                                    (touched.promotionValue &&
                                      errors.promotionValue) ||
                                    errorsServer?.promotionValue
                                      ? "error"
                                      : "success"
                                  }
                                />
                                {touched.promotionValue && (
                                  <div className={styles.errors}>
                                    {errors.promotionValue}
                                    {errorsServer.promotionValue}
                                  </div>
                                )}
                              </FloatingLabels>
                            </Col>
                          </Row>

                          <Row gutter={16}>
                            <Col span={24}>
                              <FloatingLabels
                                label="Ngày bắt đầu"
                                name="startDate"
                                value={values.startDate}
                                disabled={
                                  values.status === "ACTIVE" ||
                                  values.status === "INACTIVE" ||
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
                                  onChange={(date, dateString) =>
                                    setFieldValue(
                                      "startDate",
                                      handleDateChange(date, dateString)
                                    )
                                  }
                                  onBlur={handleBlur}
                                  disabled={
                                    values.status === "ACTIVE" ||
                                    values.status === "INACTIVE" ||
                                    values.status === "CANCEL"
                                  }
                                  status={
                                    (touched.startDate && errors.startDate) ||
                                    errorsServer?.startDate
                                      ? "error"
                                      : "success"
                                  }
                                  showTime={{
                                    defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                                  }}
                                />
                                {touched.startDate && (
                                  <div className={styles.errors}>
                                    {errors.startDate}
                                    {errorsServer.startDate}
                                  </div>
                                )}
                              </FloatingLabels>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
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
                                  onChange={(date, dateString) =>
                                    setFieldValue(
                                      "endDate",
                                      handleDateChange(date, dateString)
                                    )
                                  }
                                  onBlur={handleBlur}
                                  status={
                                    (touched.endDate && errors.endDate) ||
                                    errorsServer?.endDate
                                      ? "error"
                                      : "success"
                                  }
                                  disabled={
                                    values.status === "INACTIVE" ||
                                    values.status === "CANCEL"
                                  }
                                  showTime={{
                                    defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                                  }}
                                />
                                {touched.endDate && (
                                  <div className={styles.errors}>
                                    {errors.endDate}
                                    {errorsServer.endDate}
                                  </div>
                                )}
                              </FloatingLabels>
                            </Col>
                          </Row>
                          <Row>
                            <Space>
                              <Link to="/api/admin/promotion">
                                <Button>Hủy</Button>
                              </Link>
                              <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                  values.status === "INACTIVE" ||
                                  values.status === "CANCEL"
                                }
                              >
                                Xác nhận
                              </Button>
                            </Space>
                          </Row>
                        </Space>
                      </Form>
                    )}
                  </Formik>
                </Col>

                <Col span={1}></Col>
                <Col span={13}>
                  <TableProduct
                    productsId={productsId}
                    setProductsId={setProductsId}
                    values={ref.current?.values}
                    status={status}
                  />
                </Col>
              </Row>
            </Space>
          </div>
        </div>

        <ProductsDetails
          productsId={productsId}
          productsDetailsId={productsDetailsId}
          setProductsDetailsId={setProductsDetailsId}
          values={ref.current?.values}
          setOnDeleteProductDetailIds={setOnDeleteProductDetailIds}
          status={status}
        />
      </Spin>
    </>
  );
}

export default CreatePromotion;
