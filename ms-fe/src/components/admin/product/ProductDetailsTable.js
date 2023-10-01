import styles from "./ProductDetailsTable.module.css";

import React, { useEffect, useState } from "react";
import { Button, Col, message, Row, Table, Card } from "antd";
import axios from "axios";
import ReactDOMServer from "react-dom/server";
import Input from "antd/es/input/Input";
import {
  AreaChartOutlined,
  DeleteFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import { saveImage } from "../../../config/FireBase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const ProductDetailsTable = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  var product = props.product;
  const [productDetail, setProductDetail] = useState({
    productId: product.id,
    buttonId: " ",
    materialId: " ",
    collarId: " ",
    sleeveId: " ",
    sizeId: " ",
    colorId: " ",
    shirtTailId: " ",
    price: 200000,
    quantity: 1,
  });
  var buttonsCreate = props.buttonsCreate;
  var materialsCreate = props.materialsCreate;
  var collarsCreate = props.collarsCreate;
  var shirtTailsCreate = props.shirtTailsCreate;
  var sleevesCreate = props.sleevesCreate;
  var colorsCreate = props.colorsCreate;
  var sizesCreate = props.sizesCreate;
  const [render, setRender] = useState();
  var productDetails = renderProductDetails();

  function renderProductDetails() {
    let list = [];
    if (
      buttonsCreate.length > 0 &&
      materialsCreate.length > 0 &&
      collarsCreate.length > 0 &&
      shirtTailsCreate.length > 0 &&
      sleevesCreate.length > 0 &&
      colorsCreate.length > 0 &&
      sizesCreate.length > 0
    ) {
      var index = 0;
      for (let button of buttonsCreate) {
        for (let material of materialsCreate) {
          for (let collar of collarsCreate) {
            for (let sleeve of sleevesCreate) {
              for (let shirtTail of shirtTailsCreate) {
                for (let size of sizesCreate) {
                  for (let color of colorsCreate) {
                    let productDetailDisplay = {
                      id: index++,
                      button: {
                        id: button.key,
                        name: button.label,
                      },
                      material: {
                        id: material.key,
                        name: material.label,
                      },
                      collar: {
                        id: collar.key,
                        name: collar.label,
                      },
                      shirtTail: {
                        id: shirtTail.key,
                        name: shirtTail.label,
                      },
                      sleeve: {
                        id: sleeve.key,
                        name: sleeve.label,
                      },
                      size: {
                        id: size.key,
                        name: size.label,
                      },
                      color: {
                        id: color.key,
                        code: color.value,
                        name: color.label,
                      },
                      quantity: 10,
                      price: 200000,
                      status: "ACTIVE",
                    };
                    list.push(productDetailDisplay);
                  }
                }
              }
            }
          }
        }
      }
    }
    return list;
  }

  function uploadImage(productName, colorName, imgs) {
    for (let img of imgs) {
      const currentTimeInMillis = new Date().getTime();
      const imgRef = ref(
        saveImage,
        `products/${productName}/${colorName}/${currentTimeInMillis + img.name}`
      );
      uploadBytes(imgRef, img);
    }
  }

  function deleteProductDetail(index, event) {
    const newStatus =
      productDetails[index].status === "DELETED" ? "ACTIVE" : "DELETED";
    productDetails[index].status = newStatus;
    const iconElement =
      newStatus === "ACTIVE" ? <DeleteFilled /> : <ReloadOutlined />;
    event.innerHTML = ReactDOMServer.renderToString(iconElement);

    const action = newStatus === "DELETED" ? "Xóa" : "Khôi phục";
    messageApi.success(`${action} thành công chi tiết sản phẩm!`, 2);
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id, render]);
  return (
    <>
      {contextHolder}
      {colorsCreate &&
        colorsCreate.map((item, index) => {
          return (
            <div className={styles.product__DetailsTable} key={item.id}>
              <h2 style={{ marginBottom: "20px" }}>
                <div className={styles.product__DetailsColorTable}>
                  <span style={{ backgroundColor: item.value }}></span>
                  <p>{item.label}</p>
                </div>
              </h2>
              <Table
                pagination={false}
                footer={() => (
                  <div style={{ textAlign: "center" }}>
                    <Button
                      style={{ marginLeft: "4px" }}
                      className={styles.product__updateButton}
                    >
                      <input
                        type="file"
                        onChange={(event) => {
                          uploadImage(
                            product.productName.replace(" ", "_"),
                            item.keyName.replace(" ", "_"),
                            event.target.files
                          );
                        }}
                        multiple={true}
                        id="upload"
                        style={{ display: "none" }}
                      />
                      <label htmlFor="upload">
                        <AreaChartOutlined
                          className={styles.product__updateCreateButton}
                        />
                      </label>
                    </Button>
                  </div>
                )}
                dataSource={productDetails
                  .filter(
                    (record) => Number(record.color.id) === Number(item.key)
                  )
                  .map((record, index) => ({
                    ...record,
                    key: index.toString(),
                  }))}
              >
                <Table.Column
                  key="#"
                  title="#"
                  render={(text, record, index) => index + 1}
                />
                <Table.Column
                  key="button"
                  title="Nút áo"
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(item.key)) {
                      return record.button.name;
                    }
                  }}
                />
                <Table.Column
                  key="material"
                  title="Chất liệu"
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(item.key)) {
                      return record.material.name;
                    }
                  }}
                />
                <Table.Column
                  key="collar"
                  title="Cổ áo"
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(item.key)) {
                      return record.collar.name;
                    }
                  }}
                />
                <Table.Column
                  key="sleeve"
                  title="Tay áo"
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(item.key)) {
                      return record.sleeve.name;
                    }
                  }}
                />
                <Table.Column
                  key="shirtTail"
                  title="Đuôi áo"
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(item.key)) {
                      return record.shirtTail.name;
                    }
                  }}
                />
                <Table.Column
                  key="size"
                  title="Kích cỡ"
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(item.key)) {
                      return record.size.name;
                    }
                  }}
                />
                <Table.Column
                  key="quantity"
                  title="Số lượng"
                  width={200}
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(item.key)) {
                      return (
                        <Input
                          id={`quantity${record.id}`}
                          onChange={(event) => {
                            productDetails[record.id].quantity =
                              event.target.value;
                          }}
                          defaultValue={10}
                          style={{ textAlign: "center" }}
                        />
                      );
                    }
                  }}
                />
                <Table.Column
                  key="price"
                  title="Giá"
                  width={200}
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(item.key)) {
                      return (
                        <Input
                          id={`price${record.id}`}
                          onChange={(event) => {
                            productDetails[record.id].price =
                              event.target.value;
                          }}
                          defaultValue={200000}
                          style={{ textAlign: "center" }}
                        />
                      );
                    }
                  }}
                />
                <Table.Column
                  key="action"
                  title="Thao Tác"
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(item.key)) {
                      return (
                        <Button
                          onClick={(event) => {
                            deleteProductDetail(record.id, event.target);
                          }}
                        >
                          <DeleteFilled id={`icondelete${record.id}`} />
                        </Button>
                      );
                    }
                  }}
                />
              </Table>
              <div style={{ margin: "16px 30px" }}>
                <Row>
                  <Col span={3} key={item.id}>
                    <Card hoverable cover={<img alt="example" src={item} />}>
                      <DeleteFilled />
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          );
        })}
      <div className={styles.product_detailsCreate}>
        <Button>Hoàn thành</Button>
      </div>
    </>
  );
};

export default ProductDetailsTable;
