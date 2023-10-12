import {
  CheckCircleTwoTone,
  CloseOutlined,
  PlusOutlined,
  WarningTwoTone,
} from "@ant-design/icons";
import {
  Col,
  Row,
  Button,
  message,
  Select,
  Popconfirm,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import styles from "./ProductUpdatesAddCom.module.css";
import { closeFrame } from "../animations/animation";
import axios from "axios";

const ProductUpdatesAddCom = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [productId, setProductId] = useState(props.productId);
  const [messageApi, contextHolder] = message.useMessage();
  const [buttons, setButtons] = useState(props.buttons);
  const [materials, setMaterials] = useState(props.materials);
  const [sleeves, setSleeves] = useState(props.sleeves);
  const [shirtTails, setshirtTails] = useState(props.shirtTails);
  const [collars, setCollars] = useState(props.collars);
  const [colors, setColors] = useState(props.colors);
  const [sizes, setSizes] = useState(props.sizes);
  const [sizesCreate, setSizesCreate] = useState([-1]);
  const [colorsCreate, setColorsCreate] = useState([-1]);
  const [buttonsCreate, setButtonsCreate] = useState([-1]);
  const [collarsCreate, setCollarsCreate] = useState([-1]);
  const [materialsCreate, setMaterialsCreate] = useState([-1]);
  const [sleevesCreate, setSleevesCreate] = useState([-1]);
  const [shirtTailsCreate, setshirtTailsCreate] = useState([-1]);
  const [productDetail, setProductDetail] = useState({
    id: null,
    productId: productId,
    buttonId: " ",
    materialId: " ",
    collarId: " ",
    sleeveId: " ",
    sizeId: " ",
    colorId: " ",
    shirtTailId: " ",
    price: 200000,
    quantity: 1,
    status: "ACTIVE",
    descriptionDetail: "",
  });
  //functions
  function handleSelectCom() {}
  function addtionalProductDetails() {
    message.loading("loading!", 3);
    if (
      buttonsCreate[0] === -1 &&
      materialsCreate[0] === -1 &&
      sleevesCreate[0] === -1 &&
      collarsCreate[0] === -1 &&
      shirtTailsCreate[0] === -1 &&
      sizesCreate[0] === -1 &&
      colorsCreate[0] === -1
    ) {
      setTimeout(() => {
        message.warning("Vui lòng chọn ít nhất một thành phẩn!", 2);
        setButtonsCreate([0]);
        setMaterialsCreate([0]);
        setSleevesCreate([0]);
        setCollarsCreate([0]);
        setshirtTailsCreate([0]);
        setColorsCreate([0]);
        setSizesCreate([0]);
      }, 3000);
      return;
    }
  }
  function addDetails(
    buttonsCreate,
    materialsCreate,
    collarsCreate,
    sleevesCreate,
    shirtTailsCreate,
    sizesCreate,
    colorsCreate
  ) {
    for (let button of buttonsCreate) {
      for (let material of materialsCreate) {
        for (let collar of collarsCreate) {
          for (let sleeve of sleevesCreate) {
            for (let shirtTail of shirtTailsCreate) {
              for (let size of sizesCreate) {
                for (let color of colorsCreate) {
                  let productDetailCreate = { ...productDetail };
                  productDetailCreate.productId = productId;
                  productDetailCreate.buttonId = button;
                  productDetailCreate.collarId = collar;
                  productDetailCreate.colorId = color;
                  productDetailCreate.materialId = material;
                  productDetailCreate.shirtTailId = shirtTail;
                  productDetailCreate.sleeveId = sleeve;
                  productDetailCreate.sizeId = size;
                  productDetailCreate.price = 200000;
                  productDetailCreate.quantity = 10;
                  productDetailCreate.status = "ACTIVE";
                  console.log(productDetailCreate);
                  axios
                    .post(api + "product/createDetail", productDetailCreate)
                    .then((response) => {})
                    .catch((error) => {
                      console.log(error);
                    });
                }
              }
            }
          }
        }
      }
    }
    setTimeout(() => {
      notification.open({
        message: "Thông báo",
        description: "Thêm mới các chi tiết sản phẩm thành công",
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      });
    }, 3000);
  }
  return (
    <div
      id="productUpdatesAddCom"
      className={`${styles.product__updateAddComs} d-none`}
    >
      {contextHolder}
      <div
        id="productUpdatesAddComFrame"
        className={styles.product__updateAddComsFrame}
      >
        <div className={styles.product__updateAddComsClose}>
          <Button
            onClick={() =>
              closeFrame("productUpdatesAddCom", "productUpdatesAddComFrame")
            }
          >
            <CloseOutlined />
          </Button>
        </div>
        <h2>
          <PlusOutlined /> Thêm mới chi tiết sản phẩm
        </h2>
        <br />
        <Row>
          <Col span={12}>
            <div className="m-5">
              <h6>Nút áo</h6>
              <Select
                showSearch
                placeholder="Button"
                optionFilterProp="children"
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(event) => {
                  setButtonsCreate(event.length === 0 ? [0] : event);
                }}
                status={buttonsCreate[0] === 0 ? "error" : ""}
              >
                {buttons &&
                  buttons.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        label={item.buttonName}
                        value={item.id}
                      >
                        {item.buttonName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={12}>
            <div className="m-5">
              <h6>Chất liệu</h6>
              <Select
                showSearch
                placeholder="Material"
                optionFilterProp="children"
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(event, record) => {
                  setMaterialsCreate(event.length === 0 ? [0] : event);
                }}
                status={materialsCreate[0] === 0 ? "error" : ""}
              >
                {materials &&
                  materials.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        label={item.materialName}
                        value={item.id}
                      >
                        {item.materialName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={12}>
            <div className="m-5">
              <h6>Cổ áo</h6>
              <Select
                showSearch
                placeholder="Collar"
                optionFilterProp="children"
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(event, record) => {
                  setCollarsCreate(event.length === 0 ? [0] : event);
                }}
                status={collarsCreate[0] === 0 ? "error" : ""}
              >
                {collars &&
                  collars.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        label={item.collarTypeName}
                        value={item.id}
                      >
                        {item.collarTypeName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={12}>
            <div className="m-5">
              <h6>Tay áo</h6>
              <Select
                showSearch
                placeholder="Sleeve"
                optionFilterProp="children"
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(event, record) => {
                  setSleevesCreate(event.length === 0 ? [0] : event);
                }}
                status={sleevesCreate[0] === 0 ? "error" : ""}
              >
                {sleeves &&
                  sleeves.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        label={item.sleeveName}
                        value={item.id}
                      >
                        {item.sleeveName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={12}>
            <div className="m-5">
              <h6>Đuôi áo</h6>
              <Select
                showSearch
                placeholder="Shirt tail"
                optionFilterProp="children"
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(event, record) => {
                  setshirtTailsCreate(event.length === 0 ? [0] : event);
                }}
                status={shirtTailsCreate[0] === 0 ? "error" : ""}
              >
                {shirtTails &&
                  shirtTails.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        label={item.shirtTailTypeName}
                        value={item.id}
                      >
                        {item.shirtTailTypeName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={12}>
            <div className="m-5">
              <h6>Kích cỡ</h6>
              <Select
                showSearch
                mode="multiple"
                placeholder="Size"
                optionFilterProp="children"
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(event, record) => {
                  setSizesCreate(event.length === 0 ? [0] : event);
                }}
                status={sizesCreate[0] === 0 ? "error" : ""}
              >
                {sizes &&
                  sizes.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        label={item.sizeName}
                        value={item.id}
                      >
                        {item.sizeName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={12}>
            <div className="m-5">
              <h6>Màu sắc</h6>
              <Select
                showSearch
                mode="multiple"
                placeholder="color"
                optionFilterProp="children"
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(event, record) => {
                  setColorsCreate(event.length === 0 ? [0] : event);
                }}
                status={colorsCreate[0] === 0 ? "error" : ""}
              >
                {colors &&
                  colors.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        label={item.colorName}
                        value={item.id}
                      >
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
        <br />
        <div style={{ textAlign: "center" }}>
          <Popconfirm
            title="Thêm mới chi tiết sản phẩm"
            description="Chắc chắn thêm mới chi tiết sản phẩm!"
            okText="Yes"
            cancelText="No"
            onConfirm={addtionalProductDetails}
          >
            <Button className={styles.product__createConfirm}>Xác nhận</Button>
          </Popconfirm>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ProductUpdatesAddCom;
