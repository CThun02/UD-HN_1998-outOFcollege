import { Button, message, notification, Switch } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import Modal from "antd/es/modal/Modal";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../service/Token";

const ProductOpenActive = ({ product, onCancel, open, render }) => {
  const navigate = useNavigate();
  const [activeProduct, setActiveProduct] = useState(false);
  const [openAll, setOpenAll] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const api = "http://localhost:8080/api/admin/";

  function updateStatus() {
    axios
      .put(
        api +
        "product/updateProductStatus?productId=" +
        product.id +
        "&status=" +
        (activeProduct === true ? "ACTIVE" : "INACTIVE") +
        "&openAll=" +
        openAll,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        messageApi.success(
          `${product.productName} vừa bật trạng thái kinh doanh`,
          2
        );
        onCancel();
        render();
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
        messageApi.error(`Cập nhật trạng thái thất bại`, 2);
      });
  }
  return (
    <Modal
      footer={null}
      onCancel={() => {
        navigate("/api/admin/product");
      }}
      centered
      open={open}
    >
      {contextHolder}
      <h6>Sản phẩm đang tạm ngưng kinh doanh</h6>
      <p>Vui lòng mở kinh doanh ở bên dưới!</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <span style={{ fontWeight: 500 }}>
          Sản phẩm: {product?.productName}{" "}
        </span>
        <Switch
          checked={activeProduct}
          onChange={(e) => {
            setActiveProduct(e);
          }}
        />
      </div>
      <div>
        <Checkbox
          checked={openAll}
          onChange={(e) => {
            setOpenAll(e.target.checked);
          }}
        />{" "}
        Mở tất cả sản phẩm
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button
          type="primary"
          size="large"
          onClick={updateStatus}
          disabled={activeProduct !== true}
        >
          Xác nhận
        </Button>
      </div>
    </Modal>
  );
};

export default ProductOpenActive;
