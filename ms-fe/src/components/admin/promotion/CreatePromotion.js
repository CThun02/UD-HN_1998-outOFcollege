import { Button, Col, DatePicker, Input, Radio, Row, Space, Form } from "antd";
import styles from "./CreatePromotion.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import FloatingLabels from "../../element/FloatingLabels/FloatingLabels";
import numeral from "numeral";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import AddProductInPromotion from "./AddProductInPromotion";
import { EditOutlined } from "@ant-design/icons";

const options = [
  { label: "VND", value: "vnd" },
  { label: "%", value: "%" },
];

dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY";

function CreatePromotion() {
  const [promotionName, setPromotionName] = useState("");
  const [promotionValue, setPromotionValue] = useState("");
  const [promotionValueMax, setPromotionValueMax] = useState("");
  const [promotionMethod, setPromotionMethod] = useState("vnd");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // products
  const [products, setProducts] = useState([]);

  const onChangevoucherMethod = ({ target: { value } }) => {
    console.log("voucher method checked", value);
    setPromotionValue("");
    setPromotionMethod(value);
  };

  function handleChangeNumber(value) {
    const formattedValue = numeral(value).format("0,0");

    if (formattedValue === "0") return "";
    else return formattedValue;
  }

  function handleDateChange(date, dateString) {
    return date;
  }

  function handleOnSubmit() {}

  return (
    <>
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

            <Col span={16}>
              <Form layout="vertical">
                <Space style={{ width: "100%" }} size={8} direction="vertical">
                  <Row gutter={16}>
                    <Col span={24}>
                      <FloatingLabels
                        label="Tên chương trình khuyến mại"
                        name="promotionName"
                        value={promotionName}
                        zIndex={true}
                      >
                        <Input
                          size="large"
                          name="promotionName"
                          allowClear
                          value={promotionName}
                          onChange={(e) => setPromotionName(e.target.value)}
                        />
                      </FloatingLabels>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={4}>
                      <Radio.Group
                        className={styles.radioGroup}
                        style={{ width: "100%" }}
                        size="large"
                        options={options}
                        onChange={onChangevoucherMethod}
                        value={promotionMethod}
                        optionType="button"
                      />
                    </Col>
                    {promotionMethod === "vnd" ? (
                      <Col span={20}>
                        <FloatingLabels
                          label="Giá trị khuyến mại"
                          name="voucherValue"
                          value={promotionValue}
                          zIndex={true}
                        >
                          <Input
                            size="large"
                            suffix={"VND"}
                            allowClear
                            value={promotionValue}
                            onChange={(e) =>
                              setPromotionValue(
                                handleChangeNumber(e.target.value)
                              )
                            }
                          />
                        </FloatingLabels>
                      </Col>
                    ) : (
                      <>
                        <Col span={8}>
                          <FloatingLabels
                            label="Giá trị khuyến mại"
                            name="promotionValue"
                            value={promotionValue}
                            zIndex={true}
                          >
                            <Input
                              size="large"
                              suffix={"%"}
                              allowClear
                              value={promotionValue}
                              onChange={(e) =>
                                setPromotionValue(
                                  handleChangeNumber(e.target.value)
                                )
                              }
                            />
                          </FloatingLabels>
                        </Col>

                        <Col span={12}>
                          <FloatingLabels
                            label="Giá trị khuyến mãi tối đa"
                            name="voucherValueMax"
                            value={promotionValueMax}
                            zIndex={true}
                          >
                            <Input
                              size="large"
                              suffix={"VND"}
                              allowClear
                              value={promotionValueMax}
                              onChange={(e) =>
                                setPromotionValueMax(
                                  handleChangeNumber(e.target.value)
                                )
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
                        label="Ngày bắt đầu"
                        name="startDate"
                        value={startDate}
                      >
                        <DatePicker
                          format={dateFormat}
                          size="large"
                          placeholder={null}
                          style={{ width: "100%" }}
                          value={startDate}
                          onChange={(date, dateString) =>
                            setStartDate(handleDateChange(date, dateString))
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
                          format={dateFormat}
                          size="large"
                          placeholder={null}
                          style={{ width: "100%" }}
                          value={endDate}
                          onChange={(date, dateString) =>
                            setEndDate(handleDateChange(date, dateString))
                          }
                        />
                      </FloatingLabels>
                    </Col>
                  </Row>

                  <Row>
                    <Space>
                      <Link to="promotion">
                        <Button>Hủy</Button>
                      </Link>
                      <Button
                        type="primary"
                        onClick={handleOnSubmit}
                        disabled={products.length ? false : true}
                      >
                        Xác nhận
                      </Button>
                    </Space>
                  </Row>
                </Space>
              </Form>
            </Col>
          </Space>
        </div>
      </div>

      <AddProductInPromotion products={products} setProducts={setProducts} />
    </>
  );
}

export default CreatePromotion;
