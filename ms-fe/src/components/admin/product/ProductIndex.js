import {
  EyeFilled,
  FilterFilled,
  PlusOutlined,
  SearchOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Col, Row, Table, Button, Switch, Radio, message, notification } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./ProductIndex.module.css";
import axios from "axios";
import Input from "antd/es/input/Input";
import { Link } from "react-router-dom";
import ProductOpenActive from "./ProductOpenActive";
import { getToken } from "../../../service/Token";

const ProductIndex = () => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const [productsTable, setProductsTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [openModalEditActiveProduct, setOpenModalEditActiveProduct] = useState(
    []
  );
  function handlesetOpenModalEditActiveProduct(index, value) {
    const newModalVisible = [...openModalEditActiveProduct];
    newModalVisible[index] = value;
    setOpenModalEditActiveProduct(newModalVisible);
  }
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
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      key: "5",
      title: "Trạng thái",
      dataIndex: "status",
      render: (status, record, index) => (
        <>
          <Switch
            onChange={(event) => {
              if (!event) {
                updateStatus(record);
              } else {
                handlesetOpenModalEditActiveProduct(index, event);
              }
            }}
            checked={status === "ACTIVE" ? true : false}
          />
          <ProductOpenActive
            open={openModalEditActiveProduct[index]}
            product={record}
            onCancel={() => handlesetOpenModalEditActiveProduct(index, false)}
            render={filterProductByCom}
          />
        </>
      ),
    },
    {
      key: "6",
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
        "product/getproductfilterByCom?status=" +
        status +
        "&keywords=" +
        keywords,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((res) => {
        setProductsTable(res.data);
        setLoading(false);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
  }

  function updateStatus(product) {
    axios
      .put(
        api +
        "product/updateProductStatus?productId=" +
        product.id +
        "&status=" +
        "INACTIVE",
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        setTimeout(() => {
          messageApi.success(
            `${product.productName} tạm ngưng hoạt động kinh doanh`,
            2
          );
          filterProductByCom();
        }, 500);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
        messageApi.error(`Cập nhật trạng thái thất bại`, 2);
      });
  }

  useEffect(() => {
    setLoading(true);
    filterProductByCom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, keywords]);
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
                  defaultValue={"null"}
                  onFocus={(event) => {
                    setStatus(event.target.value);
                  }}
                >
                  <Radio value={"null"}>Tất cả</Radio>
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
                onChange={(event) => {
                  setKeywords(
                    event.target.value.trim() === ""
                      ? "null"
                      : event.target.value
                  );
                }}
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
