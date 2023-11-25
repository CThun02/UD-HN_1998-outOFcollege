import {
  CaretRightOutlined,
  CheckCircleTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  message,
  Row,
  Select,
  Input,
  Collapse,
  ColorPicker,
  notification,
  Spin,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Modal from "antd/es/modal/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./ProductCreateDetails.module.css";
import ProductDetailsTable from "./ProductDetailsTable";
import { isFormInputEmpty } from "./ValidateForm";
import { getToken } from "../../../service/Token";

const ProductCreateDetails = () => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const { confirm } = Modal;
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingColor, setLoadingColor] = useState(false);
  const [button, setButton] = useState({});
  const [collar, setCollar] = useState({});
  const [material, setMaterial] = useState({});
  const [sleeve, setSleeve] = useState({});
  const [shirtTail, setshirtTail] = useState({});
  const [form, setForm] = useState({});
  const [pattern, setPattern] = useState({});
  const [brand, setBrand] = useState({});
  const [category, setCategory] = useState({});
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [buttons, setButtons] = useState(null);
  const [collars, setCollars] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [sleeves, setSleeves] = useState(null);
  const [shirtTails, setshirtTails] = useState(null);
  const [forms, setForms] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizesCreate, setSizesCreate] = useState([]);
  const [colorsCreate, setColorsCreate] = useState([]);
  const [brandCreate, setBrandCreate] = useState("");
  const [categoryCreate, setCategoryCreate] = useState("");
  const [sizeCreate, setSizeCreate] = useState("");
  const [colorCreate, setColorCreate] = useState({
    colorCode: "",
    colorName: "",
  });
  const [patternCreate, setPatternCreate] = useState("");
  const [formCreate, setFormCreate] = useState("");
  const [buttonCreate, setButtonCreate] = useState("");
  const [collarCreate, setCollarCreate] = useState("");
  const [materialCreate, setMaterialCreate] = useState("");
  const [sleeveCreate, setSleeveCreate] = useState("");
  const [shirtTailCreate, setshirtTailCreate] = useState("");
  const [productList, setProductList] = useState(null);
  const [render, setRender] = useState(1);
  const [modalColorOpen, setModalColorOpen] = useState(false);
  const [quantityExist, setQuantityExist] = useState(0);
  const [keyProductDetailExistActive, setKeyProductDetailActive] =
    useState("0");
  const [productDetailsExist, setproductDetailsExist] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [modalProductCreate, setmodalProductCreate] = useState(false);
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    status: "ACTIVE",
  });
  const [productDetail, setProductDetail] = useState({
    productId: "",
    buttonId: " ",
    materialId: " ",
    collarId: " ",
    sleeveId: " ",
    patternId: " ",
    formId: " ",
    sizeId: " ",
    colorId: " ",
    brandId: " ",
    categoryId: " ",
    shirtTailId: " ",
    price: 200000,
    weight: 200,
    quantity: 10,
  });
  var productDetailsCreate = renderProductDetails();

  //fucntion
  function handleSetProductDetail(field, value) {
    setProductDetail((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  }

  function handleSetColorCreate(field, value) {
    setColorCreate((prevColor) => ({
      ...prevColor,
      [field]: value,
    }));
  }

  function handleSetProduct(field, value) {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  }

  function createProduct() {
    for (let key in product) {
      if (typeof product[key] === "string") {
        if (product[key].trim() === "") {
          handleSetProduct(key, product[key].trim());
        }
      }
    }
    let check = isFormInputEmpty(product);
    if (!check) {
      confirm({
        centered: true,
        title: `Thêm mới sản phẩm ${product.productName}`,
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        content: "Xác nhận thêm mới",
        onOk() {
          setLoadingProduct(true);
          axios
            .post(api + "product/create", product, {
              headers: {
                Authorization: `Bearer ${getToken(true)}`,
              },
            })
            .then((res) => {
              setLoadingProduct(false);
              handleSetProduct("description", " ");
              setmodalProductCreate(false);
              setProduct(res.data);
              setRender(Math.random());
              handleSetProductDetail("productId", res.data.id);
              notification.open({
                message: "Thông báo",
                description: "Thêm mới sản phẩm thành công",
                icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
              });
            })
            .catch((err) => {
              const status = err.response.status;
              if (status === 403) {
                notification.error({
                  message: "Thông báo",
                  description: "Bạn không có quyền truy cập!",
                });
              }
            });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    } else {
      messageApi.error("Vui lòng nhập đầy đủ các trường");
    }
  }

  function getProductDetailsExist() {
    if (
      product.id !== null &&
      product.id !== undefined &&
      button.key !== undefined &&
      collar.key !== undefined &&
      material.key !== undefined &&
      sleeve.key !== undefined &&
      shirtTail.key !== undefined &&
      form.key !== undefined &&
      pattern.key !== undefined &&
      brand.key !== undefined &&
      category.key !== undefined
    ) {
      let productDetailRequest = { ...productDetail };
      productDetailRequest.productId = product.id;
      productDetailRequest.brandId = brand.key;
      productDetailRequest.categoryId = category.key;
      productDetailRequest.buttonId = button.key;
      productDetailRequest.collarId = collar.key;
      productDetailRequest.materialId = material.key;
      productDetailRequest.sleeveId = sleeve.key;
      productDetailRequest.shirtTailId = shirtTail.key;
      productDetailRequest.formId = form.key;
      productDetailRequest.patternId = pattern.key;
      axios
        .get(
          api +
          "product/filterProductDetailByIdCom?productId=" +
          productDetailRequest.productId +
          "&buttonId=" +
          productDetailRequest.buttonId +
          "&materialId=" +
          productDetailRequest.materialId +
          "&shirtTailId=" +
          productDetailRequest.shirtTailId +
          "&sleeveId=" +
          productDetailRequest.sleeveId +
          "&collarId=" +
          productDetailRequest.collarId +
          "&brandId=" +
          productDetailRequest.brandId +
          "&categoryId=" +
          productDetailRequest.categoryId +
          "&patternId=" +
          productDetailRequest.patternId +
          "&formId=" +
          productDetailRequest.formId,
          {
            headers: {
              Authorization: `Bearer ${getToken(true)}`,
            },
          }
        )
        .then((res) => {
          let productDetailsExist = [...res.data];
          let setArrayByColors = [];
          setQuantityExist(productDetailsExist.length);
          setKeyProductDetailActive("1");
          for (let i = 0; i < productDetailsExist.length; i++) {
            let object = {
              color: productDetailsExist[i].color,
              productDetails: [productDetailsExist[i]],
            };
            let j = i + 1;

            while (j < productDetailsExist.length) {
              if (object.color.id === productDetailsExist[j].color.id) {
                object.productDetails.push(productDetailsExist.splice(j, 1)[0]);
              } else {
                j++;
              }
            }
            setArrayByColors.push(object);
          }
          if (productDetailsExist.length !== 0) {
            notification.open({
              type: "warning",
              label: "Thông báo",
              description: (
                <span>
                  Sản phẩm có sẵn một số màu sắc và kích cỡ!
                  <br />
                  Vui lòng kiểm tra dưới mục sản phẩm có sẵn
                </span>
              ),
            });
          }
          setproductDetailsExist(setArrayByColors);
        });
    }
  }
  function handleSetProductDetailCom(field, value) {
    if (field === "button") {
      setButton(value);
    } else if (field === "collar") {
      setCollar(value);
    } else if (field === "material") {
      setMaterial(value);
    } else if (field === "sleeve") {
      setSleeve(value);
    } else if (field === "shirtTail") {
      setshirtTail(value);
    } else if (field === "form") {
      setForm(value);
    } else if (field === "pattern") {
      setPattern(value);
    } else if (field === "brand") {
      setBrand(value);
    } else if (field === "category") {
      setCategory(value);
    }
    if (
      button.key !== undefined &&
      collar.key !== undefined &&
      material.key !== undefined &&
      sleeve.key !== undefined &&
      shirtTail.key !== undefined &&
      form.key !== undefined &&
      pattern.key !== undefined &&
      brand.key !== undefined &&
      category.key !== undefined
    ) {
      setRender(Math.random());
    }
  }

  function renderProductDetails() {
    let list = [];
    if (colorsCreate.length > 0 && sizesCreate.length > 0) {
      var index = 0;
      for (let size of sizesCreate) {
        for (let color of colorsCreate) {
          let productDetailDisplay = {
            id: index++,
            brand: {
              id: brand.key,
              name: brand.label,
            },
            category: {
              id: category.key,
              name: category.label,
            },
            button: {
              id: button.key,
              name: button.label,
            },
            material: {
              id: material.key,
              name: material.label,
            },
            collar: {
              id: collar.key,
              name: collar.label,
            },
            shirtTail: {
              id: shirtTail.key,
              name: shirtTail.label,
            },
            sleeve: {
              id: sleeve.key,
              name: sleeve.label,
            },
            pattern: {
              id: pattern.key,
              name: pattern.label,
            },
            form: {
              id: form.key,
              name: form.label,
            },
            size: {
              id: size.key,
              name: size.label,
            },
            color: {
              id: color.key,
              code: color.value,
              name: color.label,
            },
            quantity: productDetail.quantity,
            weight: productDetail.weight,
            price: productDetail.price,
            status: "ACTIVE",
          };
          list.push(productDetailDisplay);
        }
      }
    }
    return list;
  }

  function createPattern() {
    if (patternCreate.trim() !== "") {
      confirm({
        centered: true,
        title: `Thêm mới sản phẩm ${product.productName}`,
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        content: "Xác nhận thêm mới",
        onOk() {
          setisLoading(true);
          axios
            .post(api + "pattern?categoryName=" + patternCreate.trim(), null, {
              headers: {
                Authorization: `Bearer ${getToken(true)}`,
              },
            })
            .then((res) => {
              setPatternCreate(" ");
              if (res.data === "") {
                messageApi.error("Họa tiết đã tồn tại!", 1);
              } else {
                messageApi.success("Thêm hoạ tiết thành công!", 1);
              }
              setRender(Math.random());
              setisLoading(false);
            })
            .catch((err) => {
              const status = err.response.status;
              if (status === 403) {
                notification.error({
                  message: "Thông báo",
                  description: "Bạn không có quyền truy cập!",
                });
              }
            });
        },
        onCancel() { },
      });
    } else {
      messageApi.error("Vui lòng nhập hoạt tiết!", 1);
    }
  }

  function createShirtTail(event) {
    if (formCreate.trim() !== "") {
      confirm({
        centered: true,
        title: `Thêm mới sản phẩm ${product.productName}`,
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        content: "Xác nhận thêm mới",
        onOk() {
          setisLoading(true);
          axios
            .post(
              api + "shirt-tail?shirtTailTypeName=" + shirtTailCreate.trim(),
              null,
              {
                headers: {
                  Authorization: `Bearer ${getToken(true)}`,
                },
              }
            )
            .then((res) => {
              setRender(Math.random);
              if (res.data === "") {
                messageApi.error("Đuôi áo đã tồn tại!", 1);
              } else {
                messageApi.success("Thêm đuôi áo thành công!", 1);
              }
              setshirtTailCreate(" ");
              setisLoading(false);
            })
            .catch((err) => {
              const status = err.response.status;
              if (status === 403) {
                notification.error({
                  message: "Thông báo",
                  description: "Bạn không có quyền truy cập!",
                });
              }
            });
        },
        onCancel() { },
      });
    } else {
      messageApi.error("Vui lòng nhập dáng áo!", 1);
    }
  }

  function createBrand() {
    if (brandCreate.trim() !== "") {
      confirm({
        centered: true,
        title: `Thêm mới sản phẩm ${product.productName}`,
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        content: "Xác nhận thêm mới",
        onOk() {
          setisLoading(true);
          axios
            .post(api + "brand?brandName=" + brandCreate, null, {
              headers: {
                Authorization: `Bearer ${getToken(true)}`,
              },
            })
            .then((res) => {
              if (res.data === "") {
                messageApi.error("Thương hiệu đã tồn tại!", 1);
              } else {
                messageApi.success("Thêm thương hiệu thành công!", 1);
                setRender(res.data);
              }
              setisLoading(false);
              setBrandCreate(" ");
            })
            .catch((err) => {
              const status = err.response.status;
              if (status === 403) {
                notification.error({
                  message: "Thông báo",
                  description: "Bạn không có quyền truy cập!",
                });
              }
            });
        },
        onCancel() { },
      });
    } else {
      messageApi.error("Vui lòng nhập thương hiệu!", 1);
    }
  }

  function createCategory() {
    if (categoryCreate.trim() !== "") {
      confirm({
        centered: true,
        title: `Thêm mới sản phẩm ${product.productName}`,
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        content: "Xác nhận thêm mới",
        onOk() {
          setisLoading(true);
          axios
            .post(api + "category?categoryName=" + categoryCreate, null, {
              headers: {
                Authorization: `Bearer ${getToken(true)}`,
              },
            })
            .then((res) => {
              if (res.data === "") {
                messageApi.error("Loại sản phẩm đã tồn tại!", 1);
              } else {
                messageApi.success("Thêm loại sản phẩm thành công!", 1);
                setRender(res.data);
              }
              setCategoryCreate(" ");
              setisLoading(false);
            })
            .catch((err) => {
              const status = err.response.status;
              if (status === 403) {
                notification.error({
                  message: "Thông báo",
                  description: "Bạn không có quyền truy cập!",
                });
              }
            });
        },
        onCancel() { },
      });
    } else {
      messageApi.error("Vui lòng nhập loại sản phẩm!", 1);
    }
  }

  function createForm() {
    if (formCreate.trim() !== "") {
      confirm({
        centered: true,
        title: `Thêm mới sản phẩm ${product.productName}`,
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        content: "Xác nhận thêm mới",
        onOk() {
          setisLoading(true);
          axios
            .post(api + "form?categoryName=" + formCreate.trim(), null, {
              headers: {
                Authorization: `Bearer ${getToken(true)}`,
              },
            })
            .then((res) => {
              setRender(Math.random);
              if (res.data === "") {
                messageApi.error("Dáng áo đã tồn tại!", 1);
              } else {
                messageApi.success("Thêm dáng áo thành công!", 1);
              }
              setFormCreate(" ");
              setisLoading(false);
            })
            .catch((err) => {
              const status = err.response.status;
              if (status === 403) {
                notification.error({
                  message: "Thông báo",
                  description: "Bạn không có quyền truy cập!",
                });
              }
            });
        },
        onCancel() { },
      });
    } else {
      messageApi.error("Vui lòng nhập dáng áo!", 1);
    }
  }

  function createButton() {
    if (buttonCreate.trim() !== "") {
      confirm({
        centered: true,
        title: `Thêm mới sản phẩm ${product.productName}`,
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        content: "Xác nhận thêm mới",
        onOk() {
          setisLoading(true);
          axios
            .post(api + "form?categoryName=" + formCreate.trim(), null, {
              headers: {
                Authorization: `Bearer ${getToken(true)}`,
              },
            })
            .then((res) => {
              setRender(Math.random);
              if (res.data === "") {
                messageApi.error("Dáng áo đã tồn tại!", 1);
              } else {
                messageApi.success("Thêm dáng áo thành công!", 1);
              }
              setFormCreate(" ");
              setisLoading(false);
            })
            .catch((err) => {
              const status = err.response.status;
              if (status === 403) {
                notification.error({
                  message: "Thông báo",
                  description: "Bạn không có quyền truy cập!",
                });
              }
            });
        },
        onCancel() { },
      });
    } else {
      messageApi.error("Vui lòng nhập nút áo!", 1);
    }
  }

  function createMaterial() {
    if (materialCreate.trim() !== "") {
      confirm({
        centered: true,
        title: `Thêm mới sản phẩm ${product.productName}`,
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        content: "Xác nhận thêm mới",
        onOk() {
          setisLoading(true);
          axios
            .post(
              api + "material/create",
              {
                materialName: materialCreate.trim(),
              },
              {
                headers: {
                  Authorization: `Bearer ${getToken(true)}`,
                },
              }
            )
            .then((res) => {
              setRender(Math.random);
              if (res.data === "") {
                messageApi.error("Chất liệu đã tồn tại!", 1);
              } else {
                messageApi.success("Thêm chất liệu thành công!", 1);
              }
              setMaterialCreate(" ");
              setisLoading(false);
            })
            .catch((err) => {
              const status = err.response.status;
              if (status === 403) {
                notification.error({
                  message: "Thông báo",
                  description: "Bạn không có quyền truy cập!",
                });
              }
            });
        },
        onCancel() { },
      });
    } else {
      messageApi.error("Vui lòng nhập chất liệu!", 1);
    }
  }

  function createCollar() {
    if (collarCreate.trim() !== "") {
      confirm({
        centered: true,
        title: `Thêm mới sản phẩm ${product.productName}`,
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        content: "Xác nhận thêm mới",
        onOk() {
          setisLoading(true);
          axios
            .post(
              api + "collar/create",
              {
                collarTypeName: collarCreate.trim(),
              },
              {
                headers: {
                  Authorization: `Bearer ${getToken(true)}`,
                },
              }
            )
            .then((res) => {
              setRender(Math.random);
              if (res.data === "") {
                messageApi.error("Cổ áo đã tồn tại!", 1);
              } else {
                messageApi.success("Thêm cổ áo thành công!", 1);
              }
              setCollarCreate(" ");
              setisLoading(false);
            })
            .catch((err) => {
              const status = err.response.status;
              if (status === 403) {
                notification.error({
                  message: "Thông báo",
                  description: "Bạn không có quyền truy cập!",
                });
              }
            });
        },
        onCancel() { },
      });
    } else {
      messageApi.error("Vui lòng nhập cổ áo!", 1);
    }
  }

  function createSleeve() {
    if (sleeveCreate.trim() !== "") {
      confirm({
        centered: true,
        title: `Thêm mới sản phẩm ${product.productName}`,
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        content: "Xác nhận thêm mới",
        onOk() {
          setisLoading(true);
          axios
            .post(
              api + "sleeve/create",
              { sleeveName: sleeveCreate.trim() },
              {
                headers: {
                  Authorization: `Bearer ${getToken(true)}`,
                },
              }
            )
            .then((res) => {
              setRender(Math.random);
              if (res.data === "") {
                messageApi.error("Tay áo đã tồn tại!", 1);
              } else {
                messageApi.success("Thêm tay áo thành công!", 1);
              }
              setSleeveCreate(" ");
              setisLoading(false);
            })
            .catch((err) => {
              const status = err.response.status;
              if (status === 403) {
                notification.error({
                  message: "Thông báo",
                  description: "Bạn không có quyền truy cập!",
                });
              }
            });
        },
        onCancel() { },
      });
    } else {
      messageApi.error("Vui lòng nhập tay áo!", 1);
    }
  }

  function createSize() {
    if (sizeCreate.trim() !== "") {
      confirm({
        centered: true,
        title: `Thêm mới sản phẩm ${product.productName}`,
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        content: "Xác nhận thêm mới",
        onOk() {
          setisLoading(true);
          axios
            .post(
              api + "size/create",
              { sizeName: sizeCreate.trim() },
              {
                headers: {
                  Authorization: `Bearer ${getToken(true)}`,
                },
              }
            )
            .then((res) => {
              setRender(Math.random);
              if (res.data === "") {
                messageApi.error("Kích cỡ đã tồn tại!", 1);
              } else {
                messageApi.success("Thêm kích cỡ thành công!", 1);
              }
              setSizeCreate(" ");
              setisLoading(false);
            })
            .catch((err) => {
              const status = err.response.status;
              if (status === 403) {
                notification.error({
                  message: "Thông báo",
                  description: "Bạn không có quyền truy cập!",
                });
              }
            });
        },
        onCancel() { },
      });
    } else {
      messageApi.error("Vui lòng nhập kích cỡ!", 1);
    }
  }

  function createColor() {
    if (
      colorCreate.colorName.trim() !== "" ||
      colorCreate.colorCode.trim() !== ""
    ) {
      confirm({
        centered: true,
        title: `Thêm mới sản phẩm ${product.productName}`,
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        content: "Xác nhận thêm mới",
        onOk() {
          setLoadingColor(true);
          axios
            .post(api + "color/create", colorCreate, {
              headers: {
                Authorization: `Bearer ${getToken(true)}`,
              },
            })
            .then((res) => {
              setLoadingColor(true);
              setModalColorOpen(false);
              if (res.data === "") {
                messageApi.error("Màu sắc đã tồn tại!", 1);
              } else {
                messageApi.success("Thêm màu sắc thành công!", 1);
                setRender(Math.random());
              }
            })
            .catch((err) => {
              const status = err.response.status;
              if (status === 403) {
                notification.error({
                  message: "Thông báo",
                  description: "Bạn không có quyền truy cập!",
                });
              }
            });
        },
        onCancel() { },
      });
    } else {
      messageApi.error("Vui lòng nhập màu sắc!", 1);
    }
  }
  useEffect(() => {
    axios
      .get(api + "product/getproductfilterByCom", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        const status = err.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    axios
      .get(api + "brand", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((res) => {
        setBrands(res.data);
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
    axios
      .get(api + "category", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((res) => {
        setCategories(res.data);
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
    axios
      .get(api + "size", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setSizes(response.data);
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
    axios
      .get(api + "color", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setColors(response.data);
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
    axios
      .get(api + "button", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setButtons(response.data);
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
    axios
      .get(api + "material", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setMaterials(response.data);
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
    axios
      .get(api + "collar", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setCollars(response.data);
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
    axios
      .get(api + "shirt-tail", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setshirtTails(response.data);
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
    axios
      .get(api + "sleeve", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setSleeves(response.data);
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

    axios
      .get(api + "pattern", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((res) => {
        setPatterns(res.data);
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
    axios
      .get(api + "form", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((res) => {
        setForms(res.data);
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
    getProductDetailsExist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);
  return (
    <>
      <Spin
        tip="Loading..."
        spinning={isLoading}
        size="large"
        style={{ width: "100%" }}
      >
        <div className={styles.product}>
          {contextHolder}
          <Modal
            title="Thêm nhanh màu sắc"
            centered
            open={modalColorOpen}
            footer={false}
            onCancel={() => setModalColorOpen(false)}
          >
            <Spin
              tip="Loading..."
              spinning={loadingColor}
              size="large"
              style={{ width: "100%" }}
            >
              <ColorPicker
                showText
                onChange={(event) => {
                  handleSetColorCreate("colorCode", event.toHexString());
                }}
              ></ColorPicker>
              <h6>Tên màu sắc</h6>
              <Input
                value={colorCreate.colorName}
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
                  onClick={() => createColor()}
                >
                  Thêm mới
                </Button>
              </div>
            </Spin>
          </Modal>
          <Modal
            title="Thêm nhanh sản phẩm"
            centered
            open={modalProductCreate}
            footer={false}
            onCancel={() => setmodalProductCreate(false)}
          >
            <div>
              <Spin
                tip="Loading..."
                spinning={loadingProduct}
                size="large"
                style={{ width: "100%" }}
              >
                <Row>
                  <Col span={24}>
                    <div className="m-5">
                      <span style={{ fontWeight: 500 }}>Tên sản phẩm</span>
                      <Input
                        placeholder="Product name"
                        value={product.productName}
                        onChange={(event) =>
                          handleSetProduct("productName", event.target.value)
                        }
                        status={product.productName === "" ? "error" : ""}
                      ></Input>
                    </div>
                    <div className="m-5">
                      <span style={{ fontWeight: 500 }}>Mô tả</span>
                      <TextArea
                        value={product.description}
                        placeholder="Description"
                        allowClear
                        onChange={(event) =>
                          handleSetProduct("description", event.target.value)
                        }
                        status={product.description === "" ? "error" : ""}
                      />
                    </div>
                    <br />
                    <div style={{ textAlign: "center" }}>
                      <Button
                        type="primary"
                        loading={false}
                        onClick={createProduct}
                      >
                        Xác nhận
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Spin>
            </div>
          </Modal>
          <h2>
            <PlusOutlined /> Thêm mới sản phẩm
          </h2>
          <Row>
            <Col offset={4} span={16} className={styles.product__Form}>
              <br />
              <Row>
                <Col span={24}>
                  <div className="m-5">
                    <h6>Tên sản phẩm</h6>
                    <Row>
                      <Col span={24}>
                        <div className="m-5">
                          <Select
                            showSearch
                            style={{
                              width: "100%",
                            }}
                            notFoundContent={
                              <div
                                style={{ textAlign: "center" }}
                                onClick={() => {
                                  setmodalProductCreate(true);
                                  handleSetProduct(
                                    "productName",
                                    product.productName
                                  );
                                }}
                              >
                                <PlusOutlined />
                              </div>
                            }
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            onSearch={(input, option) => {
                              handleSetProduct(
                                "productName",
                                input === "" ? product.productName : input
                              );
                              return (option?.label ?? "").includes(input);
                            }}
                            size="large"
                            filterSort={(optionA, optionB) =>
                              (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            onChange={(index) => {
                              setProduct(
                                productList?.find((item) => item.id === index)
                              );
                              handleSetProductDetail("productId", index);
                            }}
                            value={productDetail.productId}
                          >
                            {productList &&
                              productList.map((item, index) => {
                                return (
                                  <Select.Option
                                    key={item.id}
                                    label={item.productName}
                                    value={item.id}
                                  >
                                    {item.productName}
                                  </Select.Option>
                                );
                              })}
                          </Select>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <Col span={24}>
                    <div className="m-5">
                      <Collapse
                        bordered={false}
                        expandIcon={({ isActive }) => (
                          <CaretRightOutlined rotate={isActive ? 90 : 0} />
                        )}
                        items={[
                          {
                            key: "product",
                            style: {
                              backgroundColor: "white",
                              boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                            },
                            label: <h6>{product.productName || "Sản phẩm"}</h6>,
                            children: (
                              <Row>
                                <Col span={24}>
                                  <div className="m-5">
                                    <h6>Mô tả</h6>
                                    <p>
                                      {product.description || "Description"}
                                    </p>
                                    <hr />
                                  </div>
                                </Col>
                              </Row>
                            ),
                          },
                        ]}
                      />
                    </div>
                  </Col>
                </Col>
              </Row>
            </Col>
            <Col span={16} offset={4} className={styles.product__createDetails}>
              <div className="m-5">
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  items={[
                    {
                      key: "1",
                      label: <h6>Thành phần sản phẩm</h6>,
                      style: {
                        backgroundColor: "white",
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                      },
                      children: (
                        <Row>
                          <Col span={8}>
                            <div className="m-5">
                              <h6>Thương hiệu</h6>
                              <Select
                                showSearch
                                style={{ width: "100%" }}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom("brand", record);
                                }}
                                placeholder="Brand"
                                onSearch={(input, option) => {
                                  setBrandCreate(
                                    input === "" ? brandCreate : input
                                  );
                                  return (option?.label ?? "").includes(input);
                                }}
                                filterSort={(optionA, optionB) =>
                                  (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                      (optionB?.label ?? "").toLowerCase()
                                    )
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
                                      <Select.Option
                                        value={item.id}
                                        label={item.brandName}
                                        key={item.id}
                                      >
                                        {item.brandName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="m-5">
                              <h6>Loại sản phẩm</h6>
                              <Select
                                showSearch
                                style={{ width: "100%" }}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom("category", record);
                                }}
                                placeholder="Category"
                                onSearch={(input, option) => {
                                  setCategoryCreate(
                                    input === "" ? categoryCreate : input
                                  );
                                  return (option?.label ?? "").includes(input);
                                }}
                                filterSort={(optionA, optionB) =>
                                  (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                      (optionB?.label ?? "").toLowerCase()
                                    )
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
                                      <Select.Option
                                        value={item.id}
                                        label={item.categoryName}
                                        key={item.id}
                                      >
                                        {item.categoryName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="m-5">
                              <h6>Loại cúc áo</h6>
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                placeholder="Button"
                                className={styles.product__createDetailsSelect}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom("button", record);
                                }}
                                onSearch={(input, option) => {
                                  setButtonCreate(
                                    input === "" ? buttonCreate : input
                                  );
                                  return (option?.label ?? "").includes(input);
                                }}
                                filterSort={(optionA, optionB) =>
                                  (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                      (optionB?.label ?? "").toLowerCase()
                                    )
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
                                      <Select.Option
                                        value={item.id}
                                        label={item.buttonName}
                                        key={item.id}
                                      >
                                        {item.buttonName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="m-5">
                              <h6>Chất liệu</h6>
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                placeholder="Material"
                                className={styles.product__createDetailsSelect}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom("material", record);
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
                                    .localeCompare(
                                      (optionB?.label ?? "").toLowerCase()
                                    )
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
                                      <Select.Option
                                        value={item.id}
                                        label={item.materialName}
                                        key={item.id}
                                      >
                                        {item.materialName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="m-5">
                              <h6>Cổ áo</h6>
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                placeholder="Collar"
                                className={styles.product__createDetailsSelect}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom("collar", record);
                                }}
                                onSearch={(input, option) => {
                                  setCollarCreate(
                                    input === "" ? collarCreate : input
                                  );
                                  return (option?.label ?? "").includes(input);
                                }}
                                filterSort={(optionA, optionB) =>
                                  (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                      (optionB?.label ?? "").toLowerCase()
                                    )
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
                                      <Select.Option
                                        value={item.id}
                                        key={item.id}
                                        label={item.collarTypeName}
                                      >
                                        {item.collarTypeName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="m-5">
                              <h6>Tay áo</h6>
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                placeholder="Sleeve"
                                className={styles.product__createDetailsSelect}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom("sleeve", record);
                                }}
                                onSearch={(input, option) => {
                                  setSleeveCreate(
                                    input === "" ? sleeveCreate : input
                                  );
                                  return (option?.label ?? "").includes(input);
                                }}
                                filterSort={(optionA, optionB) =>
                                  (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                      (optionB?.label ?? "").toLowerCase()
                                    )
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
                                      <Select.Option
                                        value={item.id}
                                        label={item.sleeveName}
                                        key={item.id}
                                      >
                                        {item.sleeveName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="m-5">
                              <h6>Đuôi áo</h6>
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                placeholder="Shirt tail"
                                className={styles.product__createDetailsSelect}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom(
                                    "shirtTail",
                                    record
                                  );
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
                                    .localeCompare(
                                      (optionB?.label ?? "").toLowerCase()
                                    )
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
                                      <Select.Option
                                        value={item.id}
                                        label={item.shirtTailTypeName}
                                        key={item.id}
                                      >
                                        {item.shirtTailTypeName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <h6>Hoạ tiết</h6>
                            <div className="m-5">
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                style={{ width: "100%" }}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom("pattern", record);
                                }}
                                placeholder="Pattern"
                                className={styles.product__createDetailsSelect}
                                onSearch={(input, option) => {
                                  setPatternCreate(
                                    input === "" ? patternCreate : input
                                  );
                                  return (option?.label ?? "").includes(input);
                                }}
                                filterSort={(optionA, optionB) =>
                                  (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                      (optionB?.label ?? "").toLowerCase()
                                    )
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
                                      <Select.Option
                                        label={item.patternName}
                                        value={item.id}
                                        key={item.id}
                                      >
                                        {item.patternName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>
                          <Col span={8}>
                            <h6>Dáng áo</h6>
                            <div className="m-5">
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                style={{ width: "100%" }}
                                onChange={(event, record) => {
                                  handleSetProductDetailCom("form", record);
                                }}
                                placeholder="form"
                                onSearch={(input, option) => {
                                  setFormCreate(
                                    input === "" ? formCreate : input
                                  );
                                  return (option?.label ?? "").includes(input);
                                }}
                                filterSort={(optionA, optionB) =>
                                  (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                      (optionB?.label ?? "").toLowerCase()
                                    )
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
                                      <Select.Option
                                        label={item.formName}
                                        value={item.id}
                                        key={item.id}
                                      >
                                        {item.formName}
                                      </Select.Option>
                                    );
                                  })}
                              </Select>
                            </div>
                          </Col>

                          <Col span={24}>
                            <div className="m-5">
                              <Collapse
                                bordered={false}
                                style={{
                                  backgroundColor: "rgba(253, 54, 54, 0.23)",
                                }}
                                items={[
                                  {
                                    key: "1",
                                    children: (
                                      <div
                                        style={{
                                          backgroundColor: "#fff",
                                          padding: "8px",
                                          borderRadius: "4px",
                                          color: "red",
                                        }}
                                      >
                                        <h6>{product.productName}</h6>
                                        {productDetailsExist.length === 0 ? (
                                          <span>Không có sẵn sản phẩm nào</span>
                                        ) : (
                                          <span>
                                            Dữ liệu có sẵn sẽ không được thêm
                                          </span>
                                        )}
                                        {productDetailsExist &&
                                          productDetailsExist.map(
                                            (item, index) => {
                                              return (
                                                <div
                                                  className={styles.optionColor}
                                                  key={index}
                                                >
                                                  <span
                                                    style={{
                                                      backgroundColor:
                                                        item.color.colorCode,
                                                      boxShadow:
                                                        "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
                                                    }}
                                                  ></span>
                                                  {item.color.colorName} :{" "}
                                                  {item.productDetails
                                                    .map(
                                                      (item) =>
                                                        item.size.sizeName
                                                    )
                                                    .join(" ")}
                                                </div>
                                              );
                                            }
                                          )}
                                      </div>
                                    ),
                                    label: (
                                      <span style={{ color: "red" }}>
                                        <b>Sản phẩm có sẵn ({quantityExist})</b>
                                      </span>
                                    ),
                                  },
                                ]}
                                defaultActiveKey={[keyProductDetailExistActive]}
                              />
                            </div>
                          </Col>
                          <Col span={12}>
                            <div className="m-5">
                              <h6>Kích cỡ</h6>
                              <Select
                                showSearch
                                maxTagCount={"responsive"}
                                placeholder="size"
                                optionFilterProp="children"
                                mode="multiple"
                                className={styles.product__createDetailsSelect}
                                onChange={(event, record) => {
                                  setSizesCreate(record);
                                }}
                                onSearch={(input, option) => {
                                  setSizeCreate(
                                    input === "" ? sizeCreate : input
                                  );
                                  return (option?.label ?? "").includes(input);
                                }}
                                filterSort={(optionA, optionB) =>
                                  (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                      (optionB?.label ?? "").toLowerCase()
                                    )
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
                                maxTagCount={"responsive"}
                                placeholder="Color"
                                optionFilterProp="children"
                                mode="multiple"
                                className={styles.product__createDetailsSelect}
                                onChange={(event, record) => {
                                  setColorsCreate(record);
                                }}
                                onSearch={(input, option) => {
                                  handleSetColorCreate(
                                    "colorName",
                                    input === "" ? materialCreate : input
                                  );
                                  return (option?.label ?? "").includes(input);
                                }}
                                filterSort={(optionA, optionB) =>
                                  (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                      (optionB?.label ?? "").toLowerCase()
                                    )
                                }
                                notFoundContent={
                                  <div
                                    style={{ textAlign: "center" }}
                                    onClick={() => {
                                      setModalColorOpen(true);
                                    }}
                                  >
                                    <PlusOutlined />
                                  </div>
                                }
                              >
                                {colors &&
                                  colors.map((item) => {
                                    return (
                                      <Select.Option
                                        key={item.id}
                                        label={item.colorName}
                                        value={item.colorCode}
                                      >
                                        <div className={styles.optionColor}>
                                          <span
                                            style={{
                                              backgroundColor: item.colorCode,
                                            }}
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
                      ),
                    },
                  ]}
                />
              </div>
            </Col>
          </Row>
        </div>
        {product.productId !== null &&
          colorsCreate.length > 0 &&
          productDetailsCreate.length > 0 ? (
          <ProductDetailsTable
            setLoading={setisLoading}
            product={product}
            colorsCreate={colorsCreate}
            render={render}
            productDetails={productDetailsCreate}
          />
        ) : null}
      </Spin>
    </>
  );
};

export default ProductCreateDetails;
