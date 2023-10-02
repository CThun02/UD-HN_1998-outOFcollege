import styles from "./ProductDetailsTable.module.css";

import React, { useEffect, useState } from "react";
import { Button, Col, message, Row, Table, Card, notification } from "antd";
import axios from "axios";
import ReactDOMServer from "react-dom/server";
import Input from "antd/es/input/Input";
import {
  AreaChartOutlined,
  CheckCircleTwoTone,
  DeleteFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import { saveImage } from "../../../config/FireBase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import Modal from "antd/es/modal/Modal";
import { useNavigate } from "react-router-dom";

var imgList = [];
const ProductDetailsTable = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [render, setRender] = useState(null);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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

  function createImgageDetail(productName, colorName, imgs) {
    for (let i = 0; i < imgs.length; i++) {
      if (i === 4) {
        break;
      }
      const currentTimeInMillis = new Date().getTime();
      const imgRef = ref(
        saveImage,
        `products/${productName}/${colorName}/${
          currentTimeInMillis + colorName
        }`
      );
      uploadBytes(imgRef, imgs[i]);
    }
  }

  function uploadImage(productName, colorName, imgs) {
    const reader = new FileReader();
    var save = {
      productName: productName,
      colorName: colorName,
      imgs: [],
      files: [],
    };

    for (let i = 0; i < imgList.length; i++) {
      if (imgList[i].colorName === colorName) {
        save.imgs = imgList[i].imgs;
        save.files = imgList[i].files;
      }
    }

    const loadImage = (imgIndex) => {
      if (imgIndex >= imgs.length) {
        // Đã tải xong tất cả ảnh
        let replaced = false;

        for (let i = 0; i < imgList.length; i++) {
          if (imgList[i].colorName === colorName) {
            save.imgs = imgList[i].imgs;
            save.files = imgList[i].files;
            imgList.splice(i, 1, save);
            replaced = true;
            break;
          }
        }

        if (!replaced) {
          imgList.push(save);
        }

        setRender(imgs);
        return;
      }

      const img = imgs[imgIndex];
      reader.onload = (e) => {
        if (save.imgs.length < 4) {
          save.imgs.push(e.target.result);
          save.files.push(imgs[imgIndex]);
          loadImage(imgIndex + 1); // Tiếp tục tải ảnh tiếp theo
        } else {
          messageApi.warning("Chỉ được chọn tối da 4 ảnh!", 3);
        }
      };
      reader.readAsDataURL(img);
    };

    loadImage(0); // Bắt đầu tải ảnh từ index 0
  }

  function deleteImageDetail(colorName, index) {
    for (let i = 0; i < imgList.length; i++) {
      if (imgList[i].colorName === colorName) {
        imgList[i].imgs.splice(index, 1);
        imgList[i].files.splice(index, 1);
        setRender(imgList[i].imgs.length === 0 ? true : imgList[i].imgs);
        break;
      }
    }
  }

  function deleteProductDetail(index, event) {
    const newStatus =
      productDetails[index].status === "DELETED" ? "ACTIVE" : "DELETED";
    productDetails[index].status = newStatus;

    const action = newStatus === "DELETED" ? "Xóa" : "Khôi phục";
    const iconElement =
      newStatus === "ACTIVE" ? <DeleteFilled /> : <ReloadOutlined />;
    event.innerHTML = ReactDOMServer.renderToString(iconElement);
    messageApi.success(`${action} thành công chi tiết sản phẩm!`, 2);
  }

  function createProductDetails() {
    for (let detail of productDetails) {
      let productDetailCreate = { ...productDetail };
      productDetailCreate.productId = product.id;
      productDetailCreate.buttonId = detail.button.id;
      productDetailCreate.collarId = detail.collar.id;
      productDetailCreate.colorId = detail.color.id;
      productDetailCreate.materialId = detail.material.id;
      productDetailCreate.shirtTailId = detail.shirtTail.id;
      productDetailCreate.sleeveId = detail.sleeve.id;
      productDetailCreate.sizeId = detail.size.id;
      productDetailCreate.price = detail.price;
      productDetailCreate.quantity = detail.quantity;
      productDetailCreate.status = detail.status;
      if (detail.status !== "DELETED") {
        axios
          .post(api + "product/createDetail", productDetailCreate)
          .then((response) => {})
          .catch((error) => {
            console.log(error);
          });
      }
    }
    for (let object of imgList) {
      createImgageDetail(object.productName, object.colorName, object.files);
    }
    messageApi.loading("loading", 3);
    setRender(productDetails);
    setTimeout(() => {
      notification.open({
        message: "Notification",
        description: "Thêm mới sản phẩm thành công",
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      });
      setTimeout(() => {
        navigate("/admin/product");
      }, 500);
    }, 3000);
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id, render]);
  return (
    <>
      {contextHolder}
      {colorsCreate &&
        colorsCreate.map((color, index) => {
          return (
            <div className={styles.product__DetailsTable} key={color.id}>
              <h2 style={{ marginBottom: "20px" }}>
                <div className={styles.product__DetailsColorTable}>
                  <span style={{ backgroundColor: color.value }}></span>
                  <p>{color.label}</p>
                </div>
              </h2>
              <Table
                footer={() => {
                  return (
                    <div style={{ textAlign: "center" }}>
                      <Button
                        style={{ marginLeft: "4px" }}
                        className={styles.product__updateButton}
                      >
                        <input
                          type="file"
                          onChange={(event) => {
                            uploadImage(
                              product.productName.replaceAll(" ", "_"),
                              color.label.replaceAll(" ", "_"),
                              event.target.files
                            );
                          }}
                          multiple={true}
                          id={color.label}
                          style={{ display: "none" }}
                        />
                        <label htmlFor={color.label}>
                          <AreaChartOutlined
                            className={styles.product__updateCreateButton}
                          />
                        </label>
                      </Button>
                    </div>
                  );
                }}
                dataSource={productDetails
                  .filter(
                    (record) => Number(record.color.id) === Number(color.key)
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
                    if (Number(record.color.id) === Number(color.key)) {
                      return record.button.name;
                    }
                  }}
                />
                <Table.Column
                  key="material"
                  title="Chất liệu"
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(color.key)) {
                      return record.material.name;
                    }
                  }}
                />
                <Table.Column
                  key="collar"
                  title="Cổ áo"
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(color.key)) {
                      return record.collar.name;
                    }
                  }}
                />
                <Table.Column
                  key="sleeve"
                  title="Tay áo"
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(color.key)) {
                      return record.sleeve.name;
                    }
                  }}
                />
                <Table.Column
                  key="shirtTail"
                  title="Đuôi áo"
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(color.key)) {
                      return record.shirtTail.name;
                    }
                  }}
                />
                <Table.Column
                  key="size"
                  title="Kích cỡ"
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(color.key)) {
                      return record.size.name;
                    }
                  }}
                />
                <Table.Column
                  key="quantity"
                  title="Số lượng"
                  width={200}
                  render={(text, record) => {
                    if (Number(record.color.id) === Number(color.key)) {
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
                    if (Number(record.color.id) === Number(color.key)) {
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
                    if (Number(record.color.id) === Number(color.key)) {
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
                  {imgList &&
                    imgList.map((object) => {
                      if (object.colorName === color.label) {
                        return (
                          object.imgs &&
                          object.imgs.map((img, index) => {
                            return (
                              <Col span={6}>
                                <div style={{ margin: "20px 40px" }}>
                                  <Card
                                    hoverable
                                    cover={<img alt="example" src={img} />}
                                    actions={[
                                      <DeleteFilled
                                        onClick={() => {
                                          deleteImageDetail(color.label, index);
                                        }}
                                        key="delete"
                                      />,
                                      <DeleteFilled key="edit" />,
                                    ]}
                                  ></Card>
                                </div>
                              </Col>
                            );
                          })
                        );
                      }
                    })}
                </Row>
              </div>
            </div>
          );
        })}
      <div className={styles.product_detailsCreate}>
        <Modal
          title="Thêm mới các chi tiết sản phẩm?"
          open={isModalOpen}
          onOk={createProductDetails}
          onCancel={handleCancel}
          icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
        >
          <p>Xác nhận thêm mới</p>
        </Modal>
        <Button onClick={showModal}>Hoàn thành</Button>
      </div>
    </>
  );
};

export default ProductDetailsTable;
