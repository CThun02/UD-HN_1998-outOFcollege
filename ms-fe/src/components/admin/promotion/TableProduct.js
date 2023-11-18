import { Pagination, Space, Table } from "antd";
import axios from "axios";
import numeral from "numeral";
import { useState } from "react";
import { useEffect } from "react";
import { getToken } from "../../../service/Token";

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: "5%",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Doanh số",
    dataIndex: "sellQuantity",
    key: "sellQuantity",
    width: "15%",
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    width: "30%",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
    width: "15%",
  },
];

const baseUrl = "http://localhost:8080/api/admin/product";

function TableProduct({ productsId, setProductsId, values, status }) {
  const [data, setData] = useState([]);

  //paging
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  function handlePageSize(current, size) {
    setPageNo(current);
    setPageSize(size);
  }

  const calculateStt = (index) => {
    return (pageNo - 1) * pageSize + index + 1;
  };

  function handleOnChange(selectedRowKeys, selectedRows) {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
    setProductsId(selectedRowKeys);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: handleOnChange,
    selections:
      status === "INACTIVE" || status === "CANCEL"
        ? null
        : [Table.SELECTION_ALL, Table.SELECTION_NONE],
    getCheckboxProps: (record) => ({
      disabled: status === "INACTIVE" || status === "CANCEL" ? true : false,
    }),
  };

  useEffect(
    function () {
      if (values) {
        setSelectedRowKeys(productsId);
      }
    },
    [values, productsId]
  );

  useEffect(() => {
    async function getProducts() {
      const res = await axios.get(baseUrl + "/promotion", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setData(res.data);
    }

    getProducts();
  }, []);

  return (
    <div>
      <Table
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={columns}
        dataSource={data.map((e, index) => ({
          stt: calculateStt(index),
          key: e.productId,
          product: e.productName,
          sellQuantity: e.sellQuantity ? e.sellQuantity : "Đang bán",
          price: `${
            e.minPrice === e.maxPrice
              ? numeral(e.maxPrice).format("0,0") + "đ"
              : numeral(e.minPrice).format("0,0") +
                "đ" +
                " - " +
                numeral(e.maxPrice).format("0,0") +
                "đ"
          }`,
          quantity: e.quantityProduct ? e.quantityProduct : "Hết hàng",
        }))}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
          defaultPageSize: 5,
          showLessItems: true,
          style: { marginRight: "10px" },
          onChange: (currentPage, pageSize) => {
            handlePageSize(currentPage, pageSize);
          },
        }}
      />
    </div>
  );
}

export default TableProduct;
