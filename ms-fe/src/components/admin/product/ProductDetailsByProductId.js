import {
  FilePptOutlined,
  SearchOutlined,
  EyeFilled,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Col, message, Row, Select, Table } from "antd";
import Input from "antd/es/input/Input";
import Modal from "antd/es/modal/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetailsByProductId.module.css";

var buttonId = "",
  materialId = "",
  collarId = "",
  sleeveId = "",
  shirtTailId = "",
  sizeId = "",
  colorId = "";
const ProductDetails = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const { productId } = useParams();
  const [product, setProduct] = useState({
    productCode: "",
    productName: "",
    brand: {},
    pattern: {},
    form: {},
    category: {},
    description: "",
  });
  var url =
    "https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg";
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [buttons, setButtons] = useState(null);
  const [collars, setCollars] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [sleeves, setSleeves] = useState(null);
  const [shirtTails, setshirtTails] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      key: "button",
      dataIndex: "button",
      title: "Cúc áo",
      render: (text, record, index) => {
        return record.button.buttonName;
      },
    },
    {
      key: "material",
      dataIndex: "material",
      title: "Chất liệu",
      render: (text, record, index) => {
        return record.material.materialName;
      },
    },
    {
      key: "collar",
      dataIndex: "collar",
      title: "Cổ áo",
      render: (text, record, index) => {
        return record.collar.collarTypeName;
      },
    },
    {
      key: "shirtTail",
      dataIndex: "shirtTail",
      title: "Đuôi áo",
      render: (text, record, index) => {
        return record.shirtTail.shirtTailTypeName;
      },
    },
    {
      key: "sleeve",
      dataIndex: "sleeve",
      title: "Tay áo",
      render: (text, record, index) => {
        return record.sleeve.sleeveName;
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
      key: "color",
      dataIndex: "color",
      title: "Màu sắc",
      width: 150,
      render: (text, record, index) => {
        return (
          <div
            className={styles.optionColor}
            style={{ justifyContent: "center" }}
          >
            <span style={{ backgroundColor: record.color.colorCode }}></span>
            {record.color.colorName}
          </div>
        );
      },
    },
    {
      key: "action",
      title: "Thao tác",
      dataIndex: "id",
      render: (text, record, index) => (
        <>
          <Button>
            <EditOutlined />
          </Button>
        </>
      ),
    },
  ];
  //functions
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
          sizeId
      )
      .then((response) => {
        setProductDetails(response.data);
        setProduct(response.data[0].product);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    axios
      .get(api + "product/filterProductDetailByIdCom?productId=" + productId)
      .then((response) => {
        setProduct(response.data[0].product);
        setProductDetails(response.data);
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
  }, []);
  return (
    <>
      {contextHolder}
      <div className={styles.productDetails}>
        <h2>
          <FilePptOutlined /> Sản phẩm
        </h2>
        <Button type="primary" onClick={showModal}>
          <EyeOutlined />
        </Button>
        <Modal
          title={product.productName + " - " + product.productCode}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Row>
            <Col span={6}>
              <img src={url} width={"100%"} alt={"Not loading"} />
            </Col>
            <Col span={18}>
              <Row style={{ marginLeft: "12px" }}>
                <Col span={12} style={{ marginBottom: "16px" }}>
                  <span style={{ fontWeight: 500 }}>Thương hiệu</span>
                  <p>{product.brand.brandName}</p>
                </Col>
                <Col span={12} style={{ marginBottom: "16px" }}>
                  <span style={{ fontWeight: 500 }}>Loại sản phẩm</span>
                  <p>{product.category.categoryName}</p>
                </Col>
                <Col span={12} style={{ marginBottom: "16px" }}>
                  <span style={{ fontWeight: 500 }}>Họa tiết</span>
                  <p>{product.pattern.patternName}</p>
                </Col>
                <Col span={12} style={{ marginBottom: "16px" }}>
                  <span style={{ fontWeight: 500 }}>form</span>
                  <p>{product.form.formName}</p>
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{ marginBottom: "20px" }}>
              <span style={{ fontWeight: 500 }}>Mô tả</span>
              <p>{product.description}</p>
              <hr />
            </Col>
          </Row>
        </Modal>
        <Col span={20} offset={2}>
          <Row className={styles.productDetails__filter}>
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
            <Col span={18} offset={3}>
              <Row>
                <Col span={8}>
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
                <Col span={8}>
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
                <Col span={8}>
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
              </Row>
            </Col>
          </Row>
        </Col>
        <div className={styles.productDetails__table}>
          <Table
            columns={columns}
            dataSource={productDetails}
            scroll={{ y: 500 }}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
