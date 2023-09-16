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
  RadioChangeEvent,
  Radio,
} from "antd";
import FilterVoucherAndPromotion from "../../element/filter/FilterVoucherAndPromotion";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import FloatingLabels from "../../element/FloatingLabels/FloatingLabels";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import numeral from "numeral";

dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY";

const data = [
  {
    key: "1",
    stt: "1",
    voucherCode: "VOUCHER_1",
    voucherName: "Black friday",
    limitQuantity: 20,
    voucherValue: 50000,
    startAndEndDate: "2012/20/20 - 2020/20/20",
    status: ["Đang diễn ra"],
  },
  {
    key: "2",
    stt: "2",
    voucherCode: "VOUCHER_2",
    voucherName: "Black friday",
    limitQuantity: 20,
    voucherValue: 50000,
    startAndEndDate: "2012/20/20 - 2020/20/20",
    status: ["Sắp diễn ra"],
  },
  {
    key: "3",
    stt: "3",
    voucherCode: "VOUCHER_3",
    voucherName: "Black friday",
    limitQuantity: 20,
    voucherValue: 50000,
    startAndEndDate: "2012/20/20 - 2020/20/20",
    status: ["Đã kết thúc"],
  },
];

const options = [
  { label: "VND", value: "vnd" },
  { label: "%", value: "%" },
];

function Voucher() {
  const [open, setOpen] = useState(false);
  const [voucherName, setVoucherName] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [limitQuantity, setLimitQuantity] = useState("");
  const [voucherValue, setVoucherValue] = useState("");
  const [voucherValueMax, setVoucherValueMax] = useState("");
  const [voucherCondition, setVoucherCondition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [voucherMethod, setvoucherMethod] = useState("vnd");

  const onChangevoucherMethod = ({ target: { value } }) => {
    console.log("voucher method checked", value);
    setVoucherValue("");
    setvoucherMethod(value);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  function handleStartDatChange(startDate) {
    setStartDate(startDate);
  }

  function handleEndDatChange(endDate) {
    setEndDate(endDate);
  }

  function handleChangeNumber(value) {
    const formattedValue = numeral(value).format("0,0");

    if (formattedValue === "0") return "";
    else return formattedValue;
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    const voucher = {
      voucherName,
      voucherCode,
      limitQuantity,
      voucherValue,
      voucherValueMax,
      voucherCondition,
      voucherMethod,
      startDate,
      endDate,
    };

    console.log("voucher: ", voucher);
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
      render: (code) => <Link onClick={() => setOpen(true)}>{code}</Link>,
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
      render: (_, { status }) => (
        <>
          {status.map((sta) => {
            let color =
              sta === "Đang diễn ra"
                ? "geekblue"
                : sta === "Sắp diễn ra"
                ? "green"
                : "red";
            if (sta === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={sta}>
                {sta.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (_) => (
        <Space size="middle">
          <Link onClick={() => setOpen(true)}>
            <EyeOutlined />
          </Link>

          <Link onClick={() => setOpen(true)}>
            <EditOutlined />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.voucher}>
      <FilterVoucherAndPromotion />

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
                  title="Tạo voucher"
                  width={720}
                  onClose={onClose}
                  open={open}
                  bodyStyle={{ paddingBottom: 80 }}
                >
                  <Form layout="vertical">
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
                              onChange={(e) => setVoucherName(e.target.value)}
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
                                value={voucherValue}
                                onChange={(e) =>
                                  setVoucherValue(
                                    handleChangeNumber(e.target.value)
                                  )
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
                                  value={voucherValue}
                                  onChange={(e) =>
                                    setVoucherValue(
                                      handleChangeNumber(e.target.value)
                                    )
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
                                  value={voucherValueMax}
                                  onChange={(e) =>
                                    setVoucherValueMax(
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
                            label="Số lượng"
                            name="limitQuantity"
                            value={limitQuantity}
                            zIndex={true}
                          >
                            <Input
                              size="large"
                              allowClear
                              value={limitQuantity}
                              onChange={(e) =>
                                setLimitQuantity(
                                  handleChangeNumber(e.target.value)
                                )
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
                              value={voucherCondition}
                              onChange={(e) =>
                                setVoucherCondition(
                                  handleChangeNumber(e.target.value)
                                )
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
                          <Button onClick={onClose}>Hủy</Button>
                          <Button type="primary" onClick={handleOnSubmit}>
                            Xác nhận
                          </Button>
                        </Space>
                      </Row>
                    </Space>
                  </Form>
                </Drawer>
              </>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={data}
            className={styles.table}
            pagination={false}
          />
          <Pagination defaultCurrent={1} total={500} />
        </Space>
      </div>
    </div>
  );
}

export default Voucher;
