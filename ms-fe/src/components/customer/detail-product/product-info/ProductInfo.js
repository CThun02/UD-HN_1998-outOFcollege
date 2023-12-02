import styles from "./ProductInfo.module.css";

import ChooseColor from "../../../element/choose-color/ChooseColor";
import ChooseSize from "../../../element/choose-size/ChooseSize";
import Quantity from "../../../element/quantity/Quantity";
import { faCartPlus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Rate, Row, Space, Tag, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import numeral from "numeral";
import { useState } from "react";
import { now } from "moment";
import { useEffect } from "react";
import { getAuthToken } from "../../../../service/Token";
import axios from "axios";

function ProductInfo({
  data,
  colorsAndSizes,
  setChooseColor,
  setChooseSize,
  chooseColor,
  chooseSize,
  productDetails,
  setRenderHeader
}) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const token = getAuthToken();
  const cartAPI = 'http://localhost:8080/api/client/cart';


  function handleChangePrice(value) {
    if (!isNaN(value)) {
      return numeral(value).format("0,0");
    }
    return 0;
  }

  function comparePrice(min, max) {
    return min === max;
  }

  const handleAddToCart = async (e) => {
    e.preventDefault();
    const dataToken = await token;
    const existingItem = localStorage.getItem('user');
    if (Object.keys(chooseColor).length === 0 || Object.keys(chooseSize).length === 0) {
      notification.error({
        message: "Thông báo",
        description: "Không tìm thấy hóa đơn",
      });
      return;
    }

    if (quantity > colorsAndSizes?.quantity) {
      notification.warning({
        message: "Thông báo",
        description: "Không đủ số lượng",
      });
      return;
    }

    if (!dataToken) {
      if (existingItem) {
        const existingData = JSON.parse(existingItem);
        existingData.timeStart = now();
        let productExists = false;
        for (let i = 0; i < existingData.productDetails?.length; i++) {
          if (existingData?.productDetails[i].data[0].id === productDetails[0]?.id) {
            existingData.productDetails[i].quantity += quantity
            productExists = true;
            break;
          }
        }

        if (!productExists) {
          existingData.productDetails.push({ data: productDetails, quantity: quantity })
        }

        localStorage.setItem('user', JSON.stringify(existingData));
      }
    } else {
      axios.post(`${cartAPI}`, {
        username: dataToken.username,
        lstCartDetail: [{
          productDetailId: productDetails[0].id,
          quantity: quantity
        }]
      }).then((response) => {
        console.log(response.data)
      }).catch((err) => {
        console.log(err)
      })
    }
    setRenderHeader(Math.random())
    navigate('/ms-shop/cart');
  }

  const handleByNow = async (e) => {
    e.preventDefault();
    const data = await token;
    let lstCartDetail = []
    if (data) {
      axios.post(`${cartAPI}`, {
        username: data.username,
        lstCartDetail: [{
          productDetailId: productDetails[0].id,
          quantity: quantity
        }]
      }).then((response) => {
        console.log(response.data)
      }).catch((err) => {
        console.log(err)
      })
    } else {
      lstCartDetail.push(({ data: productDetails, quantity: quantity }))
    }
    localStorage.setItem('checkout', JSON.stringify(lstCartDetail));
    navigate('/ms-shop/checkout');
  }

  useEffect(() => {
    const existingItem = localStorage.getItem('user');
    localStorage.getItem('checkout');

    if (!existingItem) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          timeStart: now(),
          productDetails: [],
        })
      );
    }
  }, [])

  return (
    <>
      <div className={styles.productName}>
        <Space size={10} direction="horizontal" style={{ width: "100%" }}>
          <h2
            className={`${styles.h2FontSize} ${styles.color}`}
            style={{ display: "inline-block" }}
          >
            {data.productName}
          </h2>
          {data.promotionMethod && data.promotionValue && (
            <Tag
              color="#D80032"
              style={{ fontSize: "16px", padding: "6px 12px" }}
            >
              Giảm {`${data.promotionValue}${data.promotionMethod}`}
            </Tag>
          )}
        </Space>
      </div>
      <div className={styles.items}>
        <div className={styles.spaceItems}>
          <Space style={{ width: "100%" }} direction="horizontal" size={28}>
            <div className={styles.money}>
              <span style={{ fontWeight: "600" }}>
                {`${comparePrice(
                  colorsAndSizes.priceProductMin,
                  colorsAndSizes.priceProductMax
                )
                  ? handleChangePrice(colorsAndSizes.priceProductMin) + "đ"
                  : handleChangePrice(colorsAndSizes.priceProductMin) +
                  " - " +
                  handleChangePrice(colorsAndSizes.priceProductMax) +
                  "đ"
                  }`}
              </span>
            </div>
            <div
              style={{
                width: "2px",
                height: "32px",
                backgroundColor: "rgb(203, 213, 225)",
              }}
            ></div>
            <div>
              <Space direction="horizontal" style={{ width: "100%" }}>
                <Rate count={1} value={1} disabled={true} />
                <span className={`${styles.color} ${styles.textSize}`}>
                  4.9
                </span>
              </Space>
            </div>
            <div className={styles.color}>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="sparkles"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={`unchecked-icon svg-inline--fa fa-sparkles fa-fw `}
              >
                <path
                  fill="currentColor"
                  d="M327.5 85.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 128l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 128l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 64 426.8 7.5C425.1 3 420.8 0 416 0s-9.1 3-10.8 7.5L384 64 327.5 85.2zM205.1 73.3c-2.6-5.7-8.3-9.3-14.5-9.3s-11.9 3.6-14.5 9.3L123.3 187.3 9.3 240C3.6 242.6 0 248.3 0 254.6s3.6 11.9 9.3 14.5l114.1 52.7L176 435.8c2.6 5.7 8.3 9.3 14.5 9.3s11.9-3.6 14.5-9.3l52.7-114.1 114.1-52.7c5.7-2.6 9.3-8.3 9.3-14.5s-3.6-11.9-9.3-14.5L257.8 187.4 205.1 73.3zM384 384l-56.5 21.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 448l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 448l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 384l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L384 384z"
                  className=""
                ></path>
              </svg>
              <span className={`${styles.newProduct} ${styles.textSize}`}>
                Mới
              </span>
            </div>
          </Space>
        </div>
      </div>

      <div className={styles.colorDiv}>
        <div className={styles.colorName}>
          <span className={`${styles.color} ${styles.textSize}`}>
            Màu sắc:{" "}
          </span>
          <span
            className={`${styles.color} ${styles.fontWeight} ${styles.textSize}`}
          >
            {chooseColor.colorName}
          </span>
        </div>
        <ChooseColor
          colors={colorsAndSizes?.colors}
          setChooseColor={setChooseColor}
          chooseColor={chooseColor}
        />
      </div>

      <div className={styles.sizeDiv}>
        <div className={styles.colorName}>
          <Row>
            <Col span={16}>
              <span className={`${styles.color} ${styles.textSize}`}>
                Kích cỡ:{" "}
              </span>
              <span
                className={`${styles.color} ${styles.fontWeight} ${styles.textSize}`}
              >
                {chooseSize.sizeName}
              </span>
            </Col>
            <Col span={8}>
              <Link>Bảng quy đổi kích cỡ</Link>
            </Col>
          </Row>
        </div>

        <ChooseSize
          sizes={colorsAndSizes?.sizes}
          chooseSize={chooseSize}
          setChooseSize={setChooseSize}
        />
      </div>

      <div className={styles.quantity}>
        <Quantity
          quantity={quantity}
          setQuantity={setQuantity}
          quantityProduct={colorsAndSizes?.quantity}
        />
      </div>

      <div className={styles.itemsCart}>
        <Row>
          <Col span={12}>
            <div className={styles.btnAddToCart}>
              <button className={`${styles.btn}`}
                onClick={(e) => handleAddToCart(e)}
              >
                <FontAwesomeIcon
                  icon={faCartPlus}
                  className={styles.iconAddToCart}
                />{" "}
                Thêm vào giỏ hàng
              </button>
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.btnShoppingNow}>
              <button className={`${styles.btn} ${styles.shoppingNow}`} onClick={(e) => handleByNow(e)}>
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className={styles.iconAddToCart}
                />
                Mua ngay
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProductInfo;
