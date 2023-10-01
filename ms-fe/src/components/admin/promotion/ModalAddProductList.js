import {  Divider, Modal, Space, Table } from "antd";
import { useState } from "react";

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
    title: "Doanh số",
    dataIndex: "sales",
    key: "sales",
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

const data = [
  {
    key: "1",
    stt: "1",
    product: "Sản phẩm 1",
    sales: 40,
    price: "2000 - 5000",
    warehouse: 50000,
  },
  {
    key: "2",
    stt: "2",
    product: "Sản phẩm 2",
    sales: 40,
    price: "2000 - 5000",
    warehouse: 50000,
  },
];

function ModalAddProductList({
  isLoadingModal,
  setIsLoadingModal,
  products,
  setProducts,
}) {
  const [promotionProducts, setPromotionProducts] = useState([]);

  function handleOnOk() {
    setProducts(promotionProducts);
    setIsLoadingModal(false);
  }

  function handleOnCancel() {
    setProducts(products);
    setIsLoadingModal(false);
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // setProducts(selectedRows);
      console.log("row: ", selectedRows);
      setPromotionProducts(selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
      // disabled: record.key === "Disabled User",
    }),
  };

  return (
    <>
      <Modal
        width={1000}
        title="Chọn sản phẩm"
        centered
        open={isLoadingModal}
        onOk={handleOnOk}
        onCancel={handleOnCancel}
      >
        {/* <Spin
          tip="Loading..."
          spinning={isLoading}
          size="large"
          style={{ width: "100%" }}
        > */}
        <>
          <Divider />

          <Space style={{ width: "100%" }} direction="vertical" size={12}>
            <Table
              style={{ width: "100%" }}
              rowSelection={{ type: rowSelection, ...rowSelection }}
              columns={columns}
              dataSource={data}
              pagination={false}
              // dataSource={vouchers.map((voucher, index) => ({
              //   key: voucher.voucherId,
              //   stt: calculateStt(index),
              //   voucherCode: voucher.voucherCode,
              //   voucherName: voucher.voucherName,
              //   limitQuantity: numeral(voucher.limitQuantity).format("0,0"),
              //   voucherValue: `${numeral(voucher.voucherValue).format("0,0")} ${
              //     voucher.voucherMethod === "vnd" ? "VND" : "%"
              //   }`,
              //   startAndEndDate: `${moment(voucher.startDate).format(
              //     "DD/MM/YYYY"
              //   )} - ${moment(voucher.endDate).format("DD/MM/YYYY")}`,
              //   status:
              //     voucher.status === "ACTIVE"
              //       ? "Đang diễn ra"
              //       : voucher.status === "INACTIVE"
              //       ? "Đã kết thúc"
              //       : voucher.status === "UPCOMING"
              //       ? "Sắp diễn ra"
              //       : null,
              //   action: voucher.voucherCode,
              // }))}
              // className={styles.table}
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
        </>
        {/* </Spin> */}
      </Modal>

      {products.length ? (
        <Space style={{ width: "100%" }} direction="vertical" size={12}>
          <Table
            style={{ width: "100%" }}
            rowSelection={{ type: rowSelection, ...rowSelection }}
            columns={columns}
            dataSource={products.map((product) => ({
              key: product.key,
              stt: product.stt,
              product: product.product,
              price: product.price,
              sales: product.sales,
              warehouse: product.warehouse,
            }))}
            pagination={false}
            // dataSource={vouchers.map((voucher, index) => ({
            //   key: voucher.voucherId,
            //   stt: calculateStt(index),
            //   voucherCode: voucher.voucherCode,
            //   voucherName: voucher.voucherName,
            //   limitQuantity: numeral(voucher.limitQuantity).format("0,0"),
            //   voucherValue: `${numeral(voucher.voucherValue).format("0,0")} ${
            //     voucher.voucherMethod === "vnd" ? "VND" : "%"
            //   }`,
            //   startAndEndDate: `${moment(voucher.startDate).format(
            //     "DD/MM/YYYY"
            //   )} - ${moment(voucher.endDate).format("DD/MM/YYYY")}`,
            //   status:
            //     voucher.status === "ACTIVE"
            //       ? "Đang diễn ra"
            //       : voucher.status === "INACTIVE"
            //       ? "Đã kết thúc"
            //       : voucher.status === "UPCOMING"
            //       ? "Sắp diễn ra"
            //       : null,
            //   action: voucher.voucherCode,
            // }))}
            // className={styles.table}
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
