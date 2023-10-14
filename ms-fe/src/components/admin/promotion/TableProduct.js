import { Pagination, Space, Table } from "antd";
import axios from "axios";
import numeral from "numeral";
import { useState } from "react";
import { useEffect } from "react";

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
const baseUrlProductDetail = "http://localhost:8080/api/admin/product";

function TableProduct({ productsId, setProductsId, values }) {
  const [data, setData] = useState([]);

  //paging
  const [totalElements, setTotalElements] = useState(1);
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
      console.log("also: ", values);
      const res = await axios.get(baseUrl + "/promotion");

      setData(res.data.content);
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
          sellQuantity: e.sellQuantity,
          price: `${numeral(e.minPrice).format("0,0")}đ - ${numeral(
            e.maxPrice
          ).format("0,0")}đ`,
          quantity: e.quantityProduct,
        }))}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: "20px" }}
        defaultCurrent={pageNo}
        total={totalElements}
        showSizeChanger={true}
        pageSize={pageSize}
        pageSizeOptions={["5", "10", "20", "50", "100"]}
        onShowSizeChange={handlePageSize}
        onChange={(page) => setPageNo(page)}
      />
    </div>
  );
}

export default TableProduct;
