import {
  FilePptOutlined,
  SearchOutlined,
  EyeFilled,
  EyeOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Col, message, Row, Select, Table } from "antd";
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
  colorId = "";
const ProductDetails = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const [products, setProducts] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [buttons, setButtons] = useState(null);
  const [collars, setCollars] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [sleeves, setSleeves] = useState(null);
  const [shirtTails, setshirtTails] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
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
      render: (text, record, index) => {
        return record.product.productCode;
      },
    },
    {
      key: "productName",
      dataIndex: "productName",
      title: "Sản phẩm",
      width: 110,
      render: (text, record, index) => {
        return record.product.productName;
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
      with: 110,
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
      render: (text, record, index) => {
        return (
          <div
            className={styles.optionColor}
            style={{ justifyContent: "center" }}
          >
            <span style={{ backgroundColor: record.color.colorCode }}></span>
          </div>
        );
      },
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Giá",
      render: (text, record, index) => {
        return record.price;
      },
    },
    {
      key: "quntity",
      dataIndex: "quntity",
      title: "Số lượng",
      width: 110,
      render: (text, record, index) => {
        return record.quantity;
      },
    },
    {
      key: "action",
      title: "Thao tác",
      dataIndex: "id",
      fixed: "right",
      render: (text, record, index) => (
        <>
          <Checkbox onChange={(event) => {
            addProductDetail(record, event.target.checked);
          }} />
        </>
      ),
    },
  ];
  //functions
  let productDetailsCreate = [];
  function addProductDetail(record, checked) {
    let productDetailCreate = {
      productDetail: {},
      quantity: 1,
    };

    if (!checked) {
      for (let i = 0; i < productDetailsCreate.length; i++) {
        if (productDetailsCreate[i].productDetail.id === record.id) {
          productDetailsCreate.splice(i, 1)
        }
      }
    } else {
      productDetailCreate.productDetail = record;
      productDetailsCreate.push(productDetailCreate)
    }

    console.log(productDetailsCreate)

    console.log('object', checked)
  }
  function search(keywords) {
    axios
      .get(api + `product/searchProductDetail?keyWords=` + keywords.toString())
      .then((response) => {
        setProductDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
        sizeId
      )
      .then((response) => {
        setProductDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    axios
      .get(api + "product")
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
      .get(api + "product/getAllProductDetail")
      .then((response) => {
        setProductDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      {contextHolder}
      <div className={styles.productDetails}>
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
                  Sản phẩm
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
                    productId = event;
                    filter();
                  }}
                  defaultValue={""}
                  style={{ borderBottom: "1px solid black", width: "100%" }}
                >
                  <Select.Option key={"ALL"} value={""}>
                    Tất cả
                  </Select.Option>
                  {products &&
                    products.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.productName}
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
            <Col span={12} offset={6}>
              <Input
                className={styles.filter_inputSearch}
                placeholder="Nhập mã, tên sản phẩm"
                onChange={(event) => {
                  search(event.target.value);
                }}
                prefix={<SearchOutlined />}
              />
            </Col>
          </Row>
        </Col>

        <div className={styles.productDetails__table}>
          <Table
            columns={columns}
            dataSource={productDetails}
            scroll={{ y: 400, x: 1300 }}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
