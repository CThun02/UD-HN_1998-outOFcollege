import { CheckCircleFilled } from "@ant-design/icons";
import {
  Button,
  Carousel,
  Col,
  message,
  notification,
  Row,
  Select,
  Slider,
  Table,
} from "antd";
import Input from "antd/es/input/Input";
import Modal from "antd/es/modal/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";

var productId = "",
  buttonId = "",
  materialId = "",
  collarId = "",
  sleeveId = "",
  shirtTailId = "",
  sizeId = "",
  patternId = "",
  formId = "",
  colorId = "",
  price = [0, 0];
const ProductDetails = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [buttons, setButtons] = useState(null);
  const [collars, setCollars] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [sleeves, setSleeves] = useState(null);
  const [shirtTails, setshirtTails] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [renderThis, setRenderThis] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [patterns, setPatterns] = useState(null);
  const [forms, setForms] = useState(null);
  const [maxPrice, setMaxPrice] = useState(600000);
  const [modalSetQuantity, setModalSetQuantity] = useState([]);
  const [quantity, setQuantiy] = useState(1);

  const columns = [
    {
      key: "stt",
      dataIndex: "index",
      title: "#",
      width: 70,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      key: "productCode",
      dataIndex: "productCode",
      title: "Mã",
      width: 150,
      render: (text, record, index) => {
        return record.product.productCode;
      },
    },
    {
      key: "productName",
      dataIndex: "productName",
      title: "Sản phẩm",
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={4}>
              <Carousel
                style={{ width: "100%", justifyContent: "center" }}
                autoplay
              >
                {productImages &&
                  productImages.map((productImage) => {
                    if (productImage.product.id === record.product.id) {
                      if (record.color.id === productImage.color.id) {
                        if (
                          productImage.path.includes(
                            "" +
                            record.button.id +
                            record.material.id +
                            record.collar.id +
                            record.sleeve.id +
                            record.shirtTail.id +
                            record.pattern.id +
                            record.form.id
                          )
                        ) {
                          return (
                            <img
                              key={productImage.id}
                              alt=""
                              src={productImage.path}
                            />
                          );
                        }
                      }
                    }
                  })}
              </Carousel>
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
      dataIndex: "quantity",
      title: "Số lượng",
      width: 110,
      render: (text, record, index) => {
        return record.quantity;
      },
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Giá",
      width: 110,
      render: (text, record, index) => {
        return record.price;
      },
    },
    {
      key: "action",
      title: "Thao tác",
      dataIndex: "id",
      fixed: "right",
      width: 100,
      render: (text, record, index) => (
        <>
          <Modal
            title="Số lượng mua"
            centered
            open={modalSetQuantity[index]}
            onOk={() => {
              addProductDetail(record);
            }}
            onCancel={() => handleCancelModalQuantity(index)}
            footer={null}
          >
            <Input
              defaultValue={1}
              onChange={(event) => handleChangeQuantity(event.target.value)}
            />
            <div style={{ marginTop: "12px", textAlign: "center" }}>
              <Button
                type="primary"
                onClick={() => {
                  addProductDetail(record, index);
                }}
              >
                Xác nhận
              </Button>
            </div>
          </Modal>
          <Button
            type="primary"
            onClick={() => {
              handleShowModalModalQuantity(index);
            }}
          >
            Chọn
          </Button>
        </>
      ),
    },
  ];
  //functions

  function handleChangeQuantity(quantity) {
    setQuantiy(quantity);
  }

  const handleShowModalModalQuantity = (index) => {
    const visible = [...modalSetQuantity];
    visible[index] = true;
    setModalSetQuantity(visible);
  };

  const handleCancelModalQuantity = (index) => {
    const visible = [...modalSetQuantity];
    visible[index] = false;
    setModalSetQuantity(visible);
  };

  function completeAdd() {
    props.action();
  }

  function addProductDetail(record, index) {
    var indexExist = -1;
    var productDetailCreate = {
      productDetail: {},
      productDetailImages:
        productImages &&
        productImages.reduce((result, productImage) => {
          if (
            productImage.product.id === record.product.id &&
            record.color.id === productImage.color.id &&
            productImage.path.includes(
              "" +
              record.button.id +
              record.material.id +
              record.collar.id +
              record.sleeve.id +
              record.shirtTail.id +
              record.pattern.id +
              record.form.id
            )
          ) {
            result.push(productImage.path);
          }
          return result;
        }, []),
      quantity: quantity,
    };
    for (let i = 0; i < props.productDetailsCreate.length; i++) {
      if (props.productDetailsCreate[i].productDetail.id === record.id) {
        indexExist = i;
        break;
      }
    }
    if (indexExist !== -1) {
      productDetailCreate.quantity =
        Number(quantity) +
        Number(props.productDetailsCreate[indexExist].quantity);
      props.productDetailsCreate?.splice(indexExist, 1);
    }
    if (
      productDetailCreate.quantity > record.quantity ||
      productDetailCreate.quantity > 100
    ) {
      notification.error({
        message: "Thông báo",
        description: `Số lượng sản phẩm ${productDetailCreate.quantity > 100
          ? "thêm tối đa 100"
          : "tồn không đủ"
          }`,
      });
    } else {
      productDetailCreate.productDetail = record;
      props.productDetailsCreate?.push(productDetailCreate);
      notification.success({
        message: "Thông báo",
        description: "Thêm sản phẩm vào giỏ hàng thành công!",
      });
      handleCancelModalQuantity(index);
      props.action();
    }
  }

  function filter() {
    setLoading(true);
    axios
      .get(
        api +
        "product/filterProductDetailByIdCom?productId=" +
        productId +
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
        colorId +
        "&sizeId=" +
        sizeId +
        "&patternId=" +
        patternId +
        "&formId=" +
        formId +
        "&minPrice=" +
        price[0] +
        "&maxPrice=" +
        price[1]
      )
      .then((response) => {
        setProductDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
  useEffect(() => {
    axios
      .get(api + "product/getAllProductImages")
      .then((res) => {
        setProductImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(api + "product/filterProductDetailByIdCom?status=ACTIVE")
      .then((response) => {
        setProductDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "product/filterByCom?status=ACTIVE")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "size")
      .then((response) => {
        setSizes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "color")
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "button")
      .then((response) => {
        setButtons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "material")
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "collar")
      .then((response) => {
        setCollars(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "pattern")
      .then((response) => {
        setPatterns(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "form")
      .then((response) => {
        setForms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "shirt-tail")
      .then((response) => {
        setshirtTails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "sleeve")
      .then((response) => {
        setSleeves(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.render, renderThis]);

  return (
    <>
      {contextHolder}
      <div className={styles.productDetails}>
        <Col span={20} offset={2}>
          <Row style={{ margin: 0 }}>
            <Col span={6}>
              <div style={{ margin: "0 8px 24px 8px" }}>
                <span
                  style={{
                    fontWeight: "500",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Nút áo
                </span>
                <Select
                  showSearch
                  maxTagCount={"responsive"}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  bordered={false}
                  onChange={(event) => {
                    buttonId = event;
                    filter();
                  }}
                  defaultValue={""}
                  style={{ borderBottom: "1px solid black", width: "100%" }}
                >
                  <Select.Option key={"ALL"} value={""}>
                    Tất cả
                  </Select.Option>
                  {buttons &&
                    buttons.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.buttonName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ margin: "0 8px 24px 8px" }}>
                <span
                  style={{
                    fontWeight: "500",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Chất liệu
                </span>
                <Select
                  showSearch
                  maxTagCount={"responsive"}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  bordered={false}
                  onChange={(event) => {
                    materialId = event;
                    filter();
                  }}
                  defaultValue={""}
                  style={{ borderBottom: "1px solid black", width: "100%" }}
                >
                  <Select.Option key={"ALL"} value={""}>
                    Tất cả
                  </Select.Option>
                  {materials &&
                    materials.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.materialName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ margin: "0 8px 24px 8px" }}>
                <span
                  style={{
                    fontWeight: "500",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Cổ áo
                </span>
                <Select
                  showSearch
                  maxTagCount={"responsive"}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  bordered={false}
                  onChange={(event) => {
                    collarId = event;
                    filter();
                  }}
                  defaultValue={""}
                  style={{ borderBottom: "1px solid black", width: "100%" }}
                >
                  <Select.Option key={"ALL"} value={""}>
                    Tất cả
                  </Select.Option>
                  {collars &&
                    collars.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.collarTypeName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ margin: "0 8px 24px 8px" }}>
                <span
                  style={{
                    fontWeight: "500",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Tay áo
                </span>
                <Select
                  showSearch
                  maxTagCount={"responsive"}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  bordered={false}
                  onChange={(event) => {
                    sleeveId = event;
                    filter();
                  }}
                  defaultValue={""}
                  style={{ borderBottom: "1px solid black", width: "100%" }}
                >
                  <Select.Option key={"ALL"} value={""}>
                    Tất cả
                  </Select.Option>
                  {sleeves &&
                    sleeves.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.sleeveName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ margin: "0 8px 24px 8px" }}>
                <span
                  style={{
                    fontWeight: "500",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Họa tiết
                </span>
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  bordered={false}
                  onChange={(event) => {
                    patternId = event;
                    filter();
                  }}
                  defaultValue={""}
                  style={{ borderBottom: "1px solid black", width: "100%" }}
                >
                  <Select.Option key={"ALL"} value={""}>
                    Tất cả
                  </Select.Option>
                  {patterns &&
                    patterns.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.patternName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ margin: "0 8px 24px 8px" }}>
                <span
                  style={{
                    fontWeight: "500",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Đuôi áo
                </span>
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  bordered={false}
                  onChange={(event) => {
                    shirtTailId = event;
                    filter();
                  }}
                  defaultValue={""}
                  style={{ borderBottom: "1px solid black", width: "100%" }}
                >
                  <Select.Option key={"ALL"} value={""}>
                    Tất cả
                  </Select.Option>
                  {shirtTails &&
                    shirtTails.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.shirtTailTypeName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ margin: "0 8px 24px 8px" }}>
                <span
                  style={{
                    fontWeight: "500",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Dáng áo
                </span>
                <Select
                  showSearch
                  maxTagCount={"responsive"}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  bordered={false}
                  onChange={(event) => {
                    formId = event;
                    filter();
                  }}
                  defaultValue={""}
                  style={{ borderBottom: "1px solid black", width: "100%" }}
                >
                  <Select.Option key={"ALL"} value={""}>
                    Tất cả
                  </Select.Option>
                  {forms &&
                    forms.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.formName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ margin: "0 8px 24px 8px" }}>
                <span
                  style={{
                    fontWeight: "500",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Màu sắc
                </span>
                <Select
                  maxTagCount={"responsive"}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  bordered={false}
                  onChange={(event) => {
                    colorId = event;
                    filter();
                  }}
                  defaultValue={""}
                  style={{ borderBottom: "1px solid black", width: "100%" }}
                >
                  <Select.Option key={"ALL"} value={""}>
                    Tất cả
                  </Select.Option>
                  {colors &&
                    colors.map((item) => {
                      return (
                        <Select.Option key={item.id}>
                          <div className={styles.optionColor}>
                            <span
                              style={{ backgroundColor: item.colorCode }}
                            ></span>
                            {item.colorName}
                          </div>
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ margin: "0 8px 24px 8px" }}>
                <span
                  style={{
                    fontWeight: "500",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Kích cỡ
                </span>
                <Select
                  showSearch
                  maxTagCount={"responsive"}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  bordered={false}
                  onChange={(event) => {
                    sizeId = event;
                    filter();
                  }}
                  defaultValue={""}
                  style={{ borderBottom: "1px solid black", width: "100%" }}
                >
                  <Select.Option key={"ALL"} value={""}>
                    Tất cả
                  </Select.Option>
                  {sizes &&
                    sizes.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.sizeName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ margin: "0 8px 24px 8px" }}>
                <span
                  style={{
                    fontWeight: "500",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Khoảng giá
                </span>
                <Slider
                  max={maxPrice}
                  min={0}
                  onAfterChange={(event) => {
                    price = event;
                    filter();
                  }}
                  range
                />
              </div>
            </Col>
          </Row>
        </Col>
        <div>
          <Table
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 15, 20],
              defaultPageSize: 5,
              showLessItems: true,
              style: { marginRight: "10px" },
            }}
            scroll={{ y: 360 }}
            columns={columns}
            dataSource={
              productDetails &&
              productDetails.map((record, index) => ({
                ...record,
                key: record.id,
              }))
            }
            loading={loading}
          />
        </div>
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Button
            type="primary"
            onClick={() => {
              completeAdd();
            }}
          >
            Hoàn thành <CheckCircleFilled />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
