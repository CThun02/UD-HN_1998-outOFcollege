import {
  EditOutlined,
  EyeOutlined,
  FormOutlined,
  TableOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Col, message, Row, Select, Table } from "antd";
import { isString } from "antd/es/button";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import Upload from "antd/es/upload/Upload";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductUpdate.module.css";
import { isFormInputEmpty } from "./ValidateForm";

const ProductUpdate = () => {
  const { productId } = useParams();
  const api = "http://localhost:8080/api/admin/";
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [brands, setBrands] = useState(null);
  const [categories, setCategories] = useState(null);
  const [patterns, setPatterns] = useState(null);
  const [forms, setForms] = useState(null);
  const [url, setUrl] = useState(
    "https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg"
  );
  const [productDetails, setProductDetails] = useState([]);
  const [product, setProduct] = useState({
    id: null,
    productCode: "",
    productName: "",
    brandId: null,
    imgDefault: "",
    categoryId: null,
    patternId: null,
    formId: null,
    description: "",
  });
  const columns = [
    {
      key: "stt",
      dataIndex: "index",
      title: "STT",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      key: "button",
      dataIndex: "button",
      title: "Loại cúc áo",
      render: (text, record, index) => {
        return record.button.buttonName;
      },
    },
    {
      key: "material",
      dataIndex: "material",
      title: "Chất liệu",
      render: (text, record, index) => {
        return record.material.materialName;
      },
    },
    {
      key: "collar",
      dataIndex: "collar",
      title: "Loại cổ áo",
      render: (text, record, index) => {
        return record.collar.collarTypeName;
      },
    },
    {
      key: "shirtTail",
      dataIndex: "shirtTail",
      title: "Loại đuôi áo",
      render: (text, record, index) => {
        return record.shirtTail.shirtTailTypeName;
      },
    },
    {
      key: "sleeve",
      dataIndex: "sleeve",
      title: "Loại tay áo",
      render: (text, record, index) => {
        return record.sleeve.sleeveName;
      },
    },
    {
      key: "action",
      title: "Thao tác",
      dataIndex: "id",
      render: (text, record, index) => (
        <>
          <Link
            to={`/admin/product/update-details?productDetail=${encodeURIComponent(
              JSON.stringify(record)
            )}`}
          >
            <Button className={styles.product__updateButton}>
              <EditOutlined />
            </Button>
          </Link>
          <Button className={styles.product__updateButton}>
            <EyeOutlined />
          </Button>
        </>
      ),
    },
  ];
  //functions
  function handleUpload(event) {
    if (event.file && event.fileList.length > 1) {
      event.fileList.splice(0, 1);
    }
    if (event.file && event.fileList.length > 0) {
      const uploadedFile = event.fileList[0].originFileObj;

      // Tạo đối tượng FileReader để đọc nội dung của file
      const reader = new FileReader();

      // Định nghĩa hàm xử lý khi FileReader đọc xong file
      reader.onload = () => {
        const newImageUrl = reader.result;

        // Cập nhật state với đường dẫn hình ảnh mới
        setUrl(newImageUrl);
      };

      // Đọc nội dung của file dưới dạng URL
      reader.readAsDataURL(uploadedFile);
    }
  }

  function update() {
    for (let key in product) {
      if (isString(product[key])) {
        if (product[key].trim() === "") {
          handleSetProduct(key, product[key].trim());
        }
      }
    }
    let check = isFormInputEmpty(product);
    if (!check) {
      messageApi.loading("Đang tải!", 2);
      axios
        .put(api + "product/update", product)
        .then((response) => {
          setTimeout(() => {
            messageApi.success("Chỉnh sửa sản phẩm thành công!", 2);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            messageApi.error("Chỉnh sửa sản phẩm thất bại!", 2);
          }, 2000);
        });
    } else {
      messageApi.error("Vui lòng nhập tất cả các trường!", 2);
    }
  }

  function handleSetProduct(field, value) {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  }
  useEffect(() => {
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
      .get(
        api + "product/getProductDetailsTableByIdProduct?productId=" + productId
      )
      .then((response) => {
        setProductDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "product/getProductEdit?productId=" + productId)
      .then((response) => {
        handleSetProduct("id", response.data.id);
        handleSetProduct("productName", response.data.productName);
        handleSetProduct("productCode", response.data.productCode);
        handleSetProduct("imgDefault", response.data.imgDefault);
        handleSetProduct("brandId", response.data.brand.id);
        handleSetProduct("categoryId", response.data.category.id);
        handleSetProduct("patternId", response.data.pattern.id);
        handleSetProduct("formId", response.data.form.id);
        handleSetProduct("description", response.data.description);
        handleSetProduct("status", response.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);
  return (
    <div>
      {contextHolder}
      <Row>
        <Col span={8}>
          <div className={styles.product__update}>
            <h2>
              <FormOutlined /> Sản phẩm
            </h2>
            <Row>
              <Col span={8}>
                <div className={styles.product__FormImg}>
                  <img src={url} alt="Avatar" />
                  <div className={styles.product__FormImgIcon}>
                    <Upload
                      showUploadList={false}
                      multiple={false}
                      onChange={(event) => {
                        handleUpload(event);
                      }}
                    >
                      <EditOutlined />
                    </Upload>
                  </div>
                </div>
              </Col>
              <Col span={16}>
                <div className="m-5">
                  <h6>Tên sản phẩm</h6>
                  <Input
                    placeholder="Product name"
                    value={product.productName}
                    onChange={(event) => {
                      handleSetProduct("productName", event.target.value);
                    }}
                    status={product.productName === "" ? "error" : ""}
                  />
                </div>
                <div className="m-5">
                  <h6>Thương hiệu</h6>
                  <Select
                    showSearch
                    placeholder="brand"
                    optionFilterProp="children"
                    className={styles.product__updateSelect}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    value={product.brandId}
                    onChange={(event) => {
                      handleSetProduct("brandId", event);
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
                </div>
                <div className="m-5">
                  <h6>Loại sản phẩm</h6>
                  <Select
                    showSearch
                    placeholder="Category"
                    optionFilterProp="children"
                    className={styles.product__updateSelect}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    value={product.categoryId}
                    onChange={(event) => {
                      handleSetProduct("categoryId", event);
                    }}
                  >
                    {categories &&
                      categories.map((item) => {
                        return (
                          <Select.Option key={item.id} value={item.id}>
                            {item.categoryName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
                <div className="m-5">
                  <h6>Họa tiết</h6>
                  <Select
                    showSearch
                    placeholder="Pattern"
                    optionFilterProp="children"
                    className={styles.product__updateSelect}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    value={product.patternId}
                    onChange={(event) => {
                      handleSetProduct("patternId", event);
                    }}
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
                <div className="m-5">
                  <h6>Dáng áo</h6>
                  <Select
                    showSearch
                    placeholder="Form"
                    optionFilterProp="children"
                    className={styles.product__updateSelect}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    value={product.formId}
                    onChange={(event) => {
                      handleSetProduct("formId", event);
                    }}
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
              <Col span={24}>
                <div className="m-5">
                  <h6>Mô tả</h6>
                  <TextArea
                    style={{ height: "200px" }}
                    value={product.description}
                    onChange={(event) => {
                      handleSetProduct("description", event.target.value);
                    }}
                    status={product.description === "" ? "error" : ""}
                  />
                </div>
                <br />
                <div style={{ textAlign: "end" }}>
                  <Button
                    className={styles.product__updateButtonConfirm}
                    onClick={update}
                  >
                    Hoàn thành
                  </Button>
                </div>
                <br />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={16}>
          <div className={styles.product__details}>
            <h2>
              <TableOutlined /> Bảng chi tiết sản phẩm
            </h2>
            <div className="m-5">
              <Table
                dataSource={
                  productDetails &&
                  productDetails.map((record, index) => ({
                    ...record,
                    key: index,
                  }))
                }
                columns={columns}
                loading={loading}
                footer={() => {
                  return (
                    <div style={{ textAlign: "center" }}>
                      <Link to={"/admin/product/create-details/" + productId}>
                        <Button className={styles.product__updateButton}>
                          <PlusCircleOutlined
                            className={styles.product__updateCreateButton}
                          />
                        </Button>
                      </Link>
                    </div>
                  );
                }}
              ></Table>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductUpdate;
