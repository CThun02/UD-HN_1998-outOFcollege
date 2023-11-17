import { Col, Divider, Row } from "antd";
import { useParams } from "react-router";
import styles from "./DetailProduct.module.css";
import BreadCrumb from "../../element/bread-crumb/BreadCrumb";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import ImageDetail from "./image-detail/ImageDetail";
import ProductInfo from "./product-info/ProductInfo";
import Description from "./description/Description";
import RelatedProducts from "../../element/related/RelatedProducts";
import axios from "axios";

const items = [
  {
    title: <Link to="/ms-shop/home">Trang chủ</Link>,
  },
  {
    title: <Link to="/ms-shop/shopping">Cửa hàng</Link>,
  },
  {
    title: "Chi tiết sản phẩm",
  },
];

const baseUrl = "http://localhost:8080/api/admin/product";

function DetailProduct() {
  const { id } = useParams();
  const convertData = id.replace(/---/g, "/");
  const decode64 = atob(convertData);
  const decodeData = JSON.parse(decode64);
  const [chooseColor, setChooseColor] = useState({});
  const [chooseSize, setChooseSize] = useState({});
  const [productDetail, setProductDetail] = useState({});
  const [colorsAndSizes, setColorsAndSizes] = useState({});

  const [productId, setProductId] = useState(0);
  const [brandId, setBrandId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [patternId, setPatternId] = useState(0);
  const [formId, setFormId] = useState(0);
  const [buttonId, setButtonId] = useState(0);
  const [materialId, setMaterialId] = useState(0);
  const [collarId, setCollarId] = useState(0);
  const [sleeveId, setSleeveId] = useState(0);
  const [shirtTailId, setShirtTailId] = useState(0);
  const [getProductDetail, setGetProductDetail] = useState({})

  useEffect(() => {
    async function getProductDetails() {
      try {
        const res = await axios.post(baseUrl + "/details-product", {
          productDetailId: decodeData.productDetailId,
          productId: decodeData.productId,
          brandId: decodeData.brandId,
          categoryId: decodeData.categoryId,
          patternId: decodeData.patternId,
          formId: decodeData.formId,
          buttonId: decodeData.buttonId,
          materialId: decodeData.materialId,
          collarId: decodeData.collarId,
          sleeveId: decodeData.sleeveId,
          shirtTailId: decodeData.shirtTailId,
        });
        const data = await res.data;
        setProductDetail(data);
        setProductId(data.productId);
        setBrandId(data.brandId);
        setCategoryId(data.categoryId);
        setPatternId(data.patternId);
        setFormId(data.formId);
        setButtonId(data.buttonId);
        setMaterialId(data.materialId);
        setCollarId(data.collarId);
        setSleeveId(data.sleeveId);
        setShirtTailId(data.shirtId);
      } catch (err) {
        console.log(err);
      }
    }
    getProductDetails();
  }, [id]);

  useEffect(() => {
    const getProductDetails = () => {
      axios.get(`http://localhost:8080/api/admin/bill/filterProductDetailSellByIdCom`,
        {
          params: {
            materialId: materialId,
            shirtTailId: shirtTailId,
            sleeveId: sleeveId,
            collarId: collarId,
            patternId: patternId,
            formId: formId,
            brandId: brandId,
            categoryId: categoryId,
            colorId: chooseColor?.id,
            sizeId: chooseSize?.id,
          }
        })
        .then((response) => {
          setGetProductDetail(response.data)
        }).catch((error) => {
          console.log(error)
        })
    }
    getProductDetails()
  }, [productId,
    chooseColor,
    chooseSize,
    brandId,
    categoryId,
    patternId,
    formId,
    buttonId,
    materialId,
    collarId,
    sleeveId,
    shirtTailId
  ])


  useEffect(() => {
    if (
      productId &&
      brandId &&
      categoryId &&
      patternId &&
      formId &&
      buttonId &&
      materialId &&
      collarId &&
      sleeveId &&
      shirtTailId
    ) {
      async function getColorsAndSizes() {
        try {
          const res = await axios.post(baseUrl + "/colors-and-sizes", {
            productId,
            brandId,
            categoryId,
            patternId,
            formId,
            buttonId,
            materialId,
            collarId,
            sleeveId,
            shirtTailId,
            colorId: chooseColor?.id,
            sizeId: chooseSize?.id,
          });
          const data = await res.data;
          setColorsAndSizes(data);
        } catch (err) {
          console.log(err);
        }
      }
      getColorsAndSizes();
    }
  }, [
    productId,
    chooseColor,
    chooseSize,
    brandId,
    categoryId,
    patternId,
    formId,
    buttonId,
    materialId,
    collarId,
    sleeveId,
    shirtTailId,
  ]);

  return (
    <div className={styles.background}>
      <div className={styles.title}>
        <BreadCrumb title={"Chi tiết sản phẩm"} items={items} />
      </div>
      <div className={styles.flexCenter}>
        <div className={styles.content}>
          <div className={styles.body}>
            <Row className={styles.row}>
              <Col span={13}>
                <ImageDetail paths={productDetail?.images} />
              </Col>
              <Col span={11}>
                <div className={styles.product}>
                  <ProductInfo
                    data={productDetail}
                    colorsAndSizes={colorsAndSizes}
                    setChooseColor={setChooseColor}
                    setChooseSize={setChooseSize}
                    chooseColor={chooseColor}
                    chooseSize={chooseSize}
                    productDetails={getProductDetail}
                  />
                  <Divider className={styles.spacing} />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <div className={styles.flexCenter}>
        <div className={styles.description}>
          <Description productDetail={productDetail} />
        </div>
      </div>

      <div>
        <RelatedProducts />
      </div>
    </div>
  );
}

export default DetailProduct;
