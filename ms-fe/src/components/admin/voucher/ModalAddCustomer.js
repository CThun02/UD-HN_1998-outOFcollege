import { DeleteOutlined } from "@ant-design/icons";
import { Button, Divider, Modal, Pagination, Space, Spin, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Họ và tên",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
];

const baseCustomersUrl = "http://localhost:8080/api/admin/account/";

function ModalAddCustomer({
  isLoadingModal,
  setIsLoadingModal,
  values,
  customers,
  setCustomers,
  setFieldValue,
}) {
  const [customersVoucher, setCustomersVoucher] = useState([]);
  //pagination
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalElements, setTotalElements] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const calculateStt = (index) => {
    return (pageNo - 1) * pageSize + index + 1;
  };

  function handlePageSize(current, size) {
    setPageNo(current);
    setPageSize(size);
  }

  useEffect(
    function () {
      async function getCustomers() {
        await axios
          .post(
            `${
              pageNo !== 1 || pageSize !== 5
                ? baseCustomersUrl +
                  "voucher" +
                  "?pageNo=" +
                  (pageNo - 1) +
                  "&" +
                  "pageSize=" +
                  pageSize
                : baseCustomersUrl + "voucher"
            }`,
            {
              searchText: "user",
              gender: true,
            }
          )
          .then((res) => {
            setTotalElements(res.data.totalElements);
            setCustomersVoucher(res.data.content);

            setIsLoading(false);
            console.log(res.data.content);
          })
          .catch((err) => console.log(err));
      }

      getCustomers();
    },
    [pageNo, pageSize]
  );

  useEffect(
    function () {
      if (
        values?.voucherId &&
        values?.objectUse === "member" &&
        !customers.length
      ) {
        setSelectedRowKeys(values?.usernames.map((user) => user.username));
        setSelectedRows(values?.usernames);
      }
    },
    [values, customers]
  );

  function handleOnOk() {
    setCustomers(selectedRows);
    setFieldValue("usernames", selectedRows);
    setIsLoadingModal(false);
  }

  function handleOnCancel() {
    setIsLoadingModal(false);
  }

  function handleOnChange(selectedRowKeys, selectedRows) {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  }

  function handleDeleted(value) {
    setSelectedRows((selectedRows) =>
      selectedRows.filter((row) => row !== value)
    );
    setSelectedRowKeys((selectedRowKeys) =>
      selectedRowKeys.filter((row) => row !== value.key)
    );
    if (!values?.voucherId) {
      setCustomers((selectedRows) =>
        selectedRows.filter((row) => row !== value)
      );
    }
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: handleOnChange,
    getCheckboxProps: (record) => ({
      disabled: values?.usernames?.some(
        (item) => item.username === record.username
      ),
    }),
  };

  const newColumns = {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (row) => (
      <Button onClick={() => handleDeleted(row)}>
        <DeleteOutlined />
      </Button>
    ),
  };

  return (
    <>
      {values?.objectUse === "all" ? null : (
        <Modal
          width={1000}
          title="Chọn khách hàng"
          centered
          open={isLoadingModal}
          onOk={handleOnOk}
          onCancel={handleOnCancel}
        >
          <Spin
            tip="Loading..."
            spinning={isLoading}
            size="large"
            style={{ width: "100%" }}
          >
            <>
              <Divider />

              <Space style={{ width: "100%" }} direction="vertical" size={12}>
                <>
                  <Space
                    style={{ width: "100%" }}
                    direction="vertical"
                    size={12}
                  >
                    <Table
                      style={{ width: "100%" }}
                      rowSelection={{
                        type: rowSelection,
                        ...rowSelection,
                      }}
                      columns={columns}
                      dataSource={customersVoucher.map((customer, index) => ({
                        key: customer.username,
                        stt: calculateStt(index),
                        username: customer.username,
                        fullName: customer.fullName,
                        gender: customer.gender ? "Nam" : "Nữ",
                        email: customer.email,
                        phoneNumber: customer.phoneNumber,
                      }))}
                      pagination={false}
                    />
                    <Pagination
                      defaultCurrent={pageNo}
                      total={totalElements}
                      showSizeChanger={true}
                      pageSize={pageSize}
                      pageSizeOptions={["5", "10", "20", "50", "100"]}
                      onShowSizeChange={handlePageSize}
                      onChange={(page) => setPageNo(page)}
                    />
                  </Space>
                </>
              </Space>
            </>
          </Spin>
        </Modal>
      )}

      {customers?.length && !values?.voucherId ? (
        <Space style={{ width: "100%" }} direction="vertical" size={12}>
          <Table
            style={{ width: "100%" }}
            columns={[...columns, values.voucherId ? "" : newColumns]}
            dataSource={customers?.map((customer, index) => ({
              key: customer.username,
              stt: calculateStt(index),
              username: customer.username,
              fullName: customer.fullName,
              gender: customer.gender ? "Nam" : "Nữ",
              email: customer.email,
              phoneNumber: customer.phoneNumber,
              action: customer,
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
      ) : (
        ""
      )}

      {values?.objectUse === "member" && values?.voucherId ? (
        <Space style={{ width: "100%" }} direction="vertical" size={12}>
          <Table
            style={{ width: "100%" }}
            columns={columns}
            dataSource={values?.usernames.map((customer, index) => ({
              key: customer.username,
              stt: calculateStt(index),
              username: customer.username,
              fullName: customer.fullName,
              gender: customer.gender ? "Nam" : "Nữ",
              email: customer.email,
              phoneNumber: customer.phoneNumber,
            }))}
            pagination={false}
          />
        </Space>
      ) : null}
    </>
  );
}

export default ModalAddCustomer;
