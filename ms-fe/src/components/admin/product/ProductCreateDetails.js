import { EyeOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Row, Select } from "antd";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductCreateDetails.module.css";

const ProductCreateDetails = () => {
  const api = "http://localhost:8080/api/admin/";
  const { productId } = useParams();
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [buttons, setButtons] = useState(null);
  const [collars, setCollars] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [sleeves, setSleeves] = useState(null);
  const [shirtTails, setshirtTails] = useState(null);
  const [url, setUrl] = useState(
    "https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg"
  );
  const [product, setProduct] = useState({
    productName: "",
    brand: {},
    pattern: {},
    form: {},
    category: {},
    description: "",
  });

  //fucntion

  useEffect(() => {
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
      .get(api + "product/getProductEdit?productId=" + productId)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);
  return (
    <>
      <div className={styles.product}>
        <Row>
          <Col span={10} className={styles.product__Form}>
            <h2>
              <EyeOutlined /> Sản phẩm
            </h2>
            <br />
            <Row>
              <Col span={8}>
                <div className={styles.product__FormImg}>
                  <img src={url} alt="Avatar" />
                </div>
              </Col>
              <Col span={16}>
                <div className="m-5">
                  <h6>Tên sản phẩm</h6>
                  <p>{product.productName}</p>
                </div>
                <Row>
                  <Col span={12}>
                    <div className="m-5">
                      <h6>Thương hiệu</h6>
                      <p>{product.brand.brandName}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="m-5">
                      <h6>Loại sản phẩm</h6>
                      <p>{product.category.categoryName}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="m-5">
                      <h6>Họa tiết</h6>
                      <p>{product.pattern.patternName}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="m-5">
                      <h6>Dáng áo</h6>
                      <p>{product.form.formName}</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <div className="m-5">
                  <h6>Mô tả</h6>
                  <p>{product.description}</p>
                  <hr />
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={14} className={styles.product__createDetails}>
            <h2>
              <PlusSquareOutlined /> Chi tiết sản phẩm
            </h2>
            <br />

            <Row>
              <Col span={8}>
                <div className="m-5">
                  <span>Loại cúc áo</span>
                  <br />
                  <Select
                    showSearch
                    placeholder="Button"
                    className={styles.product__createDetailsSelect}
                  >
                    {buttons &&
                      buttons.map((item) => {
                        return (
                          <Select.Option value={item.id} key={item.id}>
                            {item.buttonName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <span>Chất liệu</span>
                  <br />
                  <Select
                    showSearch
                    placeholder="Material"
                    className={styles.product__createDetailsSelect}
                  >
                    {materials &&
                      materials.map((item) => {
                        return (
                          <Select.Option value={item.id} key={item.id}>
                            {item.materialName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <span>Cổ áo</span>
                  <br />
                  <Select
                    showSearch
                    placeholder="Collar"
                    className={styles.product__createDetailsSelect}
                  >
                    {collars &&
                      collars.map((item) => {
                        return (
                          <Select.Option value={item.id} key={item.id}>
                            {item.collarTypeName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <span>Tay áo</span>
                  <br />
                  <Select
                    showSearch
                    placeholder="Sleeve"
                    className={styles.product__createDetailsSelect}
                  >
                    {sleeves &&
                      sleeves.map((item) => {
                        return (
                          <Select.Option value={item.id} key={item.id}>
                            {item.sleeveName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <span>Đuôi áo</span>
                  <br />
                  <Select
                    showSearch
                    placeholder="Shirt tail"
                    className={styles.product__createDetailsSelect}
                  >
                    {shirtTails &&
                      shirtTails.map((item) => {
                        return (
                          <Select.Option value={item.id} key={item.id}>
                            {item.shirtTailTypeName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <span>Kích cỡ</span>
                  <br />
                  <Select
                    showSearch
                    mode="multiple"
                    placeholder="size"
                    optionFilterProp="children"
                    className={styles.product__createDetailsSelect}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                  >
                    {sizes &&
                      sizes.map((item) => {
                        return (
                          <Select.Option key={item.id}>
                            {item.sizeName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <span>Màu sắc</span>
                  <br />
                  <Select
                    showSearch
                    mode="multiple"
                    placeholder="Color"
                    optionFilterProp="children"
                    className={styles.product__createDetailsSelect}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                  >
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
              <Col span={8}>
                <div className="m-5">
                  <span>Giá mặc định</span>
                  <br />
                  <Input size="small" placeholder="Default price"></Input>
                </div>
              </Col>
              <Col span={24}>
                <div className="m-5">
                  <span>Mô tả</span>
                  <TextArea placeholder="Description" allowClear />
                  <br />
                  <br />
                  <div style={{ textAlign: "end" }}>
                    <Button>Hoàn thành</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductCreateDetails;
