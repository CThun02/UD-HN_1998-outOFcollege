import styles from "./ProductDetailsTable.module.css";

import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import axios from "axios";
import Input from "antd/es/input/Input";

const ProductDetailsTable = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const product = props.product;
  const [productDetail, setProductDetail] = useState(props.productDetail);
  const buttonId = productDetail.button.id;
  const materialId = productDetail.material.id;
  const collarId = productDetail.collar.id;
  const sleeveId = productDetail.sleeve.id;
  const shirtTailId = productDetail.shirtTail.id;
  const [colors, setColors] = useState(null);
  const [listSizes, setlistSizes] = useState([]);

  const columns = [
    {
      key: "productname",
      dataIndex: "productname",
      title: "Tên sản phẩm",
      render: () => {
        return product.productName;
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
      key: "quantity",
      dataIndex: "quantity",
      title: "Số lượng",
      render: (text, record, index) => {
        return (
          <Input
            style={{ width: "100px", textAlign: "center" }}
            defaultValue={record.quantity}
            onChange={(event) => updateProductDetail("quantity", event, record)}
          ></Input>
        );
      },
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Giá",
      render: (text, record, index) => {
        return (
          <Input
            style={{ width: "100px", textAlign: "center" }}
            defaultValue={record.price}
            onChange={(event) => updateProductDetail("price", event, record)}
          ></Input>
        );
      },
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Thao tác",
    },
  ];
  async function getSizes(Colors) {
    try {
      let list = [];
      for (let color of Colors) {
        const response = await axios.get(
          api +
            "product/getSizesByIdComPdAndIdPro?productId=" +
            product.id +
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
            color.id
        );
        list.push(response.data);
      }
      setlistSizes(list);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  function updateProductDetail(fildeName, event, productDetail) {
    fildeName === "quantity"
      ? (productDetail.quantity = event.target.value)
      : (productDetail.price = event.target.value);
    if (event.target.value.trim() !== "") {
      event.target.style.removeProperty("border");
      axios
        .put(api + "product/updateProductDetail", productDetail)
        .then((response) => {
          messageApi.loading("Đang tải!", 2);
          setTimeout(() => {
            messageApi.success("Chỉnh sửa chi tiết sản phẩm thành công!", 2);
          }, 2000);
        })
        .catch((error) => {
          messageApi.loading("Chỉnh sửa chi tiết sản phẩm thất bại!", 2);
          console.log(error);
        });
    } else {
      messageApi.error("Vui lòng nhập đủ tất cả các trường!", 2);
      event.target.style.border = "1px solid red";
    }
  }

  useEffect(() => {
    axios
      .get(
        api +
          "product/getProductDetailUpdate?productId=" +
          productDetail.product.id +
          "&buttonId=" +
          buttonId +
          "&materialId=" +
          materialId +
          "&shirtTailId=" +
          shirtTailId +
          "&sleeveId=" +
          sleeveId +
          "&collarId=" +
          collarId
      )
      .then((res) => {
        setProductDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        api +
          "product/getColorsByIdComPdAndIdPro?productId=" +
          product.id +
          "&buttonId=" +
          buttonId +
          "&materialId=" +
          materialId +
          "&shirtTailId=" +
          shirtTailId +
          "&sleeveId=" +
          sleeveId +
          "&collarId=" +
          collarId
      )
      .then((res) => {
        setColors(res.data);
        getSizes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    buttonId,
    collarId,
    materialId,
    product.id,
    productDetail.product.id,
    shirtTailId,
    sleeveId,
  ]);
  return (
    <>
      {contextHolder}
      {colors &&
        colors.map((item, index) => {
          return (
            <div className={styles.product__DetailsTable} key={item.id}>
              <h2 style={{ marginBottom: "20px" }}>
                <div className={styles.product__DetailsColorTable}>
                  <span style={{ backgroundColor: item.colorCode }}></span>
                  <p>{item.colorName}</p>
                </div>
              </h2>
              <Table
                columns={columns}
                dataSource={
                  listSizes[index] &&
                  listSizes[index].map((record, index) => ({
                    ...record,
                    key: index,
                  }))
                }
                pagination={false}
              ></Table>
            </div>
          );
        })}
    </>
  );
};

export default ProductDetailsTable;
