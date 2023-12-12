import { Badge, Carousel, Col, Row, Table, notification, Button } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./StatisticalIndex.module.css";
import { getToken } from "../../../service/Token";
import { EyeOutlined } from "@ant-design/icons";
import ModalProductReturnDetail from "./ModalProductReturnDetail";

const ProductReturns = ({ date, dateToP, type, reason }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [openModalProductReturns, setOpenModalProductReturns] = useState(false);
  const [productDetailId, setProductDetailId] = useState("");

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
            <Col span={4}>
              <div
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                }}
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
              </div>
            </Col>
            <Col span={20}>
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
      title: "Số lượng trả",
      render: (text, record, index) => {
        return record.quantity;
      },
    },
    {
      key: "total",
      datatIndex: "total",
      title: "Tổng Trả",
      render: (text, record, index) => {
        return record.price?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      },
    },
    {
      key: "action",
      title: "Thao tác",
      render: (text, record, index) => {
        return (
          <Button
            size="large"
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => {
              setProductDetailId(record.id);
              setOpenModalProductReturns(true);
            }}
          />
        );
      },
    },
  ];
  useEffect(() => {
    var dateFrom = new Date(type === "other" ? date : dateToP);
    var dateTo = new Date(dateToP);
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
      dateTo.setDate(getLastDayOfMonth(dateFrom.getMonth()));
    } else if (type === "year") {
      dateFrom.setDate(1);
      dateTo.setDate(getLastDayOfMonth(11));
      dateFrom.setMonth(0);
      dateTo.setMonth(11);
    }
    dateFrom.setHours(dateFrom.getHours() + 7);
    dateTo.setHours(dateTo.getHours() + 7);
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
          "http://localhost:8080/api/admin/product-return/getProductReturnByDateAndReason?day=" +
            encodeURIComponent(dateFrom.toISOString()) +
            "&dayTo=" +
            encodeURIComponent(dateTo.toISOString()) +
            "&reason=" +
            reason,
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
        });
    }
  }, [pageSize, date, dateToP, type, reason, openModalProductReturns]);
  return (
    <>
      <ModalProductReturnDetail
        onCancel={() => setOpenModalProductReturns(false)}
        open={openModalProductReturns}
        title={"Chi tiết sản phẩm hoàn trả"}
        productDetailId={productDetailId}
        reason={reason}
      />
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

export default ProductReturns;
