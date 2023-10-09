import styles from "./ProductDetailsTable.module.css";

import React, { useEffect, useState } from "react";
import { Button, Col, message, Row, Table, Card, notification } from "antd";
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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Modal from "antd/es/modal/Modal";
import { useNavigate } from "react-router-dom";

var imgList = [];
const ProductDetailsTable = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [render, setRender] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const isUpdate = props.isUpdate;
  var product = props.product;
  var colorsCreate = props.colorsCreate;
  const [imgDefault, setImgDefault] = useState(product.imgDefault);
  const [productImage, setProductImage] = useState({
    id: null,
    productId: product.id,
    colorId: "",
    path: "",
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
    price: 200000,
    quantity: 1,
    status: "ACTIVE",
  });
  function renderProductDetails() {
    if (isUpdate) {
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
  }
  function createImgageDetail(productName, colorName, imgs) {
    for (let i = 0; i < imgs.length; i++) {
      if (i === 4) {
        break;
      }
      const currentTimeInMillis = new Date().getTime();
      const filename = currentTimeInMillis + colorName;
      const color = colorsCreate.filter(
        (color) => color.label === colorName
      )[0];
      const imgRef = ref(
        saveImage,
        `products/${productName}/${colorName}/${filename}`
      );
      uploadBytes(imgRef, imgs[i].file)
        .then(() => {
          return getDownloadURL(imgRef);
        })
        .then((url) => {
          let productImageCreate = { ...productImage };
          productImageCreate.colorId = color.key;
          productImageCreate.path = url;
          axios
            .post(api + "product/createProductImg", productImageCreate)
            .then((res) => {})
            .catch((err) => {
              console.log(err);
            });
          if (imgs[i].default === true) {
            let productUpdate = {
              id: product.id,
              productCode: product.productCode,
              productName: product.productName,
              brandId: product.brand.id,
              categoryId: product.category.id,
              formId: product.form.id,
              patternId: product.pattern.id,
              description: product.description,
              status: product.status,
              imgDefault: url,
            };
            axios
              .put(api + "product/update", productUpdate)
              .then((response) => {})
              .catch((err) => console.log(err));
          }
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
            replaced = true;
            break;
          }
        }

        if (!replaced) {
          imgList.push(save);
          imgList[0].files[0].default = true;
        }
        props.setImgDefault(imgList[0].imgs[0]);
        setRender(Math.random());
        return;
      }

      const img = imgs[imgIndex];
      reader.onload = (e) => {
        if (save.imgs.length < 4) {
          var fileObject = { file: img, default: false };
          save.imgs.push(e.target.result);
          save.files.push(fileObject);
          loadImage(imgIndex + 1); // Tiếp tục tải ảnh tiếp theo
        } else {
          messageApi.warning("Chỉ được chọn tối da 4 ảnh!", 3);
        }
      };
      reader.readAsDataURL(img);
    };

    loadImage(0); // Bắt đầu tải ảnh từ index 0
  }
  function addProductImage(color, img) {
    let images = productImages.filter(
      (item) => item.color.colorName === color.label
    );

    if (images.length < 4) {
      const currentTimeInMillis = new Date().getTime();
      const colorName = color.label.replaceAll(" ", "_");
      const productName = product.productName.replaceAll(" ", "_");
      const filename = currentTimeInMillis + colorName;
      const imgRef = ref(
        saveImage,
        `products/${productName}/${colorName}/${filename}`
      );
      uploadBytes(imgRef, img)
        .then(() => {
          return getDownloadURL(imgRef);
        })
        .then((url) => {
          let productImageCreate = { ...productImage };
          productImageCreate.colorId = color.key;
          productImageCreate.path = url;
          axios
            .post(api + "product/createProductImg", productImageCreate)
            .then((res) => {
              message.success("Thêm ảnh thành công!", 2);
              props.render(Math.random());
              setRender(Math.random());
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else {
      message.error("Mỗi màu sắc tối đa 4 hình ảnh!", 2);
    }
  }

  function deleteImageDetail(colorName, index, productImage) {
    if (isUpdate) {
      const refImage = ref(saveImage, productImage.path);
      if (imgDefault === productImage.path) {
        message.warning("Không thể xóa ảnh mặc định!", 2);
      } else {
        deleteObject(refImage)
          .then(() => {})
          .catch((err) => {
            console.log(err);
            message.error("Đã xảy ra lỗi! Vui lòng thử lại sau", 2);
          });
        axios
          .delete(api + "product/deleteProductImage?id=" + productImage.id)
          .then(() => {
            message.success("Xóa ảnh thành công!", 2);
            props.render(Math.random());
            setRender(Math.random());
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      let imgEmpty = true;
      for (let i = 0; i < imgList.length; i++) {
        if (imgList[i].colorName === colorName) {
          imgList[i].imgs.splice(index, 1);
          imgList[i].files.splice(index, 1);
          if (imgList[i].imgs.length !== 0 && imgEmpty) {
            imgEmpty = false;
            props.setImgDefault(imgList[i].imgs[0]);
            setDefaultImg(colorName, index);
          }
          setRender(Math.random());
          break;
        }
      }
    }
  }

  function setDefaultImg(colorName, index, path) {
    if (isUpdate) {
      if (path !== null) {
        setImgDefault(path);
        let productUpdate = {
          id: product.id,
          productCode: product.productCode,
          productName: product.productName,
          brandId: product.brand.id,
          categoryId: product.category.id,
          formId: product.form.id,
          patternId: product.pattern.id,
          description: product.description,
          status: product.status,
          imgDefault: path,
        };
        axios
          .put(api + "product/update", productUpdate)
          .then((response) => {
            message.success("Đặt ảnh mặc định thành công!", 2);
            props.render(Math.random());
            setRender(Math.random());
          })
          .catch((err) => console.log(err));
      }
    } else {
      for (let i = 0; i < imgList.length; i++) {
        if (imgList[i].colorName === colorName) {
          imgList[i].files[index].default = true;
          props.setImgDefault(imgList[i].imgs[index]);
        }
        for (let j = 0; j < imgList[i].files.length; j++) {
          if (j === index && imgList[i].colorName === colorName) {
            continue;
          }
          imgList[i].files[j].default = false;
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
    handleCancel();
    for (let detail of props.productDetails) {
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
    }, 3000);
  }
  function updateProductDetail(field, value, productDetailId) {
    let productDetailEdit = props.productDetails.filter(
      (pd) => pd.id === productDetailId
    );
    if (Number(value) !== Number(productDetailEdit[0].quantity)) {
      if (Number(value) !== Number(productDetailEdit[0].price)) {
        let productDetailUpdate = {
          id: productDetailEdit[0].id,
          productId: product.id,
          buttonId: productDetailEdit[0].button.id,
          materialId: productDetailEdit[0].material.id,
          collarId: productDetailEdit[0].collar.id,
          sleeveId: productDetailEdit[0].sleeve.id,
          shirtTailId: productDetailEdit[0].shirtTail.id,
          sizeId: productDetailEdit[0].size.id,
          colorId: productDetailEdit[0].color.id,
          price: productDetailEdit[0].price,
          quantity: productDetailEdit[0].quantity,
          status: productDetailEdit[0].status,
        };
        if (field === "quantity") {
          productDetailUpdate.quantity = value;
          props.productDetails.filter(
            (pd) => pd.id === productDetailId
          )[0].quantity = value;
        } else if (field === "price") {
          productDetailUpdate.price = value;
          props.productDetails.filter(
            (pd) => pd.id === productDetailId
          )[0].price = value;
        } else {
          productDetailUpdate.status =
            productDetailUpdate.status === "ACTIVE" ? "DELETED" : "ACTIVE";
          props.productDetails.filter(
            (pd) => pd.id === productDetailId
          )[0].status = productDetailUpdate.status;
        }
        let method = field !== "status" ? "update" : "Deleted";
        axios
          .put(
            api + "product/updateProductDetail?method=" + method,
            productDetailUpdate
          )
          .then((res) => {
            message.loading("loading!", 0.5);
            setTimeout(() => {
              if (field === "quantity" || field === "price") {
                message.success("Chỉnh sửa sản phẩm thành công!", 2);
              } else {
                message.success(
                  `${
                    productDetailUpdate.status === "ACTIVE"
                      ? "Khôi phục "
                      : "Xóa"
                  } sản phẩm thành công!`,
                  2
                );
              }
              props.render(Math.random());
              setRender(Math.random());
            }, 500);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
  async function deleteOrReloadByColor(productDetails, functionName) {
    for (let i = 0; i < productDetails.length; i++) {
      if (functionName === "delete") {
        productDetails[i].status = "DELETED";
      } else {
        productDetails[i].status = "ACTIVE";
      }
      let productDetailUpdate = {
        id: productDetails[i].id,
        productId: product.id,
        buttonId: productDetails[i].button.id,
        materialId: productDetails[i].material.id,
        collarId: productDetails[i].collar.id,
        sleeveId: productDetails[i].sleeve.id,
        shirtTailId: productDetails[i].shirtTail.id,
        sizeId: productDetails[i].size.id,
        colorId: productDetails[i].color.id,
        price: productDetails[i].price,
        quantity: productDetails[i].quantity,
        status: productDetails[i].status,
      };
      await axios
        .put(
          api + "product/updateProductDetail?method=Deleted",
          productDetailUpdate
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
          return;
        });
    }
    message.loading("loading!", 2);
    setTimeout(() => {
      message.success(
        `${
          productDetails[0].status === "ACTIVE" ? "Khôi phục " : "Xóa"
        } sản phẩm thành công!`,
        2
      );
      props.render(Math.random());
      setRender(Math.random());
    }, 2000);
  }
  if (props.productDetails.length === 0) {
    renderProductDetails();
  }
  useEffect(() => {
    if (isUpdate) {
      axios
        .get(api + "product/getProductImageByProductId?productId=" + product.id)
        .then((response) => {
          setProductImages(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id, render]);
  return (
    <>
      {contextHolder}
      {colorsCreate &&
        colorsCreate.map((color, index) => {
          let isDeleted = true;
          props.productDetails.filter((record) => {
            if (Number(record.color.id) === Number(color.key)) {
              if (record.status === "ACTIVE") {
                isDeleted = false;
              }
            }
          });
          return (
            <div className={styles.product__DetailsTable} key={index}>
              <h2 style={{ marginBottom: "20px" }}>
                <div className={styles.product__DetailsColorTable}>
                  <span style={{ backgroundColor: color.value }}></span>
                  <p>{color.label}</p>
                  {isUpdate ? (
                    <Button
                      style={{
                        marginLeft: "auto",
                        border: "none",
                        boxShadow: "none",
                      }}
                    >
                      {isDeleted ? (
                        <ReloadOutlined
                          onClick={() =>
                            deleteOrReloadByColor(
                              props.productDetailsUpdate.filter((record) => {
                                return (
                                  Number(record.color.id) === Number(color.key)
                                );
                              }),
                              "update"
                            )
                          }
                          style={{ fontSize: "24px" }}
                        />
                      ) : (
                        <DeleteFilled
                          onClick={() =>
                            deleteOrReloadByColor(
                              props.productDetailsUpdate.filter((record) => {
                                return (
                                  Number(record.color.id) === Number(color.key)
                                );
                              }),
                              "delete"
                            )
                          }
                          style={{ fontSize: "24px" }}
                        />
                      )}
                    </Button>
                  ) : null}
                </div>
              </h2>
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
                            isUpdate
                              ? addProductImage(color, event.target.files[0])
                              : uploadImage(
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
                dataSource={
                  props.productDetails &&
                  props.productDetails
                    .filter((record) => {
                      return Number(record.color.id) === Number(color.key);
                    })
                    .map((record) => ({
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
                  render={(text, record, index) => {
                    if (Number(record.color.id) === Number(color.key)) {
                      return (
                        <Input
                          type={"number"}
                          id={`quantity${record.id}`}
                          onBlur={(event) => {
                            isUpdate
                              ? updateProductDetail(
                                  "quantity",
                                  event.target.value,
                                  record.id
                                )
                              : (props.productDetails[record.id].quantity =
                                  event.target.value);
                          }}
                          disabled={record.status === "DELETED"}
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
                  render={(text, record, index) => {
                    if (Number(record.color.id) === Number(color.key)) {
                      return (
                        <Input
                          type={"number"}
                          id={`price${record.id}`}
                          onBlur={(event) => {
                            isUpdate
                              ? updateProductDetail(
                                  "price",
                                  event.target.value,
                                  record.id
                                )
                              : (props.productDetails[record.id].price =
                                  event.target.value);
                          }}
                          disabled={record.status === "DELETED"}
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
                  render={(text, record, index) => {
                    if (Number(record.color.id) === Number(color.key)) {
                      return (
                        <Button
                          onClick={(event) => {
                            isUpdate
                              ? updateProductDetail(
                                  "status",
                                  record.status,
                                  record.id
                                )
                              : deleteProductDetail(record.id, event.target);
                          }}
                        >
                          {record.status === "ACTIVE" ? (
                            <DeleteFilled />
                          ) : (
                            <ReloadOutlined />
                          )}
                        </Button>
                      );
                    }
                  }}
                />
              </Table>

              <div style={{ margin: "16px 30px" }}>
                <Row>
                  {!isUpdate
                    ? imgList &&
                      imgList.map((object, index) => {
                        if (object.colorName === color.label) {
                          return (
                            object.imgs &&
                            object.imgs.map((img, index) => {
                              return (
                                <Col span={6} key={index}>
                                  <div style={{ margin: "20px 40px" }}>
                                    <Card
                                      hoverable
                                      cover={<img alt="example" src={img} />}
                                      actions={[
                                        <DeleteFilled
                                          onClick={() => {
                                            deleteImageDetail(
                                              color.label,
                                              index
                                            );
                                          }}
                                          key="delete"
                                        />,
                                        <StarFilled
                                          key="setDefault"
                                          className={styles.defaultImage}
                                          onClick={() => {
                                            setDefaultImg(color.label, index);
                                          }}
                                          style={
                                            object.files[index].default === true
                                              ? { color: "rgb(192, 192, 76) " }
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
                      })
                    : productImages &&
                      productImages.map((object, index) => {
                        if (object.color.colorName === color.label) {
                          return (
                            <Col span={6} key={index}>
                              <div style={{ margin: "20px 40px" }}>
                                <Card
                                  hoverable
                                  cover={
                                    <img alt="example" src={object.path} />
                                  }
                                  actions={[
                                    <DeleteFilled
                                      onClick={() => {
                                        deleteImageDetail(
                                          color.label,
                                          "",
                                          object
                                        );
                                      }}
                                      key="delete"
                                    />,
                                    <StarFilled
                                      key="setDefault"
                                      className={styles.defaultImage}
                                      onClick={() => {
                                        setDefaultImg(
                                          color.lable,
                                          "",
                                          object.path
                                        );
                                      }}
                                      style={
                                        object.path === product.imgDefault
                                          ? { color: "rgb(192, 192, 76) " }
                                          : {}
                                      }
                                    />,
                                  ]}
                                ></Card>
                              </div>
                            </Col>
                          );
                        } else {
                          return null;
                        }
                      })}
                </Row>
              </div>
            </div>
          );
        })}
      {!isUpdate ? (
        <div className={styles.product_detailsCreate}>
          <Modal
            title="Thêm mới các chi tiết sản phẩm?"
            open={isModalOpen}
            onOk={(event) => createProductDetails(event)}
            onCancel={handleCancel}
            icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
          >
            <p>Xác nhận thêm mới</p>
          </Modal>
          <Button onClick={showModal}>Hoàn thành</Button>
        </div>
      ) : null}
    </>
  );
};

export default ProductDetailsTable;
