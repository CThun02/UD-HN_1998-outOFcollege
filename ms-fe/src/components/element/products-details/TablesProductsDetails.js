import { Space, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
const columns = [
  {
    key: "product",
    dataIndex: "product",
    title: "Sản phẩm",
    width: "20%",
  },
  {
    key: "button",
    dataIndex: "button",
    title: "Cúc áo",
  },
  {
    key: "material",
    dataIndex: "material",
    title: "Chất liệu",
    with: 110,
  },
  {
    key: "collar",
    dataIndex: "collar",
    title: "Cổ áo",
  },
  {
    key: "shirtTail",
    dataIndex: "shirtTail",
    title: "Đuôi áo",
  },
  {
    key: "sleeve",
    dataIndex: "sleeve",
    title: "Tay áo",
  },
  {
    key: "size",
    dataIndex: "size",
    title: "Kích cỡ",
  },
  {
    key: "color",
    dataIndex: "color",
    title: "Màu sắc",
  },
  {
    key: "price",
    dataIndex: "price",
    title: "Giá",
  },
  {
    key: "quantity",
    dataIndex: "quntity",
    title: "Số lượng",
    width: 110,
  },
];
const arraysIds = [];

function TablesProductsDetails({
  productsDetails,
  productsDetailsId,
  setProductsDetailsId,
  values,
  setOnDeleteProductDetailIds,
  productsId,
  status,
}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [arrays, setArrays] = useState([]);

  function handleOnChangeRow(key, row) {
    setSelectedRowKeys(key);
    setSelectedRows(row);
    setProductsDetailsId(key);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: handleOnChangeRow,
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
      console.log("values: ", values);
      if (values?.promotionId) {
        setSelectedRowKeys(productsDetailsId);
      }
    },
    [values, productsDetailsId, productsId]
  );

  function handleOnSelect(record, isSelected, selectedRows, nativeEvent) {
    if (!isSelected && values?.productsDetailsIdDb.includes(record.key)) {
      arraysIds.push(record.key);
      setOnDeleteProductDetailIds(arraysIds);
    }

    const data = arrays.map((e) => ({ ...e, record }));

    setArrays(selectedRows);
    console.log("arrays: ", data);
    console.log("arrays record: ", record);
  }

  return (
    <div>
      <span>
        Đã chọn: <strong>{`${selectedRowKeys.length} sản phẩm`}</strong>
      </span>
      <div>
        <Space style={{ width: "100%" }} direction="vertical" size={12}>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
              onSelect: handleOnSelect,
            }}
            columns={columns}
            dataSource={productsDetails.map((p) => ({
              key: p.productDetailsId,
              product: p.productName,
              button: p.buttonTypeName,
              material: p.materialType,
              collar: p.collarType,
              shirtTail: p.shirtTailType,
              sleeve: p.sleeveType,
              size: p.size,
              color: p.color,
              price: p.price,
              quantity: p.quantity,
            }))}
            scroll={{ y: 400, x: 1300 }}
          />
        </Space>
      </div>
    </div>
  );
}

export default TablesProductsDetails;