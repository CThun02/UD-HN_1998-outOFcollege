import { Button, Divider, Modal, Space, Spin, Table, notification } from "antd";
import { useState } from "react";
import ProductDetails from "../product/ProductDetails";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import confirm from "antd/es/modal/confirm";

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Cúc áo",
    dataIndex: "button",
    key: "button",
  },
  {
    title: "Chất liệu",
    dataIndex: "material",
    key: "material",
  },
  {
    title: "Cổ áo",
    dataIndex: "collar",
    key: "collar",
  },
  {
    title: "Đuôi áo",
    dataIndex: "shirtTail",
    key: "shirtTail",
  },
  {
    title: "Tay áo",
    dataIndex: "slevee",
    key: "slevee",
  },
  {
    title: "Kích cỡ",
    dataIndex: "size",
    key: "sizes",
  },
  {
    title: "Màu sắc",
    dataIndex: "color",
    key: "color",
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Kho hàng",
    dataIndex: "warehouse",
    key: "warehouse",
  },
];

const baseUrl = "http://localhost:8080/api/admin/promotion-product/";

function ModalAddProductList({
  isLoadingModal,
  setIsLoadingModal,
  products,
  setProducts,
  setFieldValue,
  values,
}) {
  const [promotionProducts, setPromotionProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalElements, setTotalElements] = useState(5);
  const [api, contextHolder] = notification.useNotification();

  const productDetailsCreate = products.map((item) => ({ ...item }));

  const openNotification = (placement) => {
    api.success({
      message: `Thông báo`,
      description: "Xóa sản phẩm thành công",
      placement,
    });
  };

  const calculateStt = (index) => {
    return (pageNo - 1) * pageSize + index + 1;
  };

  function handleOnOk() {
    setProducts(promotionProducts);
    setIsLoadingModal(false);
  }

  function handleOnCancel() {
    setProducts(products);
    setIsLoadingModal(false);
  }

  function action(record) {
    setProducts(() => productDetailsCreate);
  }

  function handleDeleted(value) {
    setProducts((product) =>
      product.filter((row) => row.productDetail !== value)
    );
    if (values.promotionId) {
      confirm({
        title: "Xác nhận",
        icon: <ExclamationCircleFilled />,
        content: "Bạn có chắc là muốn xóa sản phẩm không?",

        onOk() {
          async function deleteProductDetail() {
            await axios.delete(
              baseUrl +
                "delete?idPromotion=" +
                values.promotionId +
                "&idProductDetail=" +
                value.id
            );
          }
          openNotification();
          deleteProductDetail();
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  }

  const newColumns = {
    title: "Xóa",
    dataIndex: "deleted",
    key: "deleted",
    render: (object) => (
      <Button
        onClick={() => handleDeleted(object[0])}
        disabled={products.length <= 1}
      >
        <DeleteOutlined />
      </Button>
    ),
  };

  return (
    <>
      {contextHolder}
      <Modal
        width={1000}
        title="Chọn sản phẩm"
        centered
        open={isLoadingModal}
        onOk={handleOnOk}
        onCancel={handleOnCancel}
        footer={null}
      >
        <ProductDetails
          action={action}
          productDetailsCreate={productDetailsCreate}
        />
      </Modal>

      {products.length ? (
        <Space style={{ width: "100%" }} direction="vertical" size={12}>
          <Table
            style={{ width: "100%" }}
            columns={[...columns, newColumns]}
            dataSource={products.map((product, index) => ({
              key: product.productDetail.id,
              stt: calculateStt(index),
              product: product.productDetail.product.productName,
              button: product.productDetail.button.buttonName,
              material: product.productDetail.material.materialName,
              collar: product.productDetail.collar.collarTypeName,
              shirtTail: product.productDetail.shirtTail.shirtTailTypeName,
              slevee: product.productDetail.sleeve.sleeveName,
              size: product.productDetail.size.sizeName,
              color: product.productDetail.color.colorCode,
              price: product.productDetail.price,
              warehouse: product.productDetail.quantity,
              deleted: [product.productDetail, index],
            }))}
            pagination={false}
          />
          {/* <Pagination
                defaultCurrent={pageNo}
                total={totalElements}
                showSizeChanger={true}
                pageSize={pageSize}
                pageSizeOptions={["5", "10", "20", "50", "100"]}
                onShowSizeChange={handlePageSize}
                onChange={(page) => setPageNo(page)}
              /> */}
        </Space>
      ) : null}
    </>
  );
}

export default ModalAddProductList;
