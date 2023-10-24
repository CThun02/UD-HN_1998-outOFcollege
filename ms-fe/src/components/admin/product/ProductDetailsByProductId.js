import {
  FilePptOutlined,
  EyeOutlined,
  EditFilled,
  FileImageFilled,
  CloseOutlined,
  PlusOutlined,
  CheckCircleTwoTone,
  DeleteFilled,
  StarFilled,
} from "@ant-design/icons";
import {
  Button,
  Carousel,
  Col,
  ColorPicker,
  message,
  notification,
  Popconfirm,
  Row,
  Select,
  Slider,
  Space,
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
import Confirm from "../confirm/Confirm";
import styles from "./ProductDetailsByProductId.module.css";
import { isFormInputEmpty } from "./ValidateForm";
import { deleteObject, ref } from "firebase/storage";
import { saveImage } from "../../../config/FireBase";

var buttonId = "",
  materialId = "",
  collarId = "",
  sleeveId = "",
  shirtTailId = "",
  patternId = "",
  formId = "",
  sizeId = "",
  colorId = "",
  price = [0, 0];
var productDetailsUpdate = [];
const ProductDetails = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const { productId } = useParams();
  const [product, setProduct] = useState({
    id: "",
    productCode: "",
    productName: "",
    brand: {},
    category: {},
    description: "",
    status: "",
  });
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [buttons, setButtons] = useState(null);
  const [collars, setCollars] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [sleeves, setSleeves] = useState(null);
  const [shirtTails, setshirtTails] = useState(null);
  const [patterns, setPatterns] = useState(null);
  const [forms, setForms] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [productImagesDefault, setProductImagesDefault] = useState([]);
  const [editProduct, setEditProduct] = useState(false);
  const [brands, setBrands] = useState([]);
  const [brandCreate, setBrandCreate] = useState("");
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
  const [categories, setCategories] = useState([]);
  const [categoryCreate, setCategoryCreate] = useState("");
  const [render, setRender] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [maxPrice, setMaxprice] = useState();
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [isModalUpdateDetailOpen, setIsModalUpdateDetailOpen] = useState([]);
  const [productDetailUpdate, setProductDetailUpdate] = useState({
    product: product,
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
    QRCode: "empty",
    status: "ACTIVE",
  });
  const [productImage, setProductImage] = useState({
    id: null,
    product: {},
    color: {},
    path: "",
    isDefault: false,
    status: "ACTIVE",
  });
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
          record.price
        );
      },
    },
    {
      key: "img",
      dataIndex: "image",
      title: <FileImageFilled />,
      width: 100,
      render: (text, record, index) => {
        return (
          <Carousel
            style={{ width: "100%", justifyContent: "center" }}
            autoplay
          >
            {productImages &&
              productImages.map((productImage) => {
                if (record.color.id === productImage.color.id) {
                  if (
                    productImage.path.includes(
                      "" +
                        record.button.id +
                        record.material.id +
                        record.collar.id +
                        record.sleeve.id +
                        record.shirtTail.id +
                        record.pattern.id +
                        record.form.id
                    )
                  ) {
                    return (
                      <img
                        key={productImage.id}
                        alt=""
                        src={productImage.path}
                      />
                    );
                  }
                }
              })}
          </Carousel>
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
              style={{ top: "20px" }}
            >
              <Row className={styles.productDetails__filter}>
                <Col span={8}>
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
                      value={productDetailUpdate?.button.id}
                      bordered={false}
                      onChange={(event) => {
                        handleSetProductDetail("button", { id: event });
                      }}
                      style={{ borderBottom: "1px solid black", width: "100%" }}
                      status={
                        productDetailUpdate.button.id === "" ? "error" : ""
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
                            <Select.Option key={item.id} value={item.id}>
                              {item.buttonName}
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
                        handleSetProductDetail("material", { id: event });
                      }}
                      value={productDetailUpdate.material.id}
                      style={{ borderBottom: "1px solid black", width: "100%" }}
                      status={
                        productDetailUpdate.material.id === "" ? "error" : ""
                      }
                    >
                      <Select.Option value={"add"}>
                        <Space.Compact>
                          <Input
                            placeholder="Add new material"
                            size="small"
                            value={materialCreate}
                            onClick={(event) => {
                              handleCustomOptionClick(event);
                            }}
                            onChange={(event) => {
                              setMaterialCreate(event.target.value);
                            }}
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
                            <Select.Option key={item.id} value={item.id}>
                              {item.materialName}
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
                        handleSetProductDetail("collar", { id: event });
                      }}
                      value={productDetailUpdate.collar.id}
                      style={{ borderBottom: "1px solid black", width: "100%" }}
                      status={
                        productDetailUpdate.collar.id === "" ? "error" : ""
                      }
                    >
                      <Select.Option value={"add"}>
                        <Space.Compact>
                          <Input
                            placeholder="Add new collar"
                            size="small"
                            value={collarCreate}
                            onClick={(event) => {
                              handleCustomOptionClick(event);
                            }}
                            onChange={(event) => {
                              setCollarCreate(event.target.value);
                            }}
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
                            <Select.Option key={item.id} value={item.id}>
                              {item.collarTypeName}
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
                        handleSetProductDetail("sleeve", { id: event });
                      }}
                      status={
                        productDetailUpdate.sleeve.id === "" ? "error" : ""
                      }
                      value={productDetailUpdate.sleeve.id}
                      style={{ borderBottom: "1px solid black", width: "100%" }}
                    >
                      <Select.Option value={"add"}>
                        <Space.Compact>
                          <Input
                            placeholder="Add new sleeve"
                            size="small"
                            value={sleeveCreate}
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
                            <Select.Option key={item.id} value={item.id}>
                              {item.sleeveName}
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
                        handleSetProductDetail("pattern", { id: event });
                      }}
                      status={
                        productDetailUpdate.pattern.id === "" ? "error" : ""
                      }
                      value={productDetailUpdate.pattern.id}
                      style={{ borderBottom: "1px solid black", width: "100%" }}
                    >
                      <Select.Option value={"add"}>
                        <Space.Compact>
                          <Input
                            placeholder="Add new pattern"
                            size="small"
                            value={patternCreate}
                            onClick={(event) => {
                              handleCustomOptionClick(event);
                            }}
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
                            <Select.Option key={item.id} value={item.id}>
                              {item.patternName}
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
                        handleSetProductDetail("shirtTail", { id: event });
                      }}
                      status={
                        productDetailUpdate.shirtTail.id === "" ? "error" : ""
                      }
                      value={productDetailUpdate.shirtTail.id}
                      style={{ borderBottom: "1px solid black", width: "100%" }}
                    >
                      <Select.Option value={"add"}>
                        <Space.Compact>
                          <Input
                            placeholder="Add new shirtTail"
                            size="small"
                            value={shirtTailCreate}
                            onClick={(event) => {
                              handleCustomOptionClick(event);
                            }}
                            onChange={(event) => {
                              setshirtTailCreate(event.target.value);
                            }}
                          />
                          <Button
                            onClick={(event) => {
                              createShirtTail(event);
                            }}
                          >
                            <PlusOutlined />
                          </Button>
                        </Space.Compact>
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
                        handleSetProductDetail("form", { id: event });
                      }}
                      status={productDetailUpdate.form.id === "" ? "error" : ""}
                      value={productDetailUpdate.form.id}
                      style={{ borderBottom: "1px solid black", width: "100%" }}
                    >
                      <Select.Option value={"add"}>
                        <Space.Compact>
                          <Input
                            placeholder="Add new form"
                            size="small"
                            value={formCreate}
                            onClick={(event) => {
                              handleCustomOptionClick(event);
                            }}
                            onChange={(event) => {
                              setFormCreate(event.target.value);
                            }}
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
                            <Select.Option key={item.id} value={item.id}>
                              {item.formName}
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
                      style={{ borderBottom: "1px solid black", width: "100%" }}
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
                      status={productDetailUpdate.size.id === "" ? "error" : ""}
                      bordered={false}
                      onChange={(event) => {
                        handleSetProductDetail("size", { id: event });
                      }}
                      value={productDetailUpdate.size.id}
                      style={{ borderBottom: "1px solid black", width: "100%" }}
                    >
                      <Select.Option value={"add"}>
                        <Space.Compact>
                          <Input
                            placeholder="Add new size"
                            size="small"
                            value={sizeCreate}
                            onClick={(event) => {
                              handleCustomOptionClick(event);
                            }}
                            onChange={(event) => {
                              setSizeCreate(event.target.value);
                            }}
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
                            <Select.Option key={item.id} value={item.id}>
                              {item.sizeName}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  </div>
                </Col>
                <Col span={12}>
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
                      onChange={(event) => {
                        handleSetProductDetail(
                          "quantity",
                          event.target.value.replace(".", "")
                        );
                      }}
                    />
                  </div>
                </Col>
                <Col span={12}>
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
                      type={"number"}
                      value={productDetailUpdate.price}
                      onChange={(event) =>
                        handleSetProductDetail("price", event.target.value)
                      }
                      status={productDetailUpdate.price === "" ? "error" : ""}
                    />
                  </div>
                </Col>
                <Col
                  span={24}
                  style={{ textAlign: "center", margin: "12px 0" }}
                >
                  <Popconfirm
                    title={"Xác nhận cập nhật sản phẩm"}
                    onConfirm={() => {
                      updateProductDetail(productDetailUpdate, true);
                      handlesetIsModalUpdateDetail(index, false);
                    }}
                  >
                    <Button type="primary">Cập nhật</Button>
                  </Popconfirm>
                </Col>
                <Col span={6} style={{ marginTop: "12px" }}>
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

                <Col span={18} style={{ marginTop: "12px" }}>
                  <Row>
                    {productImages &&
                      productImages.map((productImage) => {
                        if (record.color.id === productImage.color.id) {
                          if (
                            productImage.path.includes(
                              "" +
                                record.button.id +
                                record.material.id +
                                record.collar.id +
                                record.sleeve.id +
                                record.shirtTail.id +
                                record.pattern.id +
                                record.form.id
                            )
                          ) {
                            return (
                              <Col span={6} key={productImage.id}>
                                <div className="m-5">
                                  <Card
                                    hoverable
                                    cover={
                                      <img
                                        onClick={() => {}}
                                        alt="example"
                                        src={productImage.path}
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
                                        <DeleteFilled
                                          style={{ fontSize: "16px" }}
                                        />
                                      </Popconfirm>,
                                      <StarFilled
                                        key="setDefault"
                                        className={styles.defaultImage}
                                        onClick={() => {
                                          updateProductImage(productImage);
                                        }}
                                        style={
                                          productImage.isDefault === true
                                            ? {
                                                color: "rgb(192, 192, 76) ",
                                              }
                                            : {}
                                        }
                                      />,
                                    ]}
                                  ></Card>
                                </div>
                              </Col>
                            );
                          }
                        }
                      })}
                  </Row>
                </Col>
              </Row>
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
  function handleSetColorCreate(field, value) {
    setColorCreate((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
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

  function handleCustomOptionClick(event) {
    event.stopPropagation();
    event.target.focus();
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

  function updateProductDetail(productDetail, notifi) {
    if (notifi) {
      message.loading("loading", 1);
    }
    let check = isFormInputEmpty(productDetailUpdate);
    if (check) {
      setTimeout(() => {
        notification.error({
          message: "Thông báo",
          description: "Vui lòng không để trống các trường",
        });
        setRender(Math.random());
      }, 1000);
    } else {
      axios
        .put(api + "product/updateProductDetail", productDetail)
        .then((res) => {
          if (notifi) {
            setTimeout(() => {
              notification.success({
                message: "Thông báo",
                description: "Cập nhật sản phẩm thành công",
              });
              setRender(Math.random());
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function updateProductDetails() {
    message.loading("Loading...", 1);
    setIsModalConfirmOpen(false);
    setSelectedRowKeys([]);
    for (let keyUpdates of selectedRowKeys) {
      for (let productDetail of productDetailsUpdate) {
        if (keyUpdates === productDetail.id) {
          updateProductDetail(productDetail);
        }
      }
    }
    setTimeout(() => {
      notification.success({
        message: "Thông báo",
        description: <span>Chỉnh sửa sản phẩm thành công</span>,
      });
      setRender(Math.random());
    }, 1000);
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
          sizeId +
          "&patternId=" +
          patternId +
          "&formId=" +
          formId +
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

  function createBrand(event) {
    event.stopPropagation();
    messageApi.loading("Đang tải", 1);
    if (brandCreate.trim() !== "") {
      axios
        .post(api + "brand?brandName=" + brandCreate, null)
        .then((res) => {
          setTimeout(() => {
            if (res.data === "") {
              messageApi.error("Thương hiệu đã tồn tại!", 1);
            } else {
              messageApi.success("Thêm thương hiệu thành công!", 1);
              setRender(res.data);
            }
            setBrandCreate(" ");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        messageApi.error("Vui lòng nhập thương hiệu!", 1);
      }, 1000);
    }
  }

  function createCategory(event) {
    event.stopPropagation();
    messageApi.loading("Đang tải", 1);
    if (categoryCreate.trim() !== "") {
      axios
        .post(api + "category?categoryName=" + categoryCreate, null)
        .then((res) => {
          setTimeout(() => {
            if (res.data === "") {
              messageApi.error("Loại sản phẩm đã tồn tại!", 1);
            } else {
              messageApi.success("Thêm loại sản phẩm thành công!", 1);
              setRender(res.data);
            }
            setCategoryCreate(" ");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        messageApi.error("Vui lòng nhập loại sản phẩm!", 1);
      }, 1000);
    }
  }

  function updateProduct() {
    let productUpdate = {
      id: product.id,
      productCode: product.productCode,
      productName: product.productName,
      brandId: product.brand.id,
      categoryId: product.category.id,
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
              message: "Notification",
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

  function updateProductImage(productImageEdit) {
    let productImageUpdate = { ...productImage };
    productImageUpdate.id = productImageEdit.id;
    productImageUpdate.product = { id: productImageEdit.product.id };
    productImageUpdate.color = { id: productImageEdit.color.id };
    productImageUpdate.isDefault = !productImageEdit.isDefault;
    productImageUpdate.path = productImageEdit.path;
    productImageUpdate.status = productImageEdit.status;
    axios
      .put(api + "product/updateProductImg", productImageUpdate)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    messageApi.success(
      `${productImageUpdate.isDefault ? "Đặt" : "Hủy"} ảnh mặc định thành công`
    );
    setRender(Math.random());
  }

  function deleteProductImage(productImage) {
    axios
      .delete(api + "product/deleteProductImage?id=" + productImage.id)
      .then((res) => {
        messageApi.success(`Xóa ảnh thành công`);
        deleteObject(ref(saveImage, productImage.path));
        setRender(Math.random);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    axios
      .get(api + "product/getMaxPrice?productId=" + productId)
      .then((res) => {
        setMaxprice(res.data);
        price[1] = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
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
      .get(
        api + "product/getProductImageDefaultByProductId?productId=" + productId
      )
      .then((res) => {
        setProductImagesDefault(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(api + "product/filterProductDetailByIdCom?productId=" + productId)
      .then((response) => {
        setProductDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "product/getProductImageByProductId?productId=" + productId)
      .then((res) => {
        setProductImages(res.data);
      })
      .catch((err) => {
        console.log(err);
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
  }, [render]);
  return (
    <>
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
            <Col span={8}>
              <div className="m-5">
                <Carousel
                  style={{
                    width: "100%",
                    justifyContent: "center",
                  }}
                  autoplay
                >
                  {productImagesDefault &&
                    productImagesDefault.map((productImage) => {
                      return (
                        <img
                          key={productImage.id}
                          style={{ width: "100%" }}
                          alt=""
                          src={productImage.path}
                        />
                      );
                    })}
                  {productImagesDefault.length === 0 ? (
                    <div>
                      <img
                        alt=""
                        style={{
                          width: "100%",
                        }}
                        src={
                          "https://img.freepik.com/premium-vector/camera-with-plus-sign-icon_625445-191.jpg?w=2000"
                        }
                      />
                    </div>
                  ) : null}
                </Carousel>
              </div>
            </Col>
            <Col span={16}>
              <Row className="m-5">
                <Col span={24} style={{ marginBottom: "8px" }}>
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
                <Col span={24} style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: 500 }}>Thương hiệu</span>
                  <br />
                  {!editProduct ? (
                    <span>{product.brand.brandName}</span>
                  ) : (
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Brand"
                      status={product.brand.id === "" ? "error" : ""}
                      value={product.brand.id}
                      onChange={(event) =>
                        handleSetProduct("brand", { id: event })
                      }
                    >
                      <Select.Option value={"add"}>
                        <Space.Compact style={{ width: "100%" }}>
                          <Input
                            placeholder="Add new brand"
                            size="small"
                            onClick={(event) => {
                              handleCustomOptionClick(event);
                            }}
                            value={brandCreate}
                            onChange={(event) => {
                              setBrandCreate(event.target.value);
                            }}
                          />
                          <Button
                            onClick={(event) => {
                              createBrand(event);
                            }}
                          >
                            <PlusOutlined />
                          </Button>
                        </Space.Compact>
                      </Select.Option>
                      {brands &&
                        brands.map((item) => {
                          return (
                            <Select.Option
                              label={item.brandName}
                              value={item.id}
                              key={item.id}
                            >
                              {item.brandName}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  )}
                </Col>
                <Col span={24}>
                  <span style={{ fontWeight: 500 }}>Loại sản phẩm</span>
                  <br />
                  {!editProduct ? (
                    <span>{product.category.categoryName}</span>
                  ) : (
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      onChange={(event) =>
                        handleSetProduct("category", { id: event })
                      }
                      placeholder="Category"
                      status={product.category.id === "" ? "error" : ""}
                      value={product.category.id}
                    >
                      <Select.Option value={"add"}>
                        <Space.Compact style={{ width: "100%" }}>
                          <Input
                            placeholder="Add new category"
                            size="small"
                            onClick={(event) => {
                              handleCustomOptionClick(event);
                            }}
                            value={categoryCreate}
                            onChange={(event) => {
                              setCategoryCreate(event.target.value);
                            }}
                          />
                          <Button
                            onClick={(event) => {
                              createCategory(event);
                            }}
                          >
                            <PlusOutlined />
                          </Button>
                        </Space.Compact>
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
                  )}
                </Col>
              </Row>
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
                  <Popconfirm
                    onConfirm={updateProduct}
                    title="Xác nhận chỉnh sửa?"
                  >
                    <Button type="primary">Xác nhận</Button>
                  </Popconfirm>
                </div>
              ) : (
                <hr />
              )}
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
                    patternId = event;
                    filter();
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
                    formId = event;
                    filter();
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
            <Col span={12}>
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
                  max={maxPrice}
                  min={0}
                  onAfterChange={(event) => {
                    price = event;
                    filter();
                  }}
                  range
                />
              </div>
            </Col>
          </Row>
        </Col>
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
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <Confirm
              handelOk={updateProductDetails}
              handleCancel={() => setIsModalConfirmOpen(false)}
              isModalOpen={isModalConfirmOpen}
              title={"Xác nhận chỉnh sửa"}
            />
            <Button
              type="primary"
              disabled={selectedRowKeys.length === 0}
              onClick={() => {
                setIsModalConfirmOpen(true);
              }}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
