import styles from "./ProductDetailsTable.module.css";
import "./style.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  message,
  Row,
  Table,
  Card,
  notification,
  Tooltip,
  Empty,
} from "antd";
import axios from "axios";
import Input from "antd/es/input/Input";
import {
  AreaChartOutlined,
  CheckCircleTwoTone,
  DeleteFilled,
  ReloadOutlined,
  StarFilled,
} from "@ant-design/icons";
import { saveImage } from "../../../config/FireBase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Confirm from "../confirm/Confirm";

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
  var colorsCreate = props.colorsCreate;
  var productDetailsDisplay = getProductDetailsDisplay();
  const [productImage, setProductImage] = useState({
    id: null,
    productId: product.id,
    colorId: "",
    path: "",
    isDefault: false,
    status: "ACTIVE",
  });
  const [productDetail, setProductDetail] = useState({
    productId: product.id,
    buttonId: " ",
    materialId: " ",
    collarId: " ",
    sleeveId: " ",
    sizeId: " ",
    colorId: " ",
    shirtTailId: " ",
    patternId: " ",
    formId: " ",
    price: 200000,
    quantity: 10,
    status: "ACTIVE",
  });
  function renderProductDetails() {
    for (var i = 0; i < props.productDetailsUpdate.length; i++) {
      let productDetailDisplay = {
        id: props.productDetailsUpdate[i].id,
        button: {
          id: props.productDetailsUpdate[i].button.id,
          name: props.productDetailsUpdate[i].button.buttonName,
        },
        material: {
          id: props.productDetailsUpdate[i].material.id,
          name: props.productDetailsUpdate[i].material.materialName,
        },
        collar: {
          id: props.productDetailsUpdate[i].collar.id,
          name: props.productDetailsUpdate[i].collar.collarTypeName,
        },
        shirtTail: {
          id: props.productDetailsUpdate[i].shirtTail.id,
          name: props.productDetailsUpdate[i].shirtTail.shirtTailTypeName,
        },
        sleeve: {
          id: props.productDetailsUpdate[i].sleeve.id,
          name: props.productDetailsUpdate[i].sleeve.sleeveName,
        },
        pattern: {
          id: props.productDetailsUpdate[i].pattern.id,
          name: props.productDetailsUpdate[i].pattern.patternName,
        },
        form: {
          id: props.productDetailsUpdate[i].form.id,
          name: props.productDetailsUpdate[i].form.colorName,
        },
        size: {
          id: props.productDetailsUpdate[i].size.id,
          name: props.productDetailsUpdate[i].size.sizeName,
        },
        color: {
          id: props.productDetailsUpdate[i].color.id,
          code: props.productDetailsUpdate[i].color.colorCode,
          name: props.productDetailsUpdate[i].color.colorName,
        },
        quantity: props.productDetailsUpdate[i].quantity,
        price: props.productDetailsUpdate[i].price,
        status: props.productDetailsUpdate[i].status,
      };
      props.productDetails.push(productDetailDisplay);
    }
  }

  function getProductDetailsDisplay() {
    let allProductDetailsCopy = [...props.productDetails];
    let uniQueProductDetails = [];

    for (let i = 0; i < allProductDetailsCopy.length; i++) {
      let productDetails = [allProductDetailsCopy[i]];
      let j = i + 1;

      while (j < allProductDetailsCopy.length) {
        if (
          allProductDetailsCopy[i].button.id ===
            allProductDetailsCopy[j].button.id &&
          allProductDetailsCopy[i].material.id ===
            allProductDetailsCopy[j].material.id &&
          allProductDetailsCopy[i].sleeve.id ===
            allProductDetailsCopy[j].sleeve.id &&
          allProductDetailsCopy[i].collar.id ===
            allProductDetailsCopy[j].collar.id &&
          allProductDetailsCopy[i].shirtTail.id ===
            allProductDetailsCopy[j].shirtTail.id &&
          allProductDetailsCopy[i].color.id ===
            allProductDetailsCopy[j].color.id &&
          allProductDetailsCopy[i].size.id === allProductDetailsCopy[j].size.id
        ) {
          // Nếu các thuộc tính giống nhau, bỏ qua
          j++;
        } else if (
          allProductDetailsCopy[i].button.id ===
            allProductDetailsCopy[j].button.id &&
          allProductDetailsCopy[i].material.id ===
            allProductDetailsCopy[j].material.id &&
          allProductDetailsCopy[i].sleeve.id ===
            allProductDetailsCopy[j].sleeve.id &&
          allProductDetailsCopy[i].collar.id ===
            allProductDetailsCopy[j].collar.id &&
          allProductDetailsCopy[i].shirtTail.id ===
            allProductDetailsCopy[j].shirtTail.id &&
          allProductDetailsCopy[i].color.id ===
            allProductDetailsCopy[j].color.id
        ) {
          // Nếu các thuộc tính trừ size giống nhau, thêm vào productDetails và loại bỏ khỏi mảng
          productDetails.push(allProductDetailsCopy.splice(j, 1)[0]);
        } else {
          j++;
        }
      }

      uniQueProductDetails.push(productDetails);
    }

    return uniQueProductDetails;
  }
  function createImgageDetail(productName, colorName, imgs) {
    for (let i = 0; i < imgs.length; i++) {
      if (i === 4) {
        break;
      }
      const currentTimeInMillis = new Date().getTime();
      const filename = currentTimeInMillis + productName;
      const color = colorsCreate.filter(
        (color) => color.label === colorName
      )[0];
      const imgRef = ref(
        saveImage,
        `products/${product.productName}/${colorName}/${filename}`
      );
      uploadBytes(imgRef, imgs[i].file)
        .then(() => {
          return getDownloadURL(imgRef);
        })
        .then((url) => {
          let productImageCreate = { ...productImage };
          productImageCreate.colorId = color.key;
          productImageCreate.path = url;
          if (imgs.isDefault) {
            productImageCreate.isDefault = true;
          }
          axios
            .post(api + "product/createProductImg", productImageCreate)
            .then((res) => {})
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function uploadImage(productName, colorName, imgs) {
    const reader = new FileReader();
    var save = {
      productName: productName,
      colorName: colorName,
      imgs: [],
      files: [],
      isDeleted: false,
    };

    for (let i = 0; i < imgList.length; i++) {
      if (imgList[i].colorName === colorName) {
        save.imgs = imgList[i].imgs;
        save.files = imgList[i].files;
      }
    }

    const loadImage = (imgIndex) => {
      if (save.imgs.length >= 4) {
        messageApi.warning("Chỉ được chọn tối đa 4 ảnh!", 2);
      }
      if (imgIndex >= imgs.length || save.imgs.length >= 4) {
        // Đã tải xong tất cả ảnh
        let replaced = false;
        for (let i = 0; i < imgList.length; i++) {
          if (imgList[i].colorName === colorName) {
            replaced = true;
            break;
          }
        }

        if (!replaced) {
          imgList.push(save);
        }
        return;
      }

      const img = imgs[imgIndex];
      reader.onload = (e) => {
        var fileObject = { file: img, default: false };
        save.imgs.push(e.target.result);
        save.files.push(fileObject);
        loadImage(imgIndex + 1); // Tiếp tục tải ảnh tiếp theo
        setRender(Math.random());
      };
      reader.readAsDataURL(img);
    };
    loadImage(0); // Bắt đầu tải ảnh từ index 0
  }

  function deleteImageDetail(colorName, index) {
    message.success("Xóa ảnh thành công!", 1);
    for (let i = 0; i < imgList.length; i++) {
      if (imgList[i].colorName === colorName) {
        imgList[i].imgs.splice(index, 1);
        imgList[i].files.splice(index, 1);
        setRender(Math.random());
        break;
      }
    }
  }

  function setDefaultImg(colorName, index) {
    for (let i = 0; i < imgList.length; i++) {
      if (imgList[i].colorName === colorName) {
        if (imgList[i].files[index].default === false) {
          imgList[i].files[index].default = true;
          imgList[i].isDefault = true;
          message.success("Đặt ảnh mặc định thành công!", 1);
        } else {
          imgList[i].files[index].default = false;
          imgList[i].isDefault = false;
          message.success("Hủy ảnh mặc định thành công!", 1);
        }
      }
    }
    setRender(Math.random());
  }

  function deleteProductDetail(index, event) {
    const newStatus =
      props.productDetails[index].status === "DELETED" ? "ACTIVE" : "DELETED";
    props.productDetails[index].status = newStatus;
    const action = newStatus === "DELETED" ? "Xóa" : "Khôi phục";
    messageApi.success(`${action} thành công chi tiết sản phẩm!`, 2);
    setRender(Math.random());
  }

  function createProductDetails() {
    props.setLoading(true);
    handleCancel();
    for (let detail of props.productDetails) {
      let productDetailCreate = { ...productDetail };
      productDetailCreate.productId = product.id;
      productDetailCreate.buttonId = detail.button.id;
      productDetailCreate.collarId = detail.collar.id;
      productDetailCreate.colorId = detail.color.id;
      productDetailCreate.materialId = detail.material.id;
      productDetailCreate.shirtTailId = detail.shirtTail.id;
      productDetailCreate.patternId = detail.pattern.id;
      productDetailCreate.formId = detail.form.id;
      productDetailCreate.sleeveId = detail.sleeve.id;
      productDetailCreate.sizeId = detail.size.id;
      productDetailCreate.price = detail.price;
      productDetailCreate.quantity = detail.quantity;
      productDetailCreate.status = detail.status;
      if (!productDetailCreate.status.includes("DELETED")) {
        axios
          .post(api + "product/createDetail", productDetailCreate)
          .then((response) => {})
          .catch((error) => {
            console.log(error);
          });
      }
    }
    for (let object of imgList) {
      if (!object.isDeleted) {
        createImgageDetail(object.productName, object.colorName, object.files);
      }
    }
    setRender(props.productDetails);
    setTimeout(() => {
      notification.open({
        message: "Notification",
        description: "Thêm mới các chi tiết sản phẩm thành công",
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      });
      setTimeout(() => {
        imgList = []; //reset
        navigate("/admin/product");
      }, 500);
    }, 1000);
  }
  if (props.productDetails.length === 0 || productDetailsDisplay.length === 0) {
    renderProductDetails();
    getProductDetailsDisplay();
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id, render]);
  return (
    <>
      {contextHolder}
      {productDetailsDisplay &&
        productDetailsDisplay.map((productDetails, index) => {
          let isDeleted = true;
          productDetails.filter((record) => {
            if (record.status === "ACTIVE") {
              isDeleted = false;
            }
          });
          for (let i = 0; i < imgList.length; i++) {
            if (productDetails[0].color.name === imgList[i].colorName) {
              imgList[i].isDeleted = isDeleted;
            }
          }
          return (
            <div className={styles.product__DetailsTable} key={index}>
              <h2 style={{ marginBottom: "20px" }}>
                <div className={styles.product__DetailsColorTable}>
                  <span
                    style={{
                      backgroundColor: productDetails[0].color.code,
                    }}
                  ></span>
                  <p>{productDetails[0].color.name}</p>
                </div>
              </h2>
              <p>
                {"[" +
                  "Nút: " +
                  productDetails[0].button.name +
                  " - " +
                  "Chất liệu: " +
                  productDetails[0].material.name +
                  " - " +
                  "Tay áo: " +
                  productDetails[0].sleeve.name +
                  " - " +
                  "Cổ áo: " +
                  productDetails[0].collar.name +
                  " - " +
                  "Đuôi áo: " +
                  productDetails[0].shirtTail.name +
                  " - " +
                  "Họa tiết: " +
                  productDetails[0].pattern.name +
                  " - " +
                  "Dáng áo: " +
                  productDetails[0].form.name +
                  "]"}
              </p>
              <br />
              <Table
                pagination={{ pageSize: 5 }}
                footer={() => {
                  return (
                    <div style={{ textAlign: "center" }}>
                      <Button
                        disabled={isDeleted}
                        style={{ marginLeft: "4px" }}
                        className={styles.product__updateButton}
                      >
                        <input
                          type="file"
                          onChange={(event) => {
                            uploadImage(
                              product.productName.replaceAll(" ", "_") +
                                productDetails[0].button.id +
                                productDetails[0].material.id +
                                productDetails[0].collar.id +
                                productDetails[0].sleeve.id +
                                productDetails[0].shirtTail.id +
                                productDetails[0].pattern.id +
                                productDetails[0].form.id,
                              productDetails[0].color.name.replaceAll(" ", "_"),
                              event.target.files
                            );
                          }}
                          multiple={true}
                          id={productDetails[0].color.name}
                          style={{ display: "none" }}
                        />
                        <label htmlFor={productDetails[0].color.name}>
                          <AreaChartOutlined
                            className={styles.product__updateCreateButton}
                          />
                        </label>
                      </Button>
                    </div>
                  );
                }}
                dataSource={
                  productDetails &&
                  productDetails.map((record) => ({
                    ...record,
                    key: record.id.toString(),
                  }))
                }
              >
                <Table.Column
                  key="#"
                  title="#"
                  render={(text, record, index) => index + 1}
                />
                <Table.Column
                  key="size"
                  title="Kích cỡ"
                  render={(text, record) => {
                    return record.size.name;
                  }}
                />
                <Table.Column
                  key="quantity"
                  title="Số lượng"
                  width={300}
                  render={(text, record, index) => {
                    return (
                      <Input
                        type={"number"}
                        id={`quantity${record.id}`}
                        onBlur={(event) => {
                          props.productDetails[record.id].quantity =
                            event.target.value;
                        }}
                        disabled={record.status === "DELETED"}
                        defaultValue={record.quantity}
                        style={{ textAlign: "center" }}
                      />
                    );
                  }}
                />
                <Table.Column
                  key="price"
                  title="Giá"
                  width={300}
                  render={(text, record, index) => {
                    return (
                      <Input
                        type={"number"}
                        id={`price${record.id}`}
                        onBlur={(event) => {
                          props.productDetails[record.id].price =
                            event.target.value;
                        }}
                        disabled={record.status === "DELETED"}
                        defaultValue={record.price}
                        style={{ textAlign: "center" }}
                      />
                    );
                  }}
                />
                <Table.Column
                  key="action"
                  title="Thao Tác"
                  width={100}
                  render={(text, record, index) => {
                    return (
                      <Button
                        onClick={(event) => {
                          deleteProductDetail(record.id, event.target);
                        }}
                      >
                        {record.status === "ACTIVE" ? (
                          <DeleteFilled />
                        ) : (
                          <ReloadOutlined />
                        )}
                      </Button>
                    );
                  }}
                />
              </Table>

              <Row style={{ margin: "16px 30px" }}>
                <Col span={20} offset={2}>
                  <Row>
                    {imgList &&
                      imgList.map((object) => {
                        if (
                          object.colorName === productDetails[0].color.name &&
                          !object.isDeleted
                        ) {
                          return (
                            object.imgs &&
                            object.imgs.map((img, index) => {
                              return (
                                <Col span={6} key={index}>
                                  <div style={{ margin: "20px 40px" }}>
                                    <Card
                                      hoverable
                                      cover={
                                        <Tooltip
                                          placement="right"
                                          title={
                                            isDeleted
                                              ? "No products added"
                                              : `click to ${
                                                  object.files[index]
                                                    .default === true
                                                    ? "cancel"
                                                    : "set"
                                                } image default`
                                          }
                                        >
                                          <img
                                            onClick={() =>
                                              isDeleted
                                                ? {}
                                                : setDefaultImg(
                                                    productDetails[0].color
                                                      .name,
                                                    index
                                                  )
                                            }
                                            alt="example"
                                            src={img}
                                          />
                                        </Tooltip>
                                      }
                                      actions={[
                                        <DeleteFilled
                                          style={{ fontSize: "16px" }}
                                          onClick={() =>
                                            isDeleted
                                              ? {}
                                              : deleteImageDetail(
                                                  productDetails[0].color.name,
                                                  index
                                                )
                                          }
                                          key="delete"
                                        />,
                                        <StarFilled
                                          key="setDefault"
                                          className={styles.defaultImage}
                                          onClick={() =>
                                            isDeleted
                                              ? {}
                                              : setDefaultImg(
                                                  productDetails[0].color.name,
                                                  index
                                                )
                                          }
                                          style={
                                            object.files[index].default === true
                                              ? {
                                                  color: "rgb(192, 192, 76) ",
                                                }
                                              : {}
                                          }
                                        />,
                                      ]}
                                    ></Card>
                                  </div>
                                </Col>
                              );
                            })
                          );
                        } else {
                          return null;
                        }
                      })}
                  </Row>
                </Col>
              </Row>
            </div>
          );
        })}
      <div className={styles.product_detailsCreate}>
        <Confirm
          isModalOpen={isModalOpen}
          handelOk={createProductDetails}
          handleCancel={handleCancel}
        />
        <Button onClick={showModal}>Hoàn thành</Button>
      </div>
    </>
  );
};

export default ProductDetailsTable;
