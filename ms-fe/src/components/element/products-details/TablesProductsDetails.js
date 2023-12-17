import { Col, Row, Space, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: 50,
  },
  {
    key: "product",
    dataIndex: "product",
    title: "Sản phẩm",
    render: (product) => {
      return (
        <div>
          <Row>
            <Col span={4}>
              <img src={product.path} alt="product" style={{ width: "50px" }} />
            </Col>
            <Col span={20}>
              <Space style={{ width: "100%" }} direction="vertical" size={4}>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <strong>{`${product.productName} - ${product.material} - ${product.collar} - ${product.shirtTail} - ${product.shirtTail} - ${product.sleeve}  `}</strong>
                </div>
                <div>
                  <Space
                    style={{ width: "100%" }}
                    direction="vertical"
                    size={4}
                  >
                    <div
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <span>Kích cỡ: {product.size}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignContent: "center",
                      }}
                    >
                      Màu sắc:
                      <div
                        style={{
                          backgroundColor: product.color,
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          marginLeft: "10px",
                        }}
                      ></div>
                    </div>
                  </Space>
                </div>
              </Space>
            </Col>
          </Row>
        </div>
      );
    },
  },
  {
    key: "price",
    dataIndex: "price",
    title: "Giá",
    width: 200,
  },
  {
    key: "quantity",
    dataIndex: "quantity",
    title: "Số lượng",
    width: 150,
  },
];

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
  //paging
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const calculateStt = (index) => {
    return (pageNo - 1) * pageSize + index + 1;
  };

  function handleOnChangeRow(key, row) {
    const data = row.filter((item) => item.isCheckExistsInPromotion === false);
    setSelectedRowKeys(key);
    setSelectedRows(data);
    setProductsDetailsId(
      data.map((e) => {
        const { key } = e;
        return key;
      })
    );
  }

  function handlePageSize(current, size) {
    setPageNo(current);
    setPageSize(size);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: handleOnChangeRow,
    selections:
      status === "INACTIVE" || status === "CANCEL"
        ? null
        : [Table.SELECTION_ALL, Table.SELECTION_NONE],
    getCheckboxProps: (record) => ({
      disabled: record.isCheckExistsInPromotion,
    }),
  };

  useEffect(
    function () {
      if (values) {
        setSelectedRowKeys(productsDetailsId);
      }
    },
    [values, productsDetailsId, productsId]
  );

  return (
    <div>
      <span>
        Đã chọn: <strong>{`${productsDetailsId.length} sản phẩm`}</strong>
      </span>
      <div>
        <Space style={{ width: "100%" }} direction="vertical" size={12}>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={productsDetails?.map((p, index) => ({
              stt: calculateStt(index),
              key: p.productDetailsId,
              product: {
                productName: p.productName,
                path: p.imageDefault,
                button: p.buttonTypeName,
                material: p.materialType,
                collar: p.collarType,
                shirtTail: p.shirtTailType,
                sleeve: p.sleeveType,
                size: p.size,
                color: p.color,
              },
              price: p.price,
              quantity: p.quantity,
              isCheckExistsInPromotion: p.isCheckExistsInPromotion,
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
        </Space>
      </div>
    </div>
  );
}

export default TablesProductsDetails;
