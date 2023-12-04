import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Spin,
  Table,
  notification,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import FloatingLabels from "../../element/FloatingLabels/FloatingLabels";
import styles from "./ModalAddCustomer.module.css";
import { getToken } from "../../../service/Token";

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

const options = [
  { label: "Nam", value: true },
  { label: "Nữ", value: false },
  { label: "Tất cả", value: "all" },
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
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [gender, setGender] = useState("all");
  const [api, contextHolder] = notification.useNotification();

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [pageNoTable, setPageNoTable] = useState(1);
  const [pageSizeTable, setPageSizeTable] = useState(5);

  const calculateSttTable = (index) => {
    return (pageNoTable - 1) * pageSizeTable + index + 1;
  };

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
        const filterCustomer = { searchText, gender };
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
            filterCustomer,
            {
              headers: {
                Authorization: `Bearer ${getToken(true)}`,
              },
            }
          )
          .then((res) => {
            setTotalElements(res.data.totalElements);
            setCustomersVoucher(res.data.content);

            setIsLoading(false);
            console.log(res.data.content);
          })
          .catch((err) => {
            const status = err?.response?.data?.status;
            if (status === 403) {
              api.error({
                message: "Lỗi",
                description: "Bạn không có quyền xem nội dung này",
              });
              return;
            }

            if (status === 400) {
              api.error({
                message: "Lỗi",
                description: "Vui lòng nhập đúng định dạng",
              });
              return;
            }
          });
      }

      getCustomers();
    },
    [pageNo, pageSize, gender, searchText]
  );

  useEffect(
    function () {
      if (
        values?.voucherId &&
        values?.objectUse === "member" &&
        !customers.length
      ) {
        setSelectedRowKeys((prevData) => [
          ...prevData,
          ...values?.usernames.map((user) => user.username),
        ]);

        setSelectedRows(values?.usernames);
      }
    },
    [values, customers]
  );

  function handleOnSelected(record) {
    const isExist = selectedRows.some(
      (item) => item.username === record.username
    );

    if (isExist) {
      const dataRows = selectedRows.filter(
        (el) => el.username !== record.username
      );
      const dataRowsUser = selectedRowKeys.filter(
        (el) => el !== record.username
      );
      setSelectedRows(dataRows);
      setSelectedRowKeys(dataRowsUser);
    } else {
      setSelectedRows((prevData) => [...prevData, record]);
      const { username } = record;
      setSelectedRowKeys((prevData) => [...prevData, username]);
    }
  }

  function handleOnOk() {
    setCustomers(selectedRows);
    setFieldValue("usernames", selectedRows);
    setIsLoadingModal(false);
  }

  function handleOnCancel() {
    setIsLoadingModal(false);
  }

  function handleOnChange(selectedRowKeys, selectedRows) {
    // setSelectedRows(selectedRows);
    // setSelectedRowKeys(selectedRowKeys);
  }

  function handleDeleted(value) {
    const dataRows = selectedRows.filter(
      (el) => el.username !== value.username
    );
    setSelectedRows((selectedRows) =>
      selectedRows.filter((row) => row !== value)
    );
    setSelectedRowKeys((selectedRowKeys) =>
      selectedRowKeys.filter((row) => row !== value.key)
    );
    setCustomers(dataRows);
    setFieldValue("usernames", dataRows);
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
        (item) => item?.username === record?.username
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

              <Row>
                <Col span={6}>
                  <FloatingLabels
                    label="Search...."
                    name="searchText"
                    value={searchText}
                    zIndex={true}
                  >
                    <Input
                      size="large"
                      name="searchText"
                      onChange={(e) => setSearchText(e.target.value)}
                      value={searchText}
                      allowClear
                    />
                  </FloatingLabels>
                </Col>
                <Col span={1}></Col>
                <Col span={4}>
                  <FloatingLabels
                    label="Search...."
                    name="gender"
                    value={true}
                    zIndex={true}
                  >
                    <Select
                      name="gender"
                      className={styles.selectedItem}
                      onChange={(e) => setGender(e)}
                      options={options}
                      value={gender}
                      style={{ width: "100%" }}
                      placeholder={null}
                      size="large"
                    />
                  </FloatingLabels>
                </Col>
              </Row>

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
                        onSelect: handleOnSelected,
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
              stt: calculateSttTable(index),
              username: customer.username,
              fullName: customer.fullName,
              gender: customer.gender ? "Nam" : "Nữ",
              email: customer.email,
              phoneNumber: customer.phoneNumber,
              action: customer,
            }))}
            // pagination={false}
          />
          {/* <Pagination
            defaultCurrent={pageNoTable}
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

      {values?.objectUse === "member" &&
      values?.voucherId &&
      values?.usernames.length ? (
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
            // pagination={false}
          />
        </Space>
      ) : null}
    </>
  );
}

export default ModalAddCustomer;
