import { Badge, Carousel, Col, Row, Table, notification } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./StatisticalIndex.module.css";
import { getToken } from "../../../service/Token";

const TableProdutSellTheMost = ({ date, dateToP, type }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      key: "#",
      datatIndex: "index",
      title: "#",
      width: "7%",
      render: (text, record, index) => {
        return (
          <span id={record.id}>
            {(currentPage - 1) * pageSize + (index + 1)}
          </span>
        );
      },
    },
    {
      key: "product",
      datatIndex: "product",
      title: "Sản phẩm",
      width: "63%",
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={6}>
              <div
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                {record.promotion.length !== 0 ? (
                  <Badge.Ribbon
                    text={`Giảm ${
                      record.promotion[0].promotionValue
                        ? record.promotion[0].promotionMethod === "%"
                          ? record.promotion[0].promotionValue +
                            " " +
                            record.promotion[0].promotionMethod
                          : record.promotion[0].promotionValue.toLocaleString(
                              "vi-VN",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            )
                        : null
                    }`}
                    color="red"
                  >
                    <Carousel autoplay>
                      {record.productImageResponse &&
                        record.productImageResponse.map((item) => {
                          return (
                            <img
                              key={item.id}
                              style={{ width: "100%", marginTop: "10px" }}
                              alt=""
                              src={item.path}
                            />
                          );
                        })}
                    </Carousel>
                  </Badge.Ribbon>
                ) : (
                  <Carousel autoplay>
                    {record.productImageResponse &&
                      record.productImageResponse.map((item) => {
                        return (
                          <img
                            key={item.id}
                            style={{ width: "100%", marginTop: "10px" }}
                            alt=""
                            src={item.path}
                          />
                        );
                      })}
                  </Carousel>
                )}
              </div>
            </Col>
            <Col span={18}>
              <div
                className="m-5"
                style={{
                  textAlign: "start",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontWeight: "500" }}>
                  {record.product.productName +
                    "-" +
                    record.brand.brandName +
                    "-" +
                    record.category.categoryName +
                    "-" +
                    record.button.buttonName +
                    "-" +
                    record.material.materialName +
                    "-" +
                    record.collar.collarTypeName +
                    "-" +
                    record.sleeve.sleeveName +
                    "-" +
                    record.shirtTail.shirtTailTypeName +
                    "-" +
                    record.pattern.patternName +
                    "-" +
                    record.form.formName}
                </span>
                <br />
                <div className={styles.optionColor}>
                  <b>Màu sắc: </b>
                  <span
                    style={{
                      backgroundColor: record.color.colorCode,
                      marginLeft: "8px",
                    }}
                  ></span>
                  {record.color.colorName}
                </div>
                <b>Kích cỡ: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {record.size.sizeName}
                </span>
              </div>
            </Col>
          </Row>
        );
      },
    },
    {
      key: "quantity",
      datatIndex: "quantity",
      title: "Số lượng bán",
      render: (text, record, index) => {
        return record.quantity;
      },
    },
    {
      key: "total",
      datatIndex: "total",
      title: "Tổng thu",
      render: (text, record, index) => {
        return (record.price * record.quantity)?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      },
    },
  ];
  useEffect(() => {
    var dateFrom = new Date(date);
    var dateTo = new Date(type === "other" ? dateToP : date);
    function getLastDayOfMonth(month) {
      const firstDayOfNextMonth = new Date(
        Date.UTC(dateFrom.getFullYear(), month, 1)
      );
      const lastDayOfMonth = new Date(
        firstDayOfNextMonth.getTime() - 24 * 60 * 60 * 1000
      );
      return lastDayOfMonth.getDate();
    }
    if (type === "month") {
      dateFrom.setDate(1);
      dateTo.setDate(getLastDayOfMonth(dateFrom.getMonth() + 1));
    } else if (type === "year") {
      dateFrom.setDate(1);
      dateTo.setDate(getLastDayOfMonth(12));
      dateFrom.setMonth(0);
      dateTo.setMonth(11);
    }
    if (dateFrom.getTime() > dateTo.getTime()) {
      notification.error({
        message: "Thông báo",
        description:
          "Thời gian bắt đầu phải bé hơn hoặc bằng thời gian kết thúc",
      });
      setLoading(false);
    } else {
      axios
        .get(
          "http://localhost:8080/api/admin/bill/getBillProductSellTheMost?day=" +
            encodeURIComponent(dateFrom.toISOString()) +
            "&dayTo=" +
            encodeURIComponent(dateTo.toISOString()),
          {
            headers: {
              Authorization: `Bearer ${getToken(true)}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          setData(res.data);
        })
        .catch((err) => {
          const status = err.response.status;
          if (status === 403) {
            notification.error({
              message: "Thông báo",
              description: "Bạn không có quyền truy cập!",
            });
          }
          console.log(err);
        });
    }
  }, [pageSize, date, dateToP, type]);
  return (
    <>
      <Table
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
          defaultPageSize: 5,
          style: { marginRight: "10px" },
          onChange: (currentPage, pageSize) => {
            setCurrentPage(currentPage);
            setPageSize(pageSize);
          },
        }}
        scroll={{ y: 360 }}
        columns={columns}
        dataSource={
          data &&
          data.map((record, index) => ({
            ...record,
            key: record.id,
          }))
        }
        loading={loading}
      />
    </>
  );
};

export default TableProdutSellTheMost;
