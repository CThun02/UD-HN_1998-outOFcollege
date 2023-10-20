import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  message,
  Row,
  Select,
  Space,
  Input,
  Collapse,
  ColorPicker,
  notification,
  Spin,
} from "antd";
import Modal from "antd/es/modal/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { displayFrame } from "../animations/animation";
import "../animations/animation.css";
import ProductCreate from "./ProductCreate";
import styles from "./ProductCreateDetails.module.css";
import ProductDetailsTable from "./ProductDetailsTable";

var pattern = null;
var form = null;
var button = null;
var collar = null;
var material = null;
var sleeve = null;
var shirtTail = null;
var productId = null;
const ProductCreateDetails = () => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [buttons, setButtons] = useState(null);
  const [collars, setCollars] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [sleeves, setSleeves] = useState(null);
  const [shirtTails, setshirtTails] = useState(null);
  const [forms, setForms] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [sizesCreate, setSizesCreate] = useState([]);
  const [colorsCreate, setColorsCreate] = useState([]);
  const [productDetailsExist, setproductDetailsExist] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [sizeCreate, setSizeCreate] = useState("");
  const [colorCreate, setColorCreate] = useState({
    colorCode: "",
    colorName: "",
  });
  const [patternCreate, setPatternCreate] = useState("");
  const [formCreate, setFormCreate] = useState("");
  const [buttonCreate, setButtonCreate] = useState("");
  const [collarCreate, setCollarCreate] = useState("");
  const [materialCreate, setMaterialCreate] = useState("");
  const [sleeveCreate, setSleeveCreate] = useState("");
  const [shirtTailCreate, setshirtTailCreate] = useState("");
  const [productList, setProductList] = useState(null);
  const [render, setRender] = useState(1);
  const [modalColorOpen, setModalColorOpen] = useState(false);
  const [quantityExist, setQuantityExist] = useState(0);
  const [keyProductDetailExistActive, setKeyProductDetailActive] =
    useState("0");
  const [product, setProduct] = useState({
    productId: null,
    productName: "",
    brand: {},
    category: {},
    description: "",
    imgDefault: "",
  });
  const [productDetail, setProductDetail] = useState({
    productId: null,
    buttonId: " ",
    materialId: " ",
    collarId: " ",
    sleeveId: " ",
    patternId: " ",
    formId: " ",
    sizeId: " ",
    colorId: " ",
    shirtTailId: " ",
    price: 200000,
    quantity: 1,
  });
  var productDetailsCreate = renderProductDetails();

  //fucntion
  function handleSetProductDetail(field, value) {
    setProductDetail((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  }
  function handleSetColorCreate(field, value) {
    setColorCreate((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  }

  function handleSetProductDetailCom(field, value, record) {
    if (field === "button") {
      button = value;
    } else if (field === "collar") {
      collar = value;
    } else if (field === "material") {
      material = value;
    } else if (field === "sleeve") {
      sleeve = value;
    } else if (field === "shirtTail") {
      shirtTail = value;
    } else if (field === "form") {
      form = value;
    } else if (field === "pattern") {
      pattern = value;
    }
    if (
      product.id !== null &&
      product.id !== undefined &&
      button !== null &&
      collar !== null &&
      material !== null &&
      sleeve !== null &&
      shirtTail !== null &&
      form !== null &&
      pattern !== null
    ) {
      axios
        .get(
          api +
            "product/filterProductDetailByIdCom?productId=" +
            productId +
            "&buttonId=" +
            button.key +
            "&collarId=" +
            collar.key +
            "&materialId=" +
            material.key +
            "&sleeveId=" +
            sleeve.key +
            "&shirtTailId=" +
            shirtTail.key +
            "&formId=" +
            form.key +
            "&patternId=" +
            pattern.key
        )
        .then((res) => {
          let productDetailsExist = [...res.data];
          let setArrayByColors = [];
          setQuantityExist(productDetailsExist.length);
          setKeyProductDetailActive("1");
          for (let i = 0; i < productDetailsExist.length; i++) {
            let object = {
              color: productDetailsExist[i].color,
              productDetails: [productDetailsExist[i]],
            };
            let j = i + 1;

            while (j < productDetailsExist.length) {
              if (object.color.id === productDetailsExist[j].color.id) {
                object.productDetails.push(productDetailsExist.splice(j, 1)[0]);
              } else {
                j++;
              }
            }
            setArrayByColors.push(object);
          }
          if (productDetailsExist.length !== 0) {
            notification.open({
              type: "warning",
              label: "Thông báo",
              description: (
                <span>
                  Sản phẩm có sẵn một số màu sắc và kích cỡ!
                  <br />
                  Vui lòng kiểm tra dưới mục sản phẩm có sẵn
                </span>
              ),
            });
          }
          setproductDetailsExist(setArrayByColors);
          setRender(Math.random());
        });
    }
  }

  function selectProduct(index) {
    setProduct(productList[index]);
    handleSetProductDetail("productId", productList[index].id);
    productId = productList[index].id;
    handleSetProductDetailCom();
    setRender(Math.random());
  }

  function renderProductDetails() {
    let list = [];
    if (colorsCreate.length > 0 && sizesCreate.length > 0) {
      var index = 0;
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
            pattern: {
              id: pattern.key,
              name: pattern.label,
            },
            form: {
              id: form.key,
              name: form.label,
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
    return list;
  }

  function createPattern(event) {
    event.stopPropagation();
    messageApi.loading("Đang tải", 1);
    if (patternCreate.trim() !== "") {
      axios
        .post(api + "pattern?categoryName=" + patternCreate.trim(), null)
        .then((res) => {
          setPatternCreate(" ");
          setTimeout(() => {
            if (res.data === "") {
              messageApi.error("Họa tiết đã tồn tại!", 1);
            } else {
              messageApi.success("Thêm hoạ tiết thành công!", 1);
            }
            setRender(Math.random());
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        messageApi.error("Vui lòng nhập hoạt tiết!", 1);
      }, 1000);
    }
  }

  function createShirtTail(event) {
    event.stopPropagation();
    messageApi.loading("Đang tải", 1);
    if (formCreate.trim() !== "") {
      axios
        .post(
          api + "shirt-tail?shirtTailTypeName=" + shirtTailCreate.trim(),
          null
        )
        .then((res) => {
          setRender(Math.random);
          setTimeout(() => {
            if (res.data === "") {
              messageApi.error("Đuôi áo đã tồn tại!", 1);
            } else {
              messageApi.success("Thêm đuôi áo thành công!", 1);
            }
            setshirtTailCreate(" ");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        messageApi.error("Vui lòng nhập dáng áo!", 1);
      }, 1000);
    }
  }

  function createForm(event) {
    event.stopPropagation();
    messageApi.loading("Đang tải", 1);
    if (formCreate.trim() !== "") {
      axios
        .post(api + "form?categoryName=" + formCreate.trim(), null)
        .then((res) => {
          setRender(Math.random);
          setTimeout(() => {
            if (res.data === "") {
              messageApi.error("Dáng áo đã tồn tại!", 1);
            } else {
              messageApi.success("Thêm dáng áo thành công!", 1);
            }
            setFormCreate(" ");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        messageApi.error("Vui lòng nhập dáng áo!", 1);
      }, 1000);
    }
  }

  function createButton(event) {
    event.stopPropagation();
    messageApi.loading("Đang tải", 1);
    if (buttonCreate.trim() !== "") {
      axios
        .post(api + "button/create", { buttonName: buttonCreate.trim() })
        .then((res) => {
          setRender(Math.random);
          setTimeout(() => {
            if (res.data === "") {
              messageApi.error("Nút áo đã tồn tại!", 1);
            } else {
              messageApi.success("Thêm nút áo thành công!", 1);
            }
            setButtonCreate(" ");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        messageApi.error("Vui lòng nhập nút áo!", 1);
      }, 1000);
    }
  }

  function createMaterial(event) {
    event.stopPropagation();
    messageApi.loading("Đang tải", 1);
    if (materialCreate.trim() !== "") {
      axios
        .post(api + "material/create", { materialName: materialCreate.trim() })
        .then((res) => {
          setRender(Math.random);
          setTimeout(() => {
            if (res.data === "") {
              messageApi.error("Chất liệu đã tồn tại!", 1);
            } else {
              messageApi.success("Thêm chất liệu thành công!", 1);
            }
            setMaterialCreate(" ");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        messageApi.error("Vui lòng nhập chất liệu!", 1);
      }, 1000);
    }
  }

  function createCollar(event) {
    event.stopPropagation();
    messageApi.loading("Đang tải", 1);
    if (collarCreate.trim() !== "") {
      axios
        .post(api + "collar/create", { collarTypeName: collarCreate.trim() })
        .then((res) => {
          setRender(Math.random);
          setTimeout(() => {
            if (res.data === "") {
              messageApi.error("Cổ áo đã tồn tại!", 1);
            } else {
              messageApi.success("Thêm cổ áo thành công!", 1);
            }
            setCollarCreate(" ");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        messageApi.error("Vui lòng nhập cổ áo!", 1);
      }, 1000);
    }
  }

  function createSleeve(event) {
    event.stopPropagation();
    messageApi.loading("Đang tải", 1);
    if (sleeveCreate.trim() !== "") {
      axios
        .post(api + "sleeve/create", { sleeveName: sleeveCreate.trim() })
        .then((res) => {
          setRender(Math.random);
          setTimeout(() => {
            if (res.data === "") {
              messageApi.error("Tay áo đã tồn tại!", 1);
            } else {
              messageApi.success("Thêm tay áo thành công!", 1);
            }
            setSleeveCreate(" ");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        messageApi.error("Vui lòng nhập tay áo!", 1);
      }, 1000);
    }
  }

  function createSize(event) {
    event.stopPropagation();
    messageApi.loading("Đang tải", 1);
    if (sizeCreate.trim() !== "") {
      axios
        .post(api + "size/create", { sizeName: sizeCreate.trim() })
        .then((res) => {
          setRender(Math.random);
          setTimeout(() => {
            if (res.data === "") {
              messageApi.error("Kích cỡ đã tồn tại!", 1);
            } else {
              messageApi.success("Thêm kích cỡ thành công!", 1);
            }
            setSizeCreate(" ");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        messageApi.error("Vui lòng nhập kích cỡ!", 1);
      }, 1000);
    }
  }

  function createColor(event) {
    event.stopPropagation();
    messageApi.loading("Đang tải", 1);
    if (
      colorCreate.colorName.trim() !== "" ||
      colorCreate.colorCode.trim() !== ""
    ) {
      axios
        .post(api + "color/create", colorCreate)
        .then((res) => {
          setTimeout(() => {
            if (res.data === "") {
              messageApi.error("Màu sắc đã tồn tại!", 1);
            } else {
              messageApi.success("Thêm màu sắc thành công!", 1);
              setRender(Math.random());
            }
            setModalColorOpen(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        messageApi.error("Vui lòng nhập màu sắc!", 1);
      }, 1000);
    }
  }

  function handleCustomOptionClick(event) {
    event.stopPropagation();
    event.target.focus();
  }
  useEffect(() => {
    axios
      .get(api + "product/getProductCreateDetail")
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        console.log(err);
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

    axios
      .get(api + "pattern")
      .then((res) => {
        setPatterns(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "form")
      .then((res) => {
        setForms(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);
  return (
    <>
      <Spin
        tip="Loading..."
        spinning={isLoading}
        size="large"
        style={{ width: "100%" }}
      >
        <div className={styles.product}>
          {contextHolder}
          <ProductCreate render={setRender} />
          <Modal
            title="Thêm nhanh màu sắc"
            centered
            open={modalColorOpen}
            footer={false}
            onCancel={() => setModalColorOpen(false)}
          >
            <ColorPicker
              showText
              onChange={(event) => {
                handleSetColorCreate("colorCode", event.toHexString());
              }}
            ></ColorPicker>
            <h6>Tên màu sắc</h6>
            <Input
              onChange={(event) => {
                handleSetColorCreate("colorName", event.target.value);
              }}
            />
            <div style={{ textAlign: "end" }}>
              <Button
                style={{
                  marginTop: "16px",
                  backgroundColor: "#337CCF",
                  color: "white",
                }}
                onClick={(event) => createColor(event)}
              >
                Thêm mới
              </Button>
            </div>
          </Modal>
          <h2>
            <PlusOutlined /> Thêm mới sản phẩm
          </h2>
          <Row>
            <Col offset={4} span={16} className={styles.product__Form}>
              <br />
              <Row>
                <Col span={24}>
                  <div className="m-5">
                    <h6>Tên sản phẩm</h6>
                    <Row>
                      <Col span={23}>
                        <div
                          style={{
                            marginRight: "20px",
                          }}
                        >
                          <Select
                            showSearch
                            style={{
                              width: "100%",
                            }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              (option?.label ?? "").includes(input)
                            }
                            size="large"
                            filterSort={(optionA, optionB) =>
                              (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            onChange={(index) => {
                              selectProduct(index);
                            }}
                          >
                            {productList &&
                              productList.map((item, index) => {
                                return (
                                  <Select.Option
                                    key={item.id}
                                    label={item.productName}
                                    value={index}
                                  >
                                    {item.productName}
                                  </Select.Option>
                                );
                              })}
                          </Select>
                        </div>
                      </Col>
                      <Col span={1} style={{ paddingBottom: "8px" }}>
                        <Button
                          onClick={() => {
                            displayFrame("productCreate", "productCreateFrame");
                          }}
                          className={styles.product_ButtonCreate}
                        >
                          <PlusOutlined />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <Col span={24}>
                    <div className="m-5">
                      <Collapse
                        bordered={false}
                        expandIcon={({ isActive }) => (
                          <CaretRightOutlined rotate={isActive ? 90 : 0} />
                        )}
                        items={[
                          {
                            key: "product",
                            style: {
                              backgroundColor: "white",
                              boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                            },
                            label: <h6>{product.productName || "Sản phẩm"}</h6>,
                            children: (
                              <Row>
                                <Col span={12}>
                                  <div className="m-5">
                                    <h6>Thương hiệu</h6>
                                    <p>
                                      {product.brand.brandName || "Brand Name"}
                                    </p>
                                  </div>
                                </Col>
                                <Col span={12}>
                                  <div className="m-5">
                                    <h6>Loại sản phẩm</h6>
                                    <p>
                                      {product.category.categoryName ||
                                        "Category Name"}
                                    </p>
                                  </div>
                                </Col>
                                <Col span={24}>
                                  <div className="m-5">
                                    <h6>Mô tả</h6>
                                    <p>
                                      {product.description || "Description"}
                                    </p>
                                    <hr />
                                  </div>
                                </Col>
                              </Row>
                            ),
                          },
                        ]}
                      />
                    </div>
                  </Col>
                </Col>
              </Row>
            </Col>
            <Col span={16} offset={4} className={styles.product__createDetails}>
              <div className="m-5">
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  items={[
                    {
                      key: "1",
                      label: <h6>Thành phần sản phẩm</h6>,
                      style: {
                        backgroundColor: "white",
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                      },
                      children: (
                        <Row>
                          <Col span={8}>
                            <div className="m-5">
                              <h6>Loại cúc áo</h6>
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                placeholder="Button"
                                className={styles.product__createDetailsSelect}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom("button", record);
                                }}
                                status={
                                  productDetail.buttonId === "" ? "error" : ""
                                }
                              >
                                <Select.Option value={"add"}>
                                  <Space.Compact>
                                    <Input
                                      placeholder="Add new button"
                                      size="small"
                                      value={buttonCreate}
                                      onClick={(event) => {
                                        handleCustomOptionClick(event);
                                      }}
                                      onChange={(event) => {
                                        setButtonCreate(event.target.value);
                                      }}
                                    />
                                    <Button
                                      onClick={(event) => {
                                        createButton(event);
                                      }}
                                    >
                                      <PlusOutlined />
                                    </Button>
                                  </Space.Compact>
                                </Select.Option>
                                {buttons &&
                                  buttons.map((item) => {
                                    return (
                                      <Select.Option
                                        value={item.id}
                                        label={item.buttonName}
                                        key={item.id}
                                      >
                                        {item.buttonName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="m-5">
                              <h6>Chất liệu</h6>
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                placeholder="Material"
                                className={styles.product__createDetailsSelect}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom("material", record);
                                }}
                                status={
                                  productDetail.materialId === "" ? "error" : ""
                                }
                              >
                                <Select.Option value={"add"}>
                                  <Space.Compact>
                                    <Input
                                      placeholder="Add new material"
                                      size="small"
                                      onClick={(event) => {
                                        handleCustomOptionClick(event);
                                      }}
                                      onChange={(event) => {
                                        setMaterialCreate(event.target.value);
                                      }}
                                      value={materialCreate}
                                    />
                                    <Button
                                      onClick={(event) => {
                                        createMaterial(event);
                                      }}
                                    >
                                      <PlusOutlined />
                                    </Button>
                                  </Space.Compact>
                                </Select.Option>
                                {materials &&
                                  materials.map((item) => {
                                    return (
                                      <Select.Option
                                        value={item.id}
                                        label={item.materialName}
                                        key={item.id}
                                      >
                                        {item.materialName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="m-5">
                              <h6>Cổ áo</h6>
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                placeholder="Collar"
                                className={styles.product__createDetailsSelect}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom("collar", record);
                                }}
                                status={
                                  productDetail.collarId === "" ? "error" : ""
                                }
                              >
                                <Select.Option value={"add"}>
                                  <Space.Compact>
                                    <Input
                                      placeholder="Add new collar"
                                      size="small"
                                      onClick={(event) => {
                                        handleCustomOptionClick(event);
                                      }}
                                      onChange={(event) => {
                                        setCollarCreate(event.target.value);
                                      }}
                                      value={collarCreate}
                                    />
                                    <Button
                                      onClick={(event) => {
                                        createCollar(event);
                                      }}
                                    >
                                      <PlusOutlined />
                                    </Button>
                                  </Space.Compact>
                                </Select.Option>
                                {collars &&
                                  collars.map((item) => {
                                    return (
                                      <Select.Option
                                        value={item.id}
                                        key={item.id}
                                        label={item.collarTypeName}
                                      >
                                        {item.collarTypeName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="m-5">
                              <h6>Tay áo</h6>
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                placeholder="Sleeve"
                                className={styles.product__createDetailsSelect}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom("sleeve", record);
                                }}
                                status={
                                  productDetail.sleeveId === "" ? "error" : ""
                                }
                              >
                                <Select.Option value={"add"}>
                                  <Space.Compact>
                                    <Input
                                      placeholder="Add new sleeve"
                                      size="small"
                                      onClick={(event) => {
                                        handleCustomOptionClick(event);
                                      }}
                                      onChange={(event) => {
                                        setSleeveCreate(event.target.value);
                                      }}
                                    />
                                    <Button
                                      onClick={(event) => {
                                        createSleeve(event);
                                      }}
                                    >
                                      <PlusOutlined />
                                    </Button>
                                  </Space.Compact>
                                </Select.Option>
                                {sleeves &&
                                  sleeves.map((item) => {
                                    return (
                                      <Select.Option
                                        value={item.id}
                                        label={item.sleeveName}
                                        key={item.id}
                                      >
                                        {item.sleeveName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="m-5">
                              <h6>Đuôi áo</h6>
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                placeholder="Shirt tail"
                                className={styles.product__createDetailsSelect}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom(
                                    "shirtTail",
                                    record
                                  );
                                }}
                                status={
                                  productDetail.shirtTailId === ""
                                    ? "error"
                                    : ""
                                }
                              >
                                <Select.Option value={"add"}>
                                  <Space.Compact>
                                    <Input
                                      placeholder="Add new shirt tail"
                                      size="small"
                                      onClick={(event) => {
                                        handleCustomOptionClick(event);
                                      }}
                                      onChange={(event) => {
                                        setshirtTailCreate(event.target.value);
                                      }}
                                    />
                                    <Button
                                      onClick={(event) => {
                                        createShirtTail();
                                      }}
                                    >
                                      <PlusOutlined />
                                    </Button>
                                  </Space.Compact>
                                </Select.Option>
                                {shirtTails &&
                                  shirtTails.map((item) => {
                                    return (
                                      <Select.Option
                                        value={item.id}
                                        label={item.shirtTailTypeName}
                                        key={item.id}
                                      >
                                        {item.shirtTailTypeName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <h6>Hoạ tiết</h6>
                            <div className="m-5">
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                style={{ width: "100%" }}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom("pattern", record);
                                }}
                                placeholder="Pattern"
                                className={styles.product__createDetailsSelect}
                              >
                                <Select.Option value={"add"}>
                                  <Space.Compact>
                                    <Input
                                      placeholder="Add new pattern"
                                      size="small"
                                      onClick={(event) => {
                                        handleCustomOptionClick(event);
                                      }}
                                      value={patternCreate}
                                      onChange={(event) => {
                                        setPatternCreate(event.target.value);
                                      }}
                                    />
                                    <Button
                                      onClick={(event) => {
                                        createPattern(event);
                                      }}
                                    >
                                      <PlusOutlined />
                                    </Button>
                                  </Space.Compact>
                                </Select.Option>
                                {patterns &&
                                  patterns.map((item) => {
                                    return (
                                      <Select.Option
                                        label={item.patternName}
                                        value={item.id}
                                        key={item.id}
                                      >
                                        {item.patternName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <h6>Dáng áo</h6>
                            <div className="m-5">
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                style={{ width: "100%" }}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom("form", record);
                                }}
                                placeholder="form"
                              >
                                <Select.Option value={"add"}>
                                  <Space.Compact>
                                    <Input
                                      placeholder="Add new form"
                                      size="small"
                                      onClick={(event) => {
                                        handleCustomOptionClick(event);
                                      }}
                                      onChange={(event) => {
                                        setFormCreate(event.target.value);
                                      }}
                                      value={formCreate}
                                    />
                                    <Button
                                      onClick={(event) => {
                                        createForm(event);
                                      }}
                                    >
                                      <PlusOutlined />
                                    </Button>
                                  </Space.Compact>
                                </Select.Option>
                                {forms &&
                                  forms.map((item) => {
                                    return (
                                      <Select.Option
                                        label={item.formName}
                                        value={item.id}
                                        key={item.id}
                                      >
                                        {item.formName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="m-5">
                              <h6>Kích cỡ</h6>
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                placeholder="size"
                                optionFilterProp="children"
                                mode="multiple"
                                className={styles.product__createDetailsSelect}
                                filterOption={(input, option) =>
                                  (option?.label ?? "").includes(input)
                                }
                                filterSort={(optionA, optionB) =>
                                  (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                      (optionB?.label ?? "").toLowerCase()
                                    )
                                }
                                onChange={(event, record) => {
                                  setSizesCreate(record);
                                  setRender(event);
                                }}
                                status={
                                  productDetail.sizeId === "" ? "error" : ""
                                }
                              >
                                <Select.Option value={"add"}>
                                  <Space.Compact>
                                    <Input
                                      placeholder="Add new size"
                                      size="small"
                                      onClick={(event) => {
                                        handleCustomOptionClick(event);
                                      }}
                                      onChange={(event) => {
                                        setSizeCreate(event.target.value);
                                      }}
                                      value={sizeCreate}
                                    />
                                    <Button
                                      onClick={(event) => {
                                        createSize(event);
                                      }}
                                    >
                                      <PlusOutlined />
                                    </Button>
                                  </Space.Compact>
                                </Select.Option>
                                {sizes &&
                                  sizes.map((item) => {
                                    return (
                                      <Select.Option
                                        key={item.id}
                                        label={item.sizeName}
                                        value={item.id}
                                      >
                                        {item.sizeName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="m-5">
                              <h6>Màu sắc</h6>
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                placeholder="Color"
                                optionFilterProp="children"
                                mode="multiple"
                                className={styles.product__createDetailsSelect}
                                filterOption={(input, option) =>
                                  (option?.label ?? "").includes(input)
                                }
                                filterSort={(optionA, optionB) =>
                                  (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                      (optionB?.label ?? "").toLowerCase()
                                    )
                                }
                                onChange={(event, record) => {
                                  setColorsCreate(record);
                                  setRender(event);
                                }}
                                status={
                                  productDetail.colorId === "" ? "error" : ""
                                }
                              >
                                <Select.Option value={"add"}>
                                  <Space.Compact>
                                    <Button
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        setModalColorOpen(true);
                                      }}
                                    >
                                      <PlusOutlined />
                                    </Button>
                                  </Space.Compact>
                                </Select.Option>
                                {colors &&
                                  colors.map((item) => {
                                    return (
                                      <Select.Option
                                        key={item.id}
                                        label={item.colorName}
                                        value={item.colorCode}
                                      >
                                        <div className={styles.optionColor}>
                                          <span
                                            style={{
                                              backgroundColor: item.colorCode,
                                            }}
                                          ></span>
                                          {item.colorName}
                                        </div>
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={24}>
                            <div className="m-5">
                              <Collapse
                                bordered={false}
                                style={{
                                  backgroundColor: "rgba(253, 54, 54, 0.23)",
                                }}
                                items={[
                                  {
                                    key: "1",
                                    children: (
                                      <div
                                        style={{
                                          backgroundColor: "#fff",
                                          padding: "8px",
                                          borderRadius: "4px",
                                          color: "red",
                                        }}
                                      >
                                        <h6>{product.productName}</h6>
                                        {productDetailsExist.length === 0 ? (
                                          <span>Không có sẵn sản phẩm nào</span>
                                        ) : (
                                          <span>
                                            Dữ liệu có sẵn sẽ không được thêm
                                          </span>
                                        )}
                                        {productDetailsExist &&
                                          productDetailsExist.map((item) => {
                                            return (
                                              <div
                                                className={styles.optionColor}
                                                key={item.id}
                                              >
                                                <span
                                                  style={{
                                                    backgroundColor:
                                                      item.color.colorCode,
                                                    boxShadow:
                                                      "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
                                                  }}
                                                ></span>
                                                {item.color.colorName} :{" "}
                                                {item.productDetails
                                                  .map(
                                                    (item) => item.size.sizeName
                                                  )
                                                  .join(" ")}
                                              </div>
                                            );
                                          })}
                                      </div>
                                    ),
                                    label: (
                                      <span style={{ color: "red" }}>
                                        <b>Sản phẩm có sẵn ({quantityExist})</b>
                                      </span>
                                    ),
                                  },
                                ]}
                                defaultActiveKey={[keyProductDetailExistActive]}
                              />
                            </div>
                          </Col>
                        </Row>
                      ),
                    },
                  ]}
                />
              </div>
            </Col>
          </Row>
        </div>
        {product.productId !== null &&
        colorsCreate.length > 0 &&
        productDetailsCreate.length > 0 ? (
          <ProductDetailsTable
            setLoading={setisLoading}
            product={product}
            colorsCreate={colorsCreate}
            productDetails={productDetailsCreate}
          />
        ) : null}
      </Spin>
    </>
  );
};

export default ProductCreateDetails;
