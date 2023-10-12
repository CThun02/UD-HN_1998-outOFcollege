import {
  EditFilled,
  EyeFilled,
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
      key: "8",
      title: "Ảnh",
      dataIndex: "imgDefault",
      width: 100,
      render: (imgDefault) => {
        return (
          <>
            <img
              alt="example"
              width={"100%"}
              style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
              src={imgDefault}
            />
          </>
        );
      },
    },
    {
      key: "2",
      title: "Mã sản phẩm",
      dataIndex: "productCode",
      width: 200,
    },
    {
      key: "3",
      title: "Tên sản phẩm",
      dataIndex: "productName",
    },
    {
      key: "4",
      title: "Số lượng",
      dataIndex: "quantity",
      width: 150,
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
      width: 150,
      render: (id) => (
        <>
          <Link to={`/admin/product/details/${id}`}>
            <Button className={styles.product__button}>
              <EyeFilled />
            </Button>
          </Link>
          <Link to={`/admin/product/update-details/${id}`}>
            <Button className={styles.product__button}>
              <EditFilled />
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
            <TableOutlined /> Danh sách sản phẩm
          </h2>
          <Row className={styles.produt__filterSelects}>
            <Col span={12}>
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
              scroll={{ y: 500 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductIndex;
