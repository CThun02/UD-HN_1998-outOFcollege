import { Button, Col, DatePicker, Input, Radio, Row, Space, Form } from "antd";
import styles from "./CreatePromotion.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import FloatingLabels from "../../element/FloatingLabels/FloatingLabels";
import numeral from "numeral";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

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

  function handleStartDatChange(startDate) {
    setStartDate(startDate);
  }

  function handleEndDatChange(endDate) {
    setEndDate(endDate);
  }

  function handleOnSubmit() {}

  return (
    <div className={styles.createPromotion}>
      <div className={styles.content}>
        <Space style={{ width: "100%" }} size={16} direction="vertical">
          <h2>Tạo chương trình khuyến mại</h2>

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
                <Col span={5}>
                  <Radio.Group
                    style={{ width: "100%" }}
                    size="large"
                    options={options}
                    onChange={onChangevoucherMethod}
                    value={promotionMethod}
                    optionType="button"
                  />
                </Col>
                {promotionMethod === "vnd" ? (
                  <Col span={19}>
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
                          setPromotionValue(handleChangeNumber(e.target.value))
                        }
                      />
                    </FloatingLabels>
                  </Col>
                ) : (
                  <>
                    <Col span={7}>
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
                      onChange={handleStartDatChange}
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
                      onChange={handleEndDatChange}
                    />
                  </FloatingLabels>
                </Col>
              </Row>

              <Row
                gutter={16}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Space>
                  <Link to="promotion">
                    <Button>Hủy</Button>
                  </Link>
                  <Button type="primary" onClick={handleOnSubmit}>
                    Xác nhận
                  </Button>
                </Space>
              </Row>
            </Space>
          </Form>
        </Space>
      </div>
    </div>
  );
}

export default CreatePromotion;
