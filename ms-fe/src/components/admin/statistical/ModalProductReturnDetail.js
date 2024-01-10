import Modal from "antd/es/modal/Modal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../service/Token";
import { Row, Col, Table, notification, Carousel } from "antd";
import styles from "./StatisticalIndex.module.css";

const ModalProductReturnDetail = ({
  open,
  title,
  onCancel,
  productDetailId,
  reason,
}) => {
  const [data, setData] = useState(null);
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
      width: "50%",
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
                <Carousel  style={{maxWidth:"300px"}} autoplay>
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
      key: "note",
      datatIndex: "note",
      title: "Chi tiết",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "start" }}>
            <span style={{ fontWeight: "500" }}>Số lượng trả: </span>
            <span>{record.quantity}</span>
            <br />
            <span style={{ fontWeight: "500" }}>Tổng trả: </span>
            <span>
              {(record.price)?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
            <br />
            <span style={{ fontWeight: "500" }}>Ghi chú: </span>
            <span>{record.descriptionDetail}</span>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    if (productDetailId && reason) {
      axios
        .get(
          "http://localhost:8080/api/admin/product-return/getProductReturnDetailByProductDetailId?productDetailId=" +
            productDetailId +
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
          console.log(err);
        });
    }
  }, [productDetailId, reason, open]);

  return (
    <Modal
      width={1000}
      centered
      open={open}
      title={title}
      onCancel={() => {
        onCancel();
        setData(null);
      }}
      footer={null}
    >
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
            key: index,
          }))
        }
        loading={loading}
      />
    </Modal>
  );
};

export default ModalProductReturnDetail;
