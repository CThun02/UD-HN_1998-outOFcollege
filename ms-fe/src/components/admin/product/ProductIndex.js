import {
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  TableOutlined,
} from "@ant-design/icons";
import {
  Col,
  Row,
  Select,
  Table,
  Pagination,
  Button,
  Switch,
  Radio,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import styles from "./ProductIndex.module.css";
import axios from "axios";
import Input from "antd/es/input/Input";
import moment from "moment";
import { Link } from "react-router-dom";
import ProductCreate from "./ProductCreate";

const ProductIndex = () => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const [brands, setBrands] = useState(null);
  const [categories, setCategories] = useState(null);
  const [patterns, setPatterns] = useState(null);
  const [forms, setForms] = useState(null);
  var brand = 0;
  var category = 0;
  var pattern = 0;
  var form = 0;
  const [status, setStatus] = useState(null);
  const [productsTable, setProductsTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [render, setRendering] = useState(null);

  const columns = [
    {
      key: "1",
      title: "#",
      dataIndex: "index",
      width: 50,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      key: "2",
      title: "Mã sản phẩm",
      dataIndex: "productCode",
    },
    {
      key: "3",
      title: "Tên sản phẩm",
      dataIndex: "productName",
    },
    {
      key: "4",
      title: "Thương hiệu",
      dataIndex: "brand.brandName",
      render: (index, record) => {
        return record.brand.brandName;
      },
    },
    {
      key: "5",
      title: "Loại sản phẩm",
      dataIndex: "category.categoryName",
      render: (index, record) => {
        return record.category.categoryName;
      },
    },
    {
      key: "5",
      title: "Họa tiết",
      dataIndex: "pattern.patternName",
      render: (index, record) => {
        return record.pattern.patternName;
      },
    },
    {
      key: "6",
      title: "Dáng áo",
      dataIndex: "form.formName",
      render: (index, record) => {
        return record.form.formName;
      },
    },
    {
      key: "4",
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      key: "6",
      title: "Trạng thái",
      dataIndex: "status",
      width: 150,
      render: (status, record) => (
        <>
          <Switch
            onChange={(event) => {
              updateStatus(record, event);
            }}
            checked={status === "ACTIVE" ? true : false}
          />
        </>
      ),
    },
    {
      key: "7",
      title: "Thao tác",
      dataIndex: "id",
      width: 100,
      render: (id) => (
        <>
          <Link to={`/admin/product/details/${id}`}>
            <Button className={styles.product__button}>
              <EditOutlined />
            </Button>
          </Link>
        </>
      ),
    },
  ];
  //function
  const handleChangePage = (statusFilter) => {
    setStatus(statusFilter);
    axios
      .get(api + "product?status=" + statusFilter)
      .then((response) => {
        setProductsTable(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function filterProductByCom() {
    axios
      .get(
        api +
          "product/filterByCom?brandId=" +
          brand +
          "&categoryId=" +
          category +
          "&patternId=" +
          pattern +
          "&formId=" +
          form
      )
      .then((res) => {
        setProductsTable(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateStatus(product, statusUpdate) {
    let mess =
      statusUpdate === true
        ? `${product.productName} vừa bật hoạt động kinh doanh`
        : `${product.productName} tạm ngưng hoạt động kinh doanh`;
    axios
      .put(
        api +
          "product/updateProductStatus?productId=" +
          product.id +
          "&status=" +
          (statusUpdate === true ? "ACTIVE" : "INACTIVE")
      )
      .then((response) => {
        setTimeout(() => {
          messageApi.success(mess, 2);
          handleChangePage(status);
        }, 500);
      })
      .catch((error) => {
        setTimeout(() => {
          messageApi.error(`Cập nhật trạng thái thất bại`, 2);
        }, 500);
      });
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(api + "product")
      .then((response) => {
        setProductsTable(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "brand")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "category")
      .then((response) => {
        setCategories(response.data);
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
  }, [render]);
  return (
    <>
      {contextHolder}
      <div className={styles.product__index}>
        <div className={styles.product__filter}>
          <h2>
            <TableOutlined /> Danh sách sản phẩm
          </h2>
          <Row className={styles.produt__filterSelects}>
            <Col span={6}>
              <div style={{ margin: "0 8px 8px 8px" }}>
                <span style={{ fontWeight: "500" }}>Thương Hiệu</span>
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
                  className={styles.produt__filterSelectsChildren}
                  onChange={(event) => {
                    brand = event;
                    filterProductByCom();
                  }}
                  defaultValue={"ALL"}
                >
                  <Select.Option key={"ALL"} value={"ALL"}>
                    Tất cả
                  </Select.Option>
                  {brands &&
                    brands.map((item) => {
                      return (
                        <Select.Option
                          key={item.id}
                          value={item.id}
                          label={item.brandName}
                        >
                          {item.brandName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ margin: "0 8px 8px 8px" }}>
                <span style={{ fontWeight: "500" }}>Loại sản phẩm</span>
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
                  className={styles.produt__filterSelectsChildren}
                  onChange={(event) => {
                    category = event;
                    filterProductByCom();
                  }}
                  defaultValue={"ALL"}
                >
                  <Select.Option key={"ALL"} value={"ALL"}>
                    Tất cả
                  </Select.Option>
                  {categories &&
                    categories.map((item) => {
                      return (
                        <Select.Option key={item.id}>
                          {item.categoryName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ margin: "0 8px 8px 8px" }}>
                <span style={{ fontWeight: "500" }}>Họa tiết</span>
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
                  className={styles.produt__filterSelectsChildren}
                  onChange={(event) => {
                    pattern = event;
                    filterProductByCom();
                  }}
                  defaultValue={"ALL"}
                >
                  <Select.Option key={"ALL"} value={"ALL"}>
                    Tất cả
                  </Select.Option>
                  {patterns &&
                    patterns.map((item) => {
                      return (
                        <Select.Option key={item.id}>
                          {item.patternName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ margin: "0 8px 8px 8px" }}>
                <span style={{ fontWeight: "500" }}>Dáng áo</span>
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
                  className={styles.produt__filterSelectsChildren}
                  onChange={(event) => {
                    form = event;
                    filterProductByCom();
                  }}
                  defaultValue={"ALL"}
                >
                  <Select.Option key={"ALL"} value={"ALL"}>
                    Tất cả
                  </Select.Option>
                  {forms &&
                    forms.map((item) => {
                      return (
                        <Select.Option key={item.id}>
                          {item.formName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.filter__status}>
                <span style={{ fontWeight: "500", marginRight: "16px" }}>
                  Trạng Thái
                </span>

                <Radio.Group
                  onChange={""}
                  defaultValue={"ALL"}
                  onFocus={(event) => {
                    setStatus(event.target.value);
                    handleChangePage(event.target.value);
                  }}
                >
                  <Radio value={"ALL"}>Tất cả</Radio>
                  <Radio value={"ACTIVE"}>Đang kinh doanh</Radio>
                  <Radio value={"INACTIVE"}>Ngừng kinh doanh</Radio>
                </Radio.Group>
              </div>
            </Col>
            <Col span={24} className={styles.filter__search}>
              <Row>
                <Col span={12}>
                  <Input
                    className={styles.filter_inputSearch}
                    placeholder="Nhập mã, tên sản phẩm"
                    prefix={<SearchOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Link to={"/admin/product/create-details"}>
                    <Button className={styles.product_tableButtonCreate}>
                      <PlusOutlined />
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className={styles.product__table}>
          <div className={styles.product__tableProducts}>
            <Table
              columns={columns}
              loading={loading}
              dataSource={
                productsTable &&
                productsTable.map((record, index) => ({
                  ...record,
                  key: index,
                }))
              }
              pagination={{ pageSize: 5 }}
              scroll={{ y: 330 }}
            />
          </div>
        </div>
        <ProductCreate
          brands={brands}
          patterns={patterns}
          categories={categories}
          forms={forms}
          render={setRendering}
        />
      </div>
    </>
  );
};

export default ProductIndex;
