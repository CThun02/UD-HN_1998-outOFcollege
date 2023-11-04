import {
  FilePptOutlined,
  EyeOutlined,
  EditFilled,
  CloseOutlined,
  PlusOutlined,
  CheckCircleTwoTone,
  DeleteFilled,
} from "@ant-design/icons";
import {
  Button,
  Col,
  ColorPicker,
  Image,
  message,
  notification,
  Popconfirm,
  Row,
  Select,
  Slider,
  Spin,
  Table,
  Tooltip,
} from "antd";
import Card from "antd/es/card/Card";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import Modal from "antd/es/modal/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetailsByProductId.module.css";
import { isFormInputEmpty } from "./ValidateForm";
import {
  deleteObject,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { saveImage } from "../../../config/FireBase";

var productDetailsUpdate = [];
const ProductDetails = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const { confirm } = Modal;
  const { productId } = useParams();
  const [product, setProduct] = useState({
    id: "",
    productCode: "",
    productName: "",
    description: "",
    status: "",
  });
  const [button, setButton] = useState("");
  const [collar, setCollar] = useState("");
  const [material, setMaterial] = useState("");
  const [sleeve, setSleeve] = useState("");
  const [shirtTail, setshirtTail] = useState("");
  const [form, setForm] = useState("");
  const [pattern, setPattern] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState([0, 0]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [collars, setCollars] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [sleeves, setSleeves] = useState([]);
  const [shirtTails, setshirtTails] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [forms, setForms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [editProduct, setEditProduct] = useState(false);
  const [brandCreate, setBrandCreate] = useState("");
  const [categoryCreate, setCategoryCreate] = useState("");
  const [sizeCreate, setSizeCreate] = useState("");
  const [shirtTailCreate, setshirtTailCreate] = useState("");
  const [colorCreate, setColorCreate] = useState({
    colorCode: "",
    colorName: "",
  });
  const [modalColorOpen, setModalColorOpen] = useState(false);
  const [patternCreate, setPatternCreate] = useState("");
  const [formCreate, setFormCreate] = useState("");
  const [buttonCreate, setButtonCreate] = useState("");
  const [collarCreate, setCollarCreate] = useState("");
  const [materialCreate, setMaterialCreate] = useState("");
  const [sleeveCreate, setSleeveCreate] = useState("");
  const [render, setRender] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [maxPrice, setMaxprice] = useState();
  const [isModalUpdateDetailOpen, setIsModalUpdateDetailOpen] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUpdateProducts, setLoadingUpdateProducts] = useState(false);
  const [loadingUpdateProduct, setLoadingUpdateProduct] = useState(false);
  const [loadingProductImage, setLoadingProductImage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productDetailUpdate, setProductDetailUpdate] = useState({
    id: "",
    product: product,
    brand: { id: " " },
    category: { id: " " },
    button: { id: " " },
    material: { id: " " },
    collar: { id: " " },
    sleeve: { id: " " },
    size: { id: " " },
    color: { id: " " },
    shirtTail: { id: " " },
    pattern: { id: " " },
    form: { id: " " },
    price: 200000,
    quantity: 10,
    weight: 100,
    QRCode: "empty",
    status: "ACTIVE",
    descriptionDetail: " ",
  });
  const productImage = {
    id: null,
    productDetailId: "",
    path: "",
    status: "ACTIVE",
  };
  const columns = [
    {
      key: "stt",
      dataIndex: "index",
      title: "#",
      width: 70,
      render: (text, record, index) => {
        return (
          <span id={record.id}>
            {(currentPage - 1) * pageSize + (index + 1)}
          </span>
        );
      },
    },
    {
      key: "brand",
      dataIndex: "brand",
      title: "Thương hiệu",
      render: (text, record, index) => {
        return record.brand.brandName;
      },
    },
    {
      key: "category",
      dataIndex: "category",
      title: "Loại sản phẩm",
      render: (text, record, index) => {
        return record.category.categoryName;
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
          <div className={styles.optionColor}>
            <span style={{ backgroundColor: record.color.colorCode }}></span>
            {record.color.colorName}
          </div>
        );
      },
    },
    {
      key: "quantity",
      dataIndex: "quantity",
      title: "Số lượng",
      render: (text, record, index) => {
        return selectedRowKeys.some((key) => key === record.id) ? (
          <Input
            size="small"
            style={{ textAlign: "center" }}
            defaultValue={record.quantity}
            onBlur={(event) =>
              getProductDetailsUpdate(record, "quantity", event.target.value)
            }
          />
        ) : (
          record.quantity
        );
      },
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Giá",
      render: (text, record, index) => {
        return selectedRowKeys.some((key) => key === record.id) ? (
          <Input
            size="small"
            style={{ textAlign: "center" }}
            defaultValue={record.price}
            onBlur={(event) =>
              getProductDetailsUpdate(record, "price", event.target.value)
            }
          />
        ) : (
          record.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })
        );
      },
    },
    {
      key: "weight",
      dataIndex: "weight",
      title: "Trọng lượng",
      render: (text, record, index) => {
        return selectedRowKeys.some((key) => key === record.id) ? (
          <Input
            size="small"
            style={{ textAlign: "center" }}
            defaultValue={record.weight}
            onBlur={(event) =>
              getProductDetailsUpdate(record, "weight", event.target.value)
            }
          />
        ) : (
          record.weight + " g"
        );
      },
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Thao tác",
      render: (text, record, index) => {
        return (
          <>
            <Modal
              title={
                <span style={{ fontWeight: "500" }}>
                  Sản phẩm {record.product.productName}
                </span>
              }
              open={isModalUpdateDetailOpen[index]}
              footer={null}
              onCancel={() => handlesetIsModalUpdateDetail(index, false)}
              width={800}
              style={{ top: "10px" }}
            >
              <Spin
                tip="Loading..."
                spinning={loadingUpdateProduct}
                size="large"
                style={{ width: "100%" }}
              >
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
                        maxTagCount={"responsive"}
                        optionFilterProp="children"
                        bordered={false}
                        onChange={(event) => {
                          handleSetProductDetail("button", { id: event });
                        }}
                        value={productDetailUpdate.button.id}
                        style={{
                          borderBottom: "1px solid black",
                          width: "100%",
                        }}
                        onSearch={(input, option) => {
                          setButtonCreate(input === "" ? buttonCreate : input);
                          return (option?.label ?? "").includes(input);
                        }}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        notFoundContent={
                          <div
                            style={{ textAlign: "center" }}
                            onClick={() => {
                              createButton();
                            }}
                          >
                            <PlusOutlined />
                          </div>
                        }
                      >
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
                        Thương hiệu
                      </span>
                      <Select
                        showSearch
                        maxTagCount={"responsive"}
                        optionFilterProp="children"
                        bordered={false}
                        onChange={(event) => {
                          handleSetProductDetail("brand", { id: event });
                        }}
                        value={productDetailUpdate.brand.id}
                        style={{
                          borderBottom: "1px solid black",
                          width: "100%",
                        }}
                        onSearch={(input, option) => {
                          setBrandCreate(input === "" ? brandCreate : input);
                          return (option?.label ?? "").includes(input);
                        }}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        notFoundContent={
                          <div
                            style={{ textAlign: "center" }}
                            onClick={() => {
                              createBrand();
                            }}
                          >
                            <PlusOutlined />
                          </div>
                        }
                      >
                        {brands &&
                          brands.map((item) => {
                            return (
                              <Select.Option value={item.id} key={item.id}>
                                {item.brandName}
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
                        Loại sản phẩm
                      </span>
                      <Select
                        showSearch
                        maxTagCount={"responsive"}
                        optionFilterProp="children"
                        bordered={false}
                        onChange={(event) => {
                          handleSetProductDetail("category", { id: event });
                        }}
                        value={productDetailUpdate.category.id}
                        style={{
                          borderBottom: "1px solid black",
                          width: "100%",
                        }}
                        onSearch={(input, option) => {
                          setCategoryCreate(
                            input === "" ? categoryCreate : input
                          );
                          return (option?.label ?? "").includes(input);
                        }}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        notFoundContent={
                          <div
                            style={{ textAlign: "center" }}
                            onClick={() => {
                              createCategory();
                            }}
                          >
                            <PlusOutlined />
                          </div>
                        }
                      >
                        {categories &&
                          categories.map((item) => {
                            return (
                              <Select.Option value={item.id} key={item.id}>
                                {item.categoryName}
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
                        bordered={false}
                        onChange={(event) => {
                          handleSetProductDetail("material", { id: event });
                        }}
                        value={productDetailUpdate.material.id}
                        style={{
                          borderBottom: "1px solid black",
                          width: "100%",
                        }}
                        onSearch={(input, option) => {
                          setMaterialCreate(
                            input === "" ? materialCreate : input
                          );
                          return (option?.label ?? "").includes(input);
                        }}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        notFoundContent={
                          <div
                            style={{ textAlign: "center" }}
                            onClick={() => {
                              createMaterial();
                            }}
                          >
                            <PlusOutlined />
                          </div>
                        }
                      >
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
                        bordered={false}
                        onChange={(event) => {
                          handleSetProductDetail("collar", { id: event });
                        }}
                        value={productDetailUpdate.collar.id}
                        style={{
                          borderBottom: "1px solid black",
                          width: "100%",
                        }}
                        onSearch={(input, option) => {
                          setCollarCreate(input === "" ? collarCreate : input);
                          return (option?.label ?? "").includes(input);
                        }}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        notFoundContent={
                          <div
                            style={{ textAlign: "center" }}
                            onClick={() => {
                              createCollar();
                            }}
                          >
                            <PlusOutlined />
                          </div>
                        }
                      >
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
                        bordered={false}
                        onChange={(event) => {
                          handleSetProductDetail("sleeve", { id: event });
                        }}
                        value={productDetailUpdate.sleeve.id}
                        style={{
                          borderBottom: "1px solid black",
                          width: "100%",
                        }}
                        onSearch={(input, option) => {
                          setSleeveCreate(input === "" ? sleeveCreate : input);
                          return (option?.label ?? "").includes(input);
                        }}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        notFoundContent={
                          <div
                            style={{ textAlign: "center" }}
                            onClick={() => {
                              createSleeve();
                            }}
                          >
                            <PlusOutlined />
                          </div>
                        }
                      >
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
                        maxTagCount={"responsive"}
                        optionFilterProp="children"
                        bordered={false}
                        onChange={(event) => {
                          handleSetProductDetail("pattern", { id: event });
                        }}
                        value={productDetailUpdate.pattern.id}
                        style={{
                          borderBottom: "1px solid black",
                          width: "100%",
                        }}
                        onSearch={(input, option) => {
                          setPatternCreate(
                            input === "" ? patternCreate : input
                          );
                          return (option?.label ?? "").includes(input);
                        }}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        notFoundContent={
                          <div
                            style={{ textAlign: "center" }}
                            onClick={() => {
                              createPattern();
                            }}
                          >
                            <PlusOutlined />
                          </div>
                        }
                      >
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
                        maxTagCount={"responsive"}
                        optionFilterProp="children"
                        bordered={false}
                        onChange={(event) => {
                          handleSetProductDetail("shirtTail", { id: event });
                        }}
                        value={productDetailUpdate.shirtTail.id}
                        style={{
                          borderBottom: "1px solid black",
                          width: "100%",
                        }}
                        onSearch={(input, option) => {
                          setshirtTailCreate(
                            input === "" ? shirtTailCreate : input
                          );
                          return (option?.label ?? "").includes(input);
                        }}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        notFoundContent={
                          <div
                            style={{ textAlign: "center" }}
                            onClick={() => {
                              createShirtTail();
                            }}
                          >
                            <PlusOutlined />
                          </div>
                        }
                      >
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
                  <Col span={6} offset={3}>
                    <div style={{ margin: "0 8px 12px 8px" }}>
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
                        bordered={false}
                        onChange={(event) => {
                          handleSetProductDetail("form", { id: event });
                        }}
                        value={productDetailUpdate.form.id}
                        style={{
                          borderBottom: "1px solid black",
                          width: "100%",
                        }}
                        onSearch={(input, option) => {
                          setFormCreate(input === "" ? formCreate : input);
                          return (option?.label ?? "").includes(input);
                        }}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        notFoundContent={
                          <div
                            style={{ textAlign: "center" }}
                            onClick={() => {
                              createForm();
                            }}
                          >
                            <PlusOutlined />
                          </div>
                        }
                      >
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
                    <div style={{ margin: "0 8px 12px 8px" }}>
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
                          handleSetProductDetail("color", { id: event });
                        }}
                        status={
                          productDetailUpdate.color.id === "" ? "error" : ""
                        }
                        value={productDetailUpdate.color.id}
                        style={{
                          borderBottom: "1px solid black",
                          width: "100%",
                        }}
                      >
                        {colors &&
                          colors.map((item) => {
                            return (
                              <Select.Option key={item.id} value={item.id}>
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
                    <div style={{ margin: "0 8px 12px 8px" }}>
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
                        bordered={false}
                        onChange={(event) => {
                          handleSetProductDetail("size", { id: event });
                        }}
                        value={productDetailUpdate.size.id}
                        style={{
                          borderBottom: "1px solid black",
                          width: "100%",
                        }}
                        onSearch={(input, option) => {
                          setSizeCreate(input === "" ? sizeCreate : input);
                          return (option?.label ?? "").includes(input);
                        }}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        notFoundContent={
                          <div
                            style={{ textAlign: "center" }}
                            onClick={() => {
                              createSize();
                            }}
                          >
                            <PlusOutlined />
                          </div>
                        }
                      >
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
                    <div className="m-5">
                      <span
                        style={{
                          fontWeight: "500",
                          display: "block",
                          textAlign: "center",
                        }}
                      >
                        Số lượng
                      </span>
                      <Input
                        type={"number"}
                        value={productDetailUpdate.quantity}
                        status={
                          productDetailUpdate.quantity === "" ? "error" : ""
                        }
                        prefix="Q"
                        onChange={(event) => {
                          handleSetProductDetail(
                            "quantity",
                            event.target.value.replace(".", "")
                          );
                        }}
                      />
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="m-5">
                      <span
                        style={{
                          fontWeight: "500",
                          display: "block",
                          textAlign: "center",
                        }}
                      >
                        Giá
                      </span>
                      <Input
                        prefix="VND"
                        type={"number"}
                        value={productDetailUpdate.price}
                        onChange={(event) =>
                          handleSetProductDetail("price", event.target.value)
                        }
                        status={productDetailUpdate.price === "" ? "error" : ""}
                      />
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="m-5">
                      <span
                        style={{
                          fontWeight: "500",
                          display: "block",
                          textAlign: "center",
                        }}
                      >
                        Trọng lượng
                      </span>
                      <Input
                        type={"number"}
                        prefix="G"
                        value={productDetailUpdate.weight}
                        onChange={(event) =>
                          handleSetProductDetail("weight", event.target.value)
                        }
                        status={
                          productDetailUpdate.weight === "" ? "error" : ""
                        }
                      />
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="m-5">
                      <span
                        style={{
                          fontWeight: "500",
                          display: "block",
                          textAlign: "center",
                        }}
                      >
                        Mô tả
                      </span>
                      <TextArea
                        value={productDetailUpdate.descriptionDetail}
                        allowClear
                        onChange={(event) =>
                          handleSetProductDetail(
                            "descriptionDetail",
                            event.target.value
                          )
                        }
                        status={
                          productDetailUpdate.descriptionDetail === ""
                            ? "error"
                            : ""
                        }
                      />
                    </div>
                  </Col>
                  <Col
                    span={24}
                    style={{ textAlign: "center", margin: "12px 0" }}
                  >
                    <Button
                      type="primary"
                      onClick={() => {
                        confirm({
                          centered: true,
                          title: `Chỉnh sửa sản phẩm`,
                          icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
                          content: "Xác nhận chỉnh sửa",
                          onOk() {
                            updateProductDetail(
                              productDetailUpdate,
                              true,
                              index
                            );
                          },
                        });
                      }}
                    >
                      Cập nhật
                    </Button>
                  </Col>
                  <Col span={6}>
                    <div className="m-5">
                      <img
                        alt=""
                        style={{ width: "100%" }}
                        src={
                          "https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
                        }
                      />
                    </div>
                  </Col>
                  {record.productImageResponse &&
                    record.productImageResponse.map((productImage) => {
                      return (
                        <Col span={6} key={productImage.id}>
                          <div className="m-5">
                            <Card
                              hoverable
                              cover={
                                <Image
                                  src={productImage.path}
                                  className="image-wrapper"
                                />
                              }
                              actions={[
                                <Popconfirm
                                  title="Bạn có chắc muốn xóa ảnh này?"
                                  onConfirm={() =>
                                    deleteProductImage(productImage)
                                  }
                                  okText="Xóa"
                                  cancelText="Hủy"
                                  key="delete"
                                >
                                  <DeleteFilled style={{ fontSize: "16px" }} />
                                </Popconfirm>,
                              ]}
                            ></Card>
                          </div>
                        </Col>
                      );
                    })}
                  {record.productImageResponse?.length < 3 ? (
                    <Col span={6}>
                      <Spin
                        tip="Loading..."
                        spinning={loadingProductImage}
                        size="small"
                      >
                        <div
                          className="m-5"
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type={"file"}
                            style={{ display: "none" }}
                            multiple={true}
                            onChange={(event) => {
                              addProductImage(
                                productDetailUpdate,
                                event.target.files
                              );
                            }}
                            id={productDetailUpdate.id + "upload"}
                          />
                          <label
                            className={styles.btnUpload}
                            htmlFor={productDetailUpdate.id + "upload"}
                          >
                            <PlusOutlined />
                          </label>
                        </div>
                      </Spin>
                    </Col>
                  ) : null}
                </Row>
              </Spin>
            </Modal>
            <Button
              onClick={() => {
                setProductDetailUpdate(record);
                handlesetIsModalUpdateDetail(index, true);
              }}
              type="primary"
              size={"large"}
            >
              <EditFilled />
            </Button>
          </>
        );
      },
    },
  ];
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  //functions
  function addProductImage(productDetail, event) {
    setLoadingProductImage(true);
    var imageQuantity = productDetail.productImageResponse.length;
    var imageName =
      productDetail.product.productName.replaceAll(" ", "_") +
      productDetail.button.id +
      productDetail.brand.id +
      productDetail.category.id +
      productDetail.material.id +
      productDetail.collar.id +
      productDetail.sleeve.id +
      productDetail.shirtTail.id +
      productDetail.pattern.id +
      productDetail.form.id;
    for (var i = 0; i < event.length; i++) {
      imageQuantity++;
      if (imageQuantity > 3) {
        setTimeout(() => {
          message.warning("Sản phẩm chứa tối đa 3 ảnh", 2);
        }, 1500);
        break;
      }
      const currentTimeInMillis = new Date().getTime();
      const filename = currentTimeInMillis + imageName;
      const imgRef = ref(
        saveImage,
        `products/${product.productName}/${productDetail.color.colorName}/${filename}`
      );
      uploadBytes(imgRef, event[i])
        .then(() => {
          return getDownloadURL(imgRef);
        })
        .then((url) => {
          let productImageCreate = { ...productImage };
          productImageCreate.productDetailId = productDetail.id;
          productImageCreate.path = url;
          axios
            .post(api + "product/createProductImg", productImageCreate)
            .then((res) => {
              setRender(Math.random());
              setLoadingProductImage(false);
              message.success("Thêm ảnh thành công", 2);
            })
            .catch((err) => {
              console.log(err);
              return;
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleSetColorCreate(field, value) {
    setColorCreate((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  }

  function createBrand() {
    setLoadingUpdateProduct(true);
    if (brandCreate.trim() !== "") {
      axios
        .post(api + "brand?brandName=" + brandCreate, null)
        .then((res) => {
          if (res.data === "") {
            messageApi.error("Thương hiệu đã tồn tại!", 1);
          } else {
            messageApi.success("Thêm thương hiệu thành công!", 1);
            setRender(res.data);
          }
          setBrandCreate(" ");
          setLoadingUpdateProduct(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập thương hiệu!", 1);
    }
  }

  function createCategory() {
    setLoadingUpdateProduct(true);
    if (categoryCreate.trim() !== "") {
      axios
        .post(api + "category?categoryName=" + categoryCreate, null)
        .then((res) => {
          if (res.data === "") {
            messageApi.error("Loại sản phẩm đã tồn tại!", 1);
          } else {
            messageApi.success("Thêm loại sản phẩm thành công!", 1);
            setRender(res.data);
          }
          setCategoryCreate(" ");
          setLoadingUpdateProduct(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập loại sản phẩm!", 1);
    }
  }

  function createPattern() {
    setLoadingUpdateProduct(true);
    if (patternCreate.trim() !== "") {
      axios
        .post(api + "pattern?categoryName=" + patternCreate.trim(), null)
        .then((res) => {
          setPatternCreate(" ");
          if (res.data === "") {
            messageApi.error("Họa tiết đã tồn tại!", 1);
          } else {
            messageApi.success("Thêm hoạ tiết thành công!", 1);
          }
          setRender(Math.random());
          setLoadingUpdateProduct(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập hoạt tiết!", 1);
    }
  }

  function createForm() {
    setLoadingUpdateProduct(true);
    if (formCreate.trim() !== "") {
      axios
        .post(api + "form?categoryName=" + formCreate.trim(), null)
        .then((res) => {
          setRender(Math.random);
          if (res.data === "") {
            messageApi.error("Dáng áo đã tồn tại!", 1);
          } else {
            messageApi.success("Thêm dáng áo thành công!", 1);
          }
          setFormCreate(" ");
          setLoadingUpdateProduct(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập dáng áo!", 1);
    }
  }

  function createButton() {
    setLoadingUpdateProduct(true);
    if (buttonCreate.trim() !== "") {
      axios
        .post(api + "button/create", { buttonName: buttonCreate.trim() })
        .then((res) => {
          setRender(Math.random);
          if (res.data === "") {
            messageApi.error("Nút áo đã tồn tại!", 1);
          } else {
            messageApi.success("Thêm nút áo thành công!", 1);
          }
          setButtonCreate(" ");
          setLoadingUpdateProduct(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập nút áo!", 1);
    }
  }

  function createMaterial() {
    setLoadingUpdateProduct(true);
    if (materialCreate.trim() !== "") {
      axios
        .post(api + "material/create", { materialName: materialCreate.trim() })
        .then((res) => {
          setRender(Math.random);
          if (res.data === "") {
            messageApi.error("Chất liệu đã tồn tại!", 1);
          } else {
            messageApi.success("Thêm chất liệu thành công!", 1);
          }
          setMaterialCreate(" ");
          setLoadingUpdateProduct(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập chất liệu!", 1);
    }
  }

  function createCollar() {
    setLoadingUpdateProduct(true);
    if (collarCreate.trim() !== "") {
      axios
        .post(api + "collar/create", { collarTypeName: collarCreate.trim() })
        .then((res) => {
          setRender(Math.random);
          if (res.data === "") {
            messageApi.error("Cổ áo đã tồn tại!", 1);
          } else {
            messageApi.success("Thêm cổ áo thành công!", 1);
          }
          setCollarCreate(" ");
          setLoadingUpdateProduct(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập cổ áo!", 1);
    }
  }
  function createShirtTail() {
    setLoadingUpdateProduct(true);
    if (formCreate.trim() !== "") {
      axios
        .post(
          api + "shirt-tail?shirtTailTypeName=" + shirtTailCreate.trim(),
          null
        )
        .then((res) => {
          setRender(Math.random);
          if (res.data === "") {
            messageApi.error("Đuôi áo đã tồn tại!", 1);
          } else {
            messageApi.success("Thêm đuôi áo thành công!", 1);
          }
          setshirtTailCreate(" ");
          setLoadingUpdateProduct(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập dáng áo!", 1);
    }
  }
  function createSleeve() {
    setLoadingUpdateProduct(true);
    if (sleeveCreate.trim() !== "") {
      axios
        .post(api + "sleeve/create", { sleeveName: sleeveCreate.trim() })
        .then((res) => {
          setRender(Math.random);
          if (res.data === "") {
            messageApi.error("Tay áo đã tồn tại!", 1);
          } else {
            messageApi.success("Thêm tay áo thành công!", 1);
          }
          setSleeveCreate(" ");
          setLoadingUpdateProduct(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập tay áo!", 1);
    }
  }

  function createSize() {
    setLoadingUpdateProduct(true);
    if (sizeCreate.trim() !== "") {
      axios
        .post(api + "size/create", { sizeName: sizeCreate.trim() })
        .then((res) => {
          setRender(Math.random);
          if (res.data === "") {
            messageApi.error("Kích cỡ đã tồn tại!", 1);
          } else {
            messageApi.success("Thêm kích cỡ thành công!", 1);
          }
          setSizeCreate(" ");
          setLoadingUpdateProduct(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập kích cỡ!", 1);
    }
  }

  function createColor() {
    setLoadingUpdateProduct(true);
    if (
      colorCreate.colorName.trim() !== "" ||
      colorCreate.colorCode.trim() !== ""
    ) {
      axios
        .post(api + "color/create", colorCreate)
        .then((res) => {
          if (res.data === "") {
            messageApi.error("Màu sắc đã tồn tại!", 1);
          } else {
            messageApi.success("Thêm màu sắc thành công!", 1);
            setRender(Math.random());
          }
          setModalColorOpen(false);
          setLoadingUpdateProduct(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập màu sắc!", 1);
    }
  }

  function onSelectChange(newSelectedRowKeys) {
    setSelectedRowKeys(newSelectedRowKeys);
    setRender(Math.random);
  }

  function handlesetIsModalUpdateDetail(index, value) {
    const newModalVisible = [...isModalUpdateDetailOpen];
    newModalVisible[index] = value;
    setIsModalUpdateDetailOpen(newModalVisible);
  }

  function handleSetProduct(field, value) {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  }

  function handleSetProductDetail(field, value) {
    setProductDetailUpdate((productDetail) => ({
      ...productDetail,
      [field]: value,
    }));
  }

  function getProductDetailsUpdate(record, field, value) {
    record[field] = value;
    if (productDetailsUpdate.length === 0) {
      productDetailsUpdate.push(record);
    } else {
      for (let i = 0; i < productDetailsUpdate.length; i++) {
        if (productDetailsUpdate[i].id === record.id) {
          productDetailsUpdate.splice(i, 1, record);
          return;
        }
      }
      productDetailsUpdate.push(record);
    }
  }

  function updateProductDetail(productDetail, notifi, index) {
    let productDetailUpdateCopy = { ...productDetail };
    delete productDetailUpdateCopy["promotionCondition"];
    delete productDetailUpdateCopy["promotionMethod"];
    delete productDetailUpdateCopy["promotionValue"];
    delete productDetailUpdateCopy["productImageResponse"];
    if (notifi) {
      setLoadingUpdateProduct(true);
    }
    let check = isFormInputEmpty(productDetailUpdateCopy);
    if (check) {
      notification.error({
        message: "Thông báo",
        description: "Vui lòng không để trống các trường",
      });
      setRender(Math.random());
    } else {
      axios
        .put(api + "product/updateProductDetail", productDetailUpdateCopy)
        .then((res) => {
          if (notifi) {
            setLoadingUpdateProduct(false);
            if (res.data.id === productDetailUpdateCopy.id) {
              handlesetIsModalUpdateDetail(index, false);
              notification.success({
                message: "Thông báo",
                description: "Cập nhật sản phẩm thành công!",
              });
              setRender(Math.random());
            } else {
              notification.error({
                message: "Thông báo",
                description: "Sản phẩm đã tồn tại!",
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function updateProductDetails() {
    confirm({
      centered: true,
      title: `Chỉnh sửa sản phẩm`,
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      content: "Xác nhận chỉnh sửa",
      onOk() {
        setLoadingUpdateProducts(true);
        for (let keyUpdates of selectedRowKeys) {
          for (let productDetail of productDetailsUpdate) {
            if (keyUpdates === productDetail.id) {
              updateProductDetail(productDetail);
            }
          }
        }
        setSelectedRowKeys([]);
        notification.success({
          message: "Thông báo",
          description: <span>Chỉnh sửa sản phẩm thành công</span>,
        });
        setRender(Math.random());
        setLoadingUpdateProducts(false);
      },
    });
  }

  function filter() {
    setLoading(true);
    axios
      .get(
        api +
          "product/filterProductDetailByIdCom?productId=" +
          productId +
          "&brandId=" +
          brand +
          "&categoryId=" +
          category +
          "&buttonId=" +
          button +
          "&materialId=" +
          material +
          "&shirtTailId=" +
          shirtTail +
          "&sleeveId=" +
          sleeve +
          "&collarId=" +
          collar +
          "&colorId=" +
          color +
          "&sizeId=" +
          size +
          "&patternId=" +
          pattern +
          "&formId=" +
          form +
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
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function updateProduct() {
    let productUpdate = {
      id: product.id,
      productCode: product.productCode,
      productName: product.productName,
      description: product.description,
      status: product.status,
    };
    let check = isFormInputEmpty(productUpdate);
    if (!check) {
      axios
        .put(api + "product/update", productUpdate)
        .then((res) => {
          messageApi.loading("Vui lòng chờ!", 2);
          setTimeout(() => {
            setRender(Math.random);
            notification.open({
              message: "Thông báo",
              description: "Chỉnh sửa sản phẩm thành công",
              icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
            });
            setEditProduct(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập đầy đủ các trường");
    }
  }

  function deleteProductImage(productImage) {
    axios
      .delete(api + "product/deleteProductImage?id=" + productImage.id)
      .then((res) => {
        messageApi.success(`Xóa ảnh thành công`);
        deleteObject(ref(saveImage, productImage.path)).catch((err) => {
          messageApi.error(`Gặp lỗi khi thao tác trên firebase`);
          console.log(err);
        });
        setRender(Math.random);
      })
      .catch((err) => {
        messageApi.error(`Gặp lỗi khi thao tác trên dữ liệu`);
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get(api + "product/getMaxPrice?productId=" + productId)
      .then((res) => {
        if (maxPrice !== res.data) {
          const newPrice = [price[0], res.data];
          setPrice(newPrice);
          setMaxprice(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    filter();
    axios
      .get(api + "brand")
      .then((res) => {
        setBrands(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "product/getProductEdit?productId=" + productId)
      .then((response) => {
        setProduct(response.data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    maxPrice,
    productId,
    render,
    brand,
    button,
    category,
    material,
    collar,
    sleeve,
    pattern,
    shirtTail,
    form,
    color,
    size,
  ]);
  return (
    <>
      <Spin
        tip="Loading..."
        spinning={loadingUpdateProducts}
        size="large"
        style={{ width: "100%" }}
      >
        {contextHolder}
        <div className={styles.productDetails}>
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
            <FilePptOutlined /> Chỉnh sửa sản phẩm
          </h2>
          <Button type="primary" onClick={showModal}>
            <EyeOutlined />
          </Button>
          <Modal
            title={product.productCode}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={500}
          >
            <Row className="m-5">
              <Col span={16}>
                <p style={{ fontWeight: 500 }}>
                  sản phẩm{"  "}
                  {editProduct ? (
                    <Tooltip placement="right" title="Click to close form">
                      <CloseOutlined
                        onClick={() => {
                          setEditProduct(false);
                          setRender(Math.random);
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip placement="right" title="Click to open form">
                      <EditFilled
                        onClick={() => {
                          setEditProduct(true);
                        }}
                      />
                    </Tooltip>
                  )}
                </p>
                {editProduct ? (
                  <Input
                    size="small"
                    value={product.productName}
                    onChange={(event) =>
                      handleSetProduct("productName", event.target.value)
                    }
                    status={product.productName.trim() === "" ? "error" : ""}
                  />
                ) : (
                  <span>{product.productName}</span>
                )}
              </Col>
              <Col span={24}>
                <span style={{ fontWeight: 500 }}>Mô tả</span>
                {editProduct ? (
                  <TextArea
                    onChange={(event) =>
                      handleSetProduct("description", event.target.value)
                    }
                    value={product.description}
                  />
                ) : (
                  <p>{product.description}</p>
                )}
                {editProduct ? (
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <Button onClick={updateProduct} type="primary">
                      Xác nhận
                    </Button>
                  </div>
                ) : (
                  <hr />
                )}
              </Col>
            </Row>
          </Modal>
          <Row className={styles.productDetails__filter}>
            <Col span={4}>
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
                    setButton(event);
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
            <Col span={4}>
              <div style={{ margin: "0 8px 24px 8px" }}>
                <span
                  style={{
                    fontWeight: "500",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Thương hiệu
                </span>
                <Select
                  showSearch
                  onChange={(event) => setBrand(event)}
                  placeholder="Brand"
                  bordered={false}
                  style={{ borderBottom: "1px solid black", width: "100%" }}
                  defaultValue={""}
                >
                  <Select.Option key={"ALL"} value={""}>
                    Tất cả
                  </Select.Option>
                  {brands &&
                    brands.map((item) => {
                      return (
                        <Select.Option value={item.id} key={item.id}>
                          {item.brandName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={4}>
              <div style={{ margin: "0 8px 24px 8px" }}>
                <span
                  style={{
                    fontWeight: "500",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Loại sản phẩm
                </span>
                <Select
                  showSearch
                  bordered={false}
                  onChange={(event) => setCategory(event)}
                  placeholder="Category"
                  style={{ borderBottom: "1px solid black", width: "100%" }}
                  defaultValue={""}
                >
                  <Select.Option key={"ALL"} value={""}>
                    Tất cả
                  </Select.Option>
                  {categories &&
                    categories.map((item) => {
                      return (
                        <Select.Option value={item.id} key={item.id}>
                          {item.categoryName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={4}>
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
                    setMaterial(event);
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
            <Col span={4}>
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
                    setCollar(event);
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
            <Col span={4}>
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
                    setSleeve(event);
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
            <Col span={4} offset={2}>
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
                    setPattern(event);
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
            <Col span={4}>
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
                    setshirtTail(event);
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
            <Col span={4}>
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
                    setForm(event);
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
            <Col span={4}>
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
                    setColor(event);
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
                        <Select.Option value={item.id} key={item.id}>
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
            <Col span={4}>
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
                    setSize(event);
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
            <Col span={24}>
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
                  min={0}
                  max={maxPrice}
                  value={price}
                  onChange={(event) => {
                    setPrice(event);
                  }}
                  onAfterChange={() => setRender(Math.random())}
                  range
                />
              </div>
            </Col>
          </Row>
          <div className={styles.productDetails__table}>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={
                productDetails &&
                productDetails.map((record, index) => ({
                  ...record,
                  key: record.id,
                }))
              }
              expandable={{
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }} key={record.id}>
                    <span style={{ fontWeight: 500 }}>Nút áo: </span>
                    {record.button.buttonName}
                    <span style={{ fontWeight: 500 }}> - Chất liệu: </span>
                    {record.material.materialName}
                    <span style={{ fontWeight: 500 }}> - Cổ áo: </span>
                    {record.collar.collarTypeName}
                    <span style={{ fontWeight: 500 }}> - Nút áo: </span>
                    {record.button.buttonName}
                    <span style={{ fontWeight: 500 }}> - Tay áo: </span>
                    {record.sleeve.sleeveName}
                    <span style={{ fontWeight: 500 }}> - Đuôi áo: </span>
                    {record.shirtTail.shirtTailTypeName}
                    <span style={{ fontWeight: 500 }}> - Họa tiết: </span>
                    {record.pattern.patternName}
                    <span style={{ fontWeight: 500 }}> - Dáng áo: </span>
                    {record.form.formName}
                  </p>
                ),
              }}
              scroll={{ y: 500 }}
              loading={loading}
              pagination={{
                showSizeChanger: true,
                pageSizeOptions: [5, 10, 15, 20],
                defaultPageSize: 5,
                showLessItems: true,
                style: { marginRight: "10px" },
                onChange: (currentPage, pageSize) => {
                  setCurrentPage(currentPage);
                  setPageSize(pageSize);
                },
              }}
            />
            <div style={{ margin: "30px 0", textAlign: "center" }}>
              <Button
                type="primary"
                disabled={selectedRowKeys.length === 0}
                onClick={() => {
                  updateProductDetails();
                }}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default ProductDetails;
