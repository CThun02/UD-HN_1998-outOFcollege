import {
  EditFilled,
  EyeFilled,
  FilterFilled,
  PlusOutlined,
  SearchOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Col, Row, Select, Table, Button, Switch, Radio, message } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./ProductIndex.module.css";
import axios from "axios";
import Input from "antd/es/input/Input";
import { Link } from "react-router-dom";

var brand = "";
var category = "";
var pattern = "";
var form = "";
var status = "ALL";
const ProductIndex = () => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const [brands, setBrands] = useState(null);
  const [categories, setCategories] = useState(null);
  const [patterns, setPatterns] = useState(null);
  const [forms, setForms] = useState(null);
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
      title: "Loại sản phẩm",
      dataIndex: "category",
      render: (category) => {
        return category.categoryName;
      },
    },
    {
      key: "5",
      title: "Thương hiệu",
      dataIndex: "brand",
      render: (brand) => {
        return brand.brandName;
      },
    },
    {
      key: "5",
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      key: "6",
      title: "Trạng thái",
      dataIndex: "status",
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
      render: (id) => (
        <>
          <Link to={`/api/admin/product/details/${id}`}>
            <Button className={styles.product__button}>
              <EyeFilled />
            </Button>
          </Link>
        </>
      ),
    },
  ];
  //function

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
          form +
          "&status=" +
          status
      )
      .then((res) => {
        setProductsTable(res.data);
        setLoading(false);
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
          filterProductByCom();
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
    filterProductByCom();
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
            <FilterFilled /> Bộ lọc
          </h2>
          <Row className={styles.produt__filterSelects}>
            <Col span={24}>
              <div className={styles.filter__status}>
                <span style={{ fontWeight: "500", marginRight: "16px" }}>
                  Trạng Thái
                </span>

                <Radio.Group
                  defaultValue={"ALL"}
                  onFocus={(event) => {
                    status = event.target.value;
                    filterProductByCom();
                  }}
                >
                  <Radio value={"ALL"}>Tất cả</Radio>
                  <Radio value={"ACTIVE"}>Đang kinh doanh</Radio>
                  <Radio value={"INACTIVE"}>Ngừng kinh doanh</Radio>
                </Radio.Group>
              </div>
            </Col>
            <br />
            <Col span={12}>
              <Input
                className={styles.filter_inputSearch}
                placeholder="Nhập mã, tên sản phẩm"
                prefix={<SearchOutlined />}
              />
            </Col>
          </Row>
        </div>
        <div className={styles.product__table}>
          <h2>
            <TableOutlined /> Danh sách sản phẩm
          </h2>
          <Row className={styles.filter__search}>
            <Col span={24}>
              <Link to={"/api/admin/product/create-details"}>
                <Button className={styles.product_tableButtonCreate}>
                  <PlusOutlined />
                </Button>
              </Link>
            </Col>
          </Row>
          <br />
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
              pagination={{
                showSizeChanger: true,
                pageSizeOptions: [5, 10, 15, 20],
                defaultPageSize: 5,
                showLessItems: true,
                style: { marginRight: "10px" },
              }}
            />
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductIndex;
