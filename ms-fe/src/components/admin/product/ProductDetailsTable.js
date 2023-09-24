import styles from "./ProductDetailsTable.module.css";

import React, { useEffect, useState } from "react";
import { Button, Col, message, Row, Table } from "antd";
import axios from "axios";
import Input from "antd/es/input/Input";
import {
  DeleteFilled,
  PlusCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import Checkbox from "antd/es/checkbox/Checkbox";

const ProductDetailsTable = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const product = props.product;
  const [productDetail, setProductDetail] = useState(props.productDetail);
  const buttonId = productDetail.button.id;
  const materialId = productDetail.material.id;
  const collarId = productDetail.collar.id;
  const sleeveId = productDetail.sleeve.id;
  const shirtTailId = productDetail.shirtTail.id;
  const [colors, setColors] = useState(null);
  const [listSizes, setlistSizes] = useState([]);
  const [render, renderChange] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colorsCreate, setColorsCreate] = useState([]);
  const [sizesCreate, setSizesCreate] = useState([]);

  const columns = [
    {
      key: "productname",
      dataIndex: "productname",
      title: "Tên sản phẩm",
      render: () => {
        return product.productName;
      },
    },
    {
      key: "size",
      dataIndex: "size",
      title: "Kích cỡ",
      render: (text, record, index) => {
        return record.size.sizeName;
      },
    },
    {
      key: "quantity",
      dataIndex: "quantity",
      title: "Số lượng",
      render: (text, record, index) => {
        return (
          <Input
            style={{ width: "100px", textAlign: "center" }}
            defaultValue={record.quantity}
            type={"number"}
            onBlur={(event) => updateProductDetail("quantity", event, record)}
            disabled={record.status === "DELETED"}
          ></Input>
        );
      },
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Giá",
      render: (text, record, index) => {
        return (
          <Input
            style={{ width: "100px", textAlign: "center" }}
            defaultValue={record.price}
            type={"number"}
            onBlur={(event) => updateProductDetail("price", event, record)}
            disabled={record.status === "DELETED"}
          ></Input>
        );
      },
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Thao tác",
      render: (text, record, index) => {
        return (
          <Button
            onClick={() => {
              deleteProductDetail(record);
            }}
          >
            {record.status === "DELETED" ? (
              <ReloadOutlined />
            ) : (
              <DeleteFilled />
            )}
          </Button>
        );
      },
    },
  ];
  function showModal() {
    setIsModalOpen(true);
  }

  function handleOk() {
    setIsModalOpen(false);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }
  async function getSizes(Colors) {
    try {
      let list = [];
      for (let color of Colors) {
        const response = await axios.get(
          api +
            "product/getSizesByIdComPdAndIdPro?productId=" +
            product.id +
            "&buttonId=" +
            buttonId +
            "&materialId=" +
            materialId +
            "&shirtTailId=" +
            shirtTailId +
            "&sleeveId=" +
            sleeveId +
            "&collarId=" +
            collarId +
            "&colorId=" +
            color.id
        );
        list.push(response.data);
      }
      setlistSizes(list);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  function updateProductDetail(fildeName, event, productDetail) {
    fildeName === "quantity"
      ? (productDetail.quantity = event.target.value)
      : (productDetail.price = event.target.value);
    if (event.target.value.trim() !== "") {
      event.target.style.removeProperty("border");
      axios
        .put(api + "product/updateProductDetail", productDetail)
        .then((response) => {
          messageApi.loading("Đang tải!", 0.5);
          setTimeout(() => {
            messageApi.success("Chỉnh sửa chi tiết sản phẩm thành công!", 2);
          }, 500);
        })
        .catch((error) => {
          messageApi.error("Chỉnh sửa chi tiết sản phẩm thất bại!", 2);
          console.log(error);
        });
    } else {
      messageApi.error("Vui lòng nhập đủ tất cả các trường!", 2);
      event.target.style.border = "1px solid red";
    }
  }

  function deleteProductDetail(productDetail) {
    productDetail.status === "DELETED"
      ? (productDetail.status = "ACTIVE")
      : (productDetail.status = "DELETED");
    axios
      .put(api + "product/updateProductDetail?method=Deleted", productDetail)
      .then((response) => {
        messageApi.loading("Đang tải!", 0.5);
        setTimeout(() => {
          messageApi.success(
            productDetail.status === "DELETED"
              ? "Xóa thành công!"
              : "Khôi phục thành công!",
            2
          );
        }, 500);
      })
      .catch((error) => {
        messageApi.error(
          productDetail.status === "DELETED"
            ? "Xóa thất bại!"
            : "Khôi phục thất bại",
          2
        );
        console.log(error);
      });
    renderChange(productDetail);
  }

  useEffect(() => {
    axios
      .get(
        api +
          "product/getColorsByIdComPdAndIdPro?productId=" +
          product.id +
          "&buttonId=" +
          buttonId +
          "&materialId=" +
          materialId +
          "&shirtTailId=" +
          shirtTailId +
          "&sleeveId=" +
          sleeveId +
          "&collarId=" +
          collarId
      )
      .then((res) => {
        console.log(res.data);
        setColors(res.data);
        getSizes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(api + "color")
      .then((res) => {
        setColorsCreate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(api + "size")
      .then((res) => {
        setSizesCreate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    buttonId,
    collarId,
    materialId,
    product.id,
    productDetail.product.id,
    shirtTailId,
    sleeveId,
    render,
  ]);
  return (
    <>
      {contextHolder}
      {colors &&
        colors.map((item, index) => {
          return (
            <div className={styles.product__DetailsTable} key={item.id}>
              <h2 style={{ marginBottom: "20px" }}>
                <div className={styles.product__DetailsColorTable}>
                  <span style={{ backgroundColor: item.colorCode }}></span>
                  <p>{item.colorName}</p>
                </div>
              </h2>
              <Table
                columns={columns}
                dataSource={
                  listSizes[index] &&
                  listSizes[index].map((record, index) => ({
                    ...record,
                    key: index,
                  }))
                }
                pagination={false}
                footer={(record) => {
                  return (
                    <div style={{ textAlign: "center" }}>
                      <Button
                        className={styles.product__updateButton}
                        onClick={showModal}
                      >
                        <PlusCircleOutlined
                          className={styles.product__updateCreateButton}
                        />
                      </Button>
                      <Modal
                        title="Thêm kích cỡ"
                        visible={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        key={item.id}
                      >
                        <h2 className={styles.product__DetailsColorTable}>
                          <span
                            style={{ backgroundColor: item.colorCode }}
                          ></span>
                          <p>{item.colorName}</p>
                        </h2>
                        <Checkbox.Group style={{ width: "100%" }}>
                          <Row>
                            {sizesCreate &&
                              sizesCreate.map((item) => {
                                return (
                                  <Col span={8} key={item.id}>
                                    <Checkbox value={item.id}>
                                      {item.sizeName}
                                    </Checkbox>
                                  </Col>
                                );
                              })}
                          </Row>
                        </Checkbox.Group>
                      </Modal>
                    </div>
                  );
                }}
              ></Table>
            </div>
          );
        })}
    </>
  );
};

export default ProductDetailsTable;
