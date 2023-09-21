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
  Button,
  Switch,
  Radio,
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
  const [brands, setBrands] = useState(null);
  const [categories, setCategories] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [patterns, setPatterns] = useState(null);
  const [forms, setForms] = useState(null);
  const [productsTable, setProductsTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [render, setRendering] = useState(null);
  const { RangePicker } = DatePicker;

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
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
      render: (status) => (
        <>{status === "ACTIVE" ? <Switch defaultChecked /> : <Switch />}</>
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
  }, [render]);
  return (
    <>
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
            >
              {brands &&
                brands.map((item) => {
                  return (
                    <Select.Option key={item.id}>
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
              <Radio.Group onChange={""} value={"ALL"}>
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
          ></Table>
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
