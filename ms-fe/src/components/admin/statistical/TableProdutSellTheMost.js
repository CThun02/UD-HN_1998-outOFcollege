import { FileImageFilled } from "@ant-design/icons";
import { Table } from "antd";
import React from "react";

const TableProdutSellTheMost = () => {
  const columns = [
    {
      key: "stt",
      datatIndex: "index",
      title: "#",
    },
    {
      key: "product",
      datatIndex: "product",
      title: "Sản phẩm",
    },
    {
      key: "quantity",
      datatIndex: "quantity",
      title: "Số lượng bán",
    },
    {
      key: "total",
      datatIndex: "total",
      title: "Tổng thu",
    },
  ];
  return (
    <>
      <Table columns={columns} />
    </>
  );
};

export default TableProdutSellTheMost;
