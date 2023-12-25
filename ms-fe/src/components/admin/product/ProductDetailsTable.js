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
  Modal,
  Image,
} from "antd";
import axios from "axios";
import Input from "antd/es/input/Input";
import {
  AreaChartOutlined,
  CheckCircleTwoTone,
  DeleteFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import { saveImage } from "../../../config/FireBase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../service/Token";
import numeral from "numeral";

var imgList = [];
const ProductDetailsTable = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const [render, setRender] = useState(null);
  const navigate = useNavigate();
  const { confirm } = Modal;
  const [prices, setPrices] = useState([]);
  var product = props.product;
  var productDetailsDisplay = getProductDetailsDisplay();
  const productImage = {
    id: null,
    productDetailId: "",
    path: "",
    status: "ACTIVE",
  };
  const productDetail = {
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
  };

  function changePrice(index, price) {
    var pricesCopy = [...prices];
    pricesCopy[index] = numeral(price).format("0,0");
    setPrices(pricesCopy);
  }

  function getProductDetailsDisplay() {
    if (props.productDetails.length !== prices.length) {
      setPrices(
        [...props.productDetails].map((item) =>
          numeral(item.price).format("0,0")
        )
      );
    }
    let allProductDetailsCopy = [...props.productDetails];

    let uniQueProductDetails = [];
    for (let i = 0; i < allProductDetailsCopy.length; i++) {
      let productDetails = [allProductDetailsCopy[i]];
      let j = i + 1;

      while (j < allProductDetailsCopy.length) {
        if (
          allProductDetailsCopy[i].brand.id ===
            allProductDetailsCopy[j].brand.id &&
          allProductDetailsCopy[i].category.id ===
            allProductDetailsCopy[j].category.id &&
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
          allProductDetailsCopy[i].brand.id ===
            allProductDetailsCopy[j].brand.id &&
          allProductDetailsCopy[i].category.id ===
            allProductDetailsCopy[j].category.id &&
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

  async function createImgageDetail(productDetail) {
    for (let object of imgList) {
      if (Number(object.color.id) === Number(productDetail.colorId)) {
        for (let i = 0; i < object.imgs.length; i++) {
          const currentTimeInMillis = new Date().getTime();
          const filename = currentTimeInMillis + object.productName;
          const imgRef = ref(
            saveImage,
            `products/${product.productName}/${object.color.name}/${filename}`
          );
          await uploadBytes(imgRef, object.files[i])
            .then(() => {
              return getDownloadURL(imgRef);
            })
            .then((url) => {
              let productImageCreate = { ...productImage };
              productImageCreate.productDetailId = productDetail.id;
              productImageCreate.path = url;
              axios
                .post(api + "product/createProductImg", productImageCreate, {
                  headers: {
                    Authorization: `Bearer ${getToken(true)}`,
                  },
                })
                .then((res) => {})
                .catch((err) => {
                  const status = err?.response?.status;
                  if (status === 403) {
                    notification.error({
                      message: "Thông báo",
                      description: "Bạn không có quyền truy cập!",
                    });
                  }
                });
            })
            .catch((err) => {
              const status = err?.response?.status;
              if (status === 403) {
                notification.error({
                  message: "Thông báo",
                  description: "Bạn không có quyền truy cập!",
                });
              }
            });
        }
      }
    }
  }
  function uploadImage(productName, color, imgs) {
    const reader = new FileReader();
    var save = {
      productName: productName,
      color: color,
      imgs: [],
      files: [],
    };

    for (let i = 0; i < imgList.length; i++) {
      if (imgList[i].color.name === color.name) {
        save.imgs = imgList[i].imgs;
        save.files = imgList[i].files;
      }
    }

    const loadImage = (imgIndex) => {
      if (save.imgs.length >= 3) {
        messageApi.warning("Chỉ được chọn tối đa 3 ảnh!", 2);
      }
      if (imgIndex >= imgs.length || save.imgs.length >= 3) {
        // Đã tải xong tất cả ảnh
        let replaced = false;
        for (let i = 0; i < imgList.length; i++) {
          if (imgList[i].color.name === color.name) {
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
        save.imgs.push(e.target.result);
        save.files.push(img);
        loadImage(imgIndex + 1); // Tiếp tục tải ảnh tiếp theo
        setRender(Math.random());
      };
      reader.readAsDataURL(img);
    };
    loadImage(0); // Bắt đầu tải ảnh từ index 0
  }

  function deleteImageDetail(color, index) {
    for (let i = 0; i < imgList.length; i++) {
      if (imgList[i].color.name === color) {
        imgList[i].imgs.splice(index, 1);
        imgList[i].files.splice(index, 1);
        message.success("Xóa ảnh thành công!", 1);
        setRender(Math.random());
        break;
      }
    }
  }

  function deleteProductDetail(index) {
    const newStatus =
      props.productDetails[index].status === "DELETED" ? "ACTIVE" : "DELETED";
    props.productDetails[index].status = newStatus;
    const action = newStatus === "DELETED" ? "Xóa" : "Khôi phục";
    messageApi.success(`${action} thành công chi tiết sản phẩm!`, 2);
    setRender(Math.random());
  }

  function createProductDetails() {
    var colorsCreate = props.colorsCreate;
    var validateNumber = props.productDetails.some(
      (item) =>
        item.quantity <= 0 ||
        item.quantity > 1000 ||
        item.price < 100000 ||
        item.price > 5000000 ||
        item.weight < 200 ||
        item.weight > 1000 ||
        item.price === "" ||
        item.quantity === "" ||
        item.weight === ""
    );
    if (imgList.length !== colorsCreate.length) {
      notification.error({
        message: "Thông báo",
        description: "Vui lòng chọn đầy đủ ảnh cho từng mã màu!",
      });
    } else if (validateNumber) {
      notification.error({
        message: "Thông báo",
        description: (
          <span>
            Vui lòng nhập hợp lệ!
            <br />
            Số lượng (1 - 1.000)
            <br />
            Trọng lượng (200g - 1000g)
            <br />
            Giá (100.000đ - 5.000.000đ)
          </span>
        ),
      });
    } else {
      confirm({
        centered: true,
        title: `Thêm mới các sản phẩm`,
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        content: "Xác nhận thêm mới",
        onOk() {
          props.setLoading(true);
          for (let detail of props.productDetails) {
            let productDetailCreate = { ...productDetail };
            productDetailCreate.productId = product.id;
            productDetailCreate.brandId = detail.brand.id;
            productDetailCreate.categoryId = detail.category.id;
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
            productDetailCreate.weight = detail.weight;
            productDetailCreate.status = detail.status;
            productDetailCreate.descriptionDetail = "Description detail";
            if (!productDetailCreate.status.includes("DELETED")) {
              axios
                .post(api + "product/createDetail", productDetailCreate, {
                  headers: {
                    Authorization: `Bearer ${getToken(true)}`,
                  },
                })
                .then((response) => {
                  if (response) {
                    createImgageDetail(response.data);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  notification.error({
                    message: "Thông báo",
                    description: "Thêm mới các chi tiết sản phẩm Thất bại",
                  });
                  return null;
                });
            }
          }
          setRender(props.productDetails);
          setTimeout(() => {
            notification.open({
              message: "Thông báo",
              description: "Thêm mới các chi tiết sản phẩm thành công",
              icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
            });
            setTimeout(() => {
              imgList = []; //reset
              navigate("/api/admin/product");
            }, 500);
          }, 1000);
        },
      });
    }
  }

  if (props.productDetails.length === 0 || productDetailsDisplay.length === 0) {
    getProductDetailsDisplay();
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render, props.render]);
  return (
    <>
      {contextHolder}
      {productDetailsDisplay &&
        productDetailsDisplay.map((productDetails, index) => {
          let isDeleted = true;
          // eslint-disable-next-line array-callback-return
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
                  <Tooltip
                    placement="right"
                    style={{ width: 500 }}
                    title={
                      "Thương hiệu: " +
                      productDetails[0].brand.name +
                      " - " +
                      "loại sản phẩm: " +
                      productDetails[0].category.name +
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
                      productDetails[0].form.name
                    }
                  >
                    <p>{productDetails[0].color.name}</p>
                  </Tooltip>
                </div>
              </h2>
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
                                productDetails[0].brand.id +
                                productDetails[0].category.id +
                                productDetails[0].material.id +
                                productDetails[0].collar.id +
                                productDetails[0].sleeve.id +
                                productDetails[0].shirtTail.id +
                                productDetails[0].pattern.id +
                                productDetails[0].form.id,
                              productDetails[0].color,
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
                        prefix="Q"
                        id={`quantity${record.id}`}
                        onBlur={(event) => {
                          props.productDetails[record.id].quantity =
                            event.target.value;
                        }}
                        disabled={record.status === "DELETED"}
                        defaultValue={record.quantity}
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
                        id={`price${record.id}`}
                        value={prices[record.id]}
                        onChange={(event) => {
                          changePrice(
                            record.id,
                            event.target.value.replace(/\D/g, "")
                          );
                        }}
                        onBlur={(event) => {
                          props.productDetails[record.id].price =
                            event.target.value.replace(/\D/g, "");
                        }}
                        prefix="VND"
                        disabled={record.status === "DELETED"}
                        style={{ textAlign: "center" }}
                      />
                    );
                  }}
                />
                <Table.Column
                  key="weight"
                  title="Trọng lượng"
                  width={300}
                  render={(text, record, index) => {
                    return (
                      <Input
                        prefix="G"
                        type={"number"}
                        id={`weight${record.id}`}
                        onBlur={(event) => {
                          props.productDetails[record.id].weight =
                            event.target.value;
                        }}
                        disabled={record.status === "DELETED"}
                        defaultValue={record.weight}
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
                <Col span={20} offset={4}>
                  <Row>
                    {imgList &&
                      imgList.map((object) => {
                        if (
                          object.color.name === productDetails[0].color.name
                        ) {
                          return (
                            object.imgs &&
                            object.imgs.map((img, index) => {
                              return (
                                <Col span={6} key={index}>
                                  <div style={{ margin: "20px 40px" }}>
                                    <Card
                                      hoverable
                                      cover={<Image alt="example" src={img} />}
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
        <Button onClick={createProductDetails}>Hoàn thành</Button>
      </div>
    </>
  );
};

export default ProductDetailsTable;
