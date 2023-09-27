import {
  EditOutlined,
  FilterFilled,
  PlusOutlined,
  SearchOutlined,
  TableOutlined,
} from "@ant-design/icons";
import {
  Col,
  Row,
  Select,
  DatePicker,
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
import "../animations/animation.css";
import { displayFrame } from "../animations/animation";

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
  const { RangePicker } = DatePicker;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);

  const columns = [
    {
      key: "1",
      title: "STT",
      dataIndex: "index",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      key: "2",
      title: "Ảnh sản phẩm",
      dataIndex: "imgDefault",
      render: (url) => (
        <img
          src={
            "https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg"
          }
          alt="Avatar"
          style={{ width: "100px", height: "100px" }}
        />
      ),
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
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (createdAt) => (
        <>{moment(createdAt).format("DD/MM/YYYY HH:mm:ss")}</>
      ),
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
          <Link to={`/admin/product/update/${id}`}>
            <Button className={styles.product__button}>
              <EditOutlined />
            </Button>
          </Link>
        </>
      ),
    },
  ];
  //function
  const handleChangePage = (page, statusFilter) => {
    setStatus(statusFilter);
    setCurrentPage(page);
    axios
      .get(api + "product?page=" + (page - 1) + "&status=" + statusFilter)
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
          handleChangePage(1, status);
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
      .get(api + "product/totalPage")
      .then((response) => {
        setTotalPage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [render]);
  return (
    <>
      {contextHolder}
      <div className={styles.product__filter}>
        <h2>
          <FilterFilled /> Bộ lọc
        </h2>
        <Row className={styles.produt__filterSelects}>
          <Col span={24} className={styles.produt__filterSelectsChildren}>
            <h6>Thành phần</h6>
          </Col>
          <Col span={6}>
            <Select
              showSearch
              placeholder="Thương hiệu"
              optionFilterProp="children"
              className={styles.produt__filterSelectsChildren}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(event) => {
                brand = event;
                filterProductByCom();
              }}
            >
              {brands &&
                brands.map((item) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.brandName}
                    </Select.Option>
                  );
                })}
            </Select>
          </Col>
          <Col span={6}>
            <Select
              showSearch
              placeholder="Loại sản phẩm"
              optionFilterProp="children"
              className={styles.produt__filterSelectsChildren}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(event) => {
                category = event;
                filterProductByCom();
              }}
            >
              {categories &&
                categories.map((item) => {
                  return (
                    <Select.Option key={item.id}>
                      {item.categoryName}
                    </Select.Option>
                  );
                })}
            </Select>
          </Col>
          <Col span={6}>
            <Select
              showSearch
              placeholder="Họa tiết"
              optionFilterProp="children"
              className={styles.produt__filterSelectsChildren}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(event) => {
                pattern = event;
                filterProductByCom();
              }}
            >
              {patterns &&
                patterns.map((item) => {
                  return (
                    <Select.Option key={item.id}>
                      {item.patternName}
                    </Select.Option>
                  );
                })}
            </Select>
          </Col>
          <Col span={6}>
            <Select
              showSearch
              placeholder="Dáng áo"
              optionFilterProp="children"
              className={styles.produt__filterSelectsChildren}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(event) => {
                form = event;
                filterProductByCom();
              }}
            >
              {forms &&
                forms.map((item) => {
                  return (
                    <Select.Option key={item.id}>{item.formName}</Select.Option>
                  );
                })}
            </Select>
          </Col>
          <Col span={12}>
            <div className={styles.filter__dateCreate}>
              <h6 style={{ marginBottom: "8px" }}>Ngày tạo</h6>
              <RangePicker showTime />
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.filter__dateCreate}>
              <h6 style={{ marginBottom: "8px" }}>Trạng thái</h6>
              <Radio.Group
                onChange={""}
                defaultValue={"ALL"}
                onFocus={(event) => {
                  setStatus(event.target.value);
                  handleChangePage(1, event.target.value);
                }}
              >
                <Radio value={"ALL"}>Tất cả</Radio>
                <Radio value={"ACTIVE"}>Đang kinh doanh</Radio>
                <Radio value={"INACTIVE"}>Ngừng kinh doanh</Radio>
              </Radio.Group>
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.product__table}>
        <h2>
          <TableOutlined /> Danh sách sản phẩm
        </h2>
        <div className={styles.product__tableProducts}>
          <div>
            <Button
              onClick={() => {
                displayFrame("productCreate", "productCreateFrame");
              }}
              className={styles.product_tableButtonCreate}
            >
              <PlusOutlined />
            </Button>
            <Col span={12} className={styles.filter__search}>
              <Input
                placeholder="Nhập mã, tên, ngày tạo sản phẩm"
                prefix={<SearchOutlined />}
              />
            </Col>
          </div>
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
            pagination={false}
          />
          <div style={{ textAlign: "end", marginTop: "10px" }}>
            <Pagination
              current={currentPage}
              total={totalPage < 10 ? 10 : totalPage}
              pageSize={5}
              onChange={(event) => {
                handleChangePage(event, status);
              }}
            />
          </div>
        </div>
      </div>
      <ProductCreate
        brands={brands}
        patterns={patterns}
        categories={categories}
        forms={forms}
        render={setRendering}
      />
    </>
  );
};

export default ProductIndex;
