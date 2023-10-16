import React, { useEffect, useState } from 'react'
import styles from './BillManagement.module.css'
import { Button, Input, Pagination, Select, Table } from 'antd'
import {
    EyeOutlined,
    SearchOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import { DatePicker, Space } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
const { RangePicker } = DatePicker;

const BillManagement = () => {

    const [billCode, setBillCode] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [billType, setBilType] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            setStartDate(dateStrings[0])
            setEndDate(dateStrings[1])
            setCurrentPage(1)
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    };

    const rangePresets = [
        {
            label: 'Last 7 Days',
            value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
            label: 'Last 14 Days',
            value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
            label: 'Last 30 Days',
            value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
            label: 'Last 90 Days',
            value: [dayjs().add(-90, 'd'), dayjs()],
        },
    ];

    const columns = [
        {
            title: '#',
            key: 'index',
            render: (text, record, index) => {
                return index + 1
            }
        },
        {
            title: 'Mã',
            dataIndex: 'billCode',
            key: 'code',
        },
        {
            title: 'Tổng sản phẩm',
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'fullname',
            key: 'fullname',
            render: (fullname) => {
                return fullname || 'Khách lẻ'
            }
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (createdDate) => {
                return moment(createdDate).format(` HH:mm:ss DD/MM/YYYY`)
            }
        },
        {
            title: 'Loại hóa đơn',
            dataIndex: 'billType',
            key: 'billType',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                return status === 'ACTIVE' ? 'Chưa thanh toán'
                    : status === 'Cancel' ? 'Đã hủy'
                        : 'Đã thanh toán'
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (text, record) => {
                return <Link to={`/admin/counter-sales/${record.billId}/timeline`}>
                    <Button>
                        <EyeOutlined />
                    </Button>
                </Link>
            }
        },
    ]

    const fetchData = () => {
        setLoading(true);
        const params = {
            billCode: billCode,
            startDate: startDate,
            endDate: endDate,
            status: status,
            billType: billType
        }
        console.log(params)
        axios
            .get(`http://localhost:8080/api/admin/bill`, {
                params: params
            })
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [billCode, startDate, endDate, status, billType]);

    return (
        <div>
            <section className={styles.filter}>
                <div style={{ width: '400px', marginBottom: '20px' }}>
                    <Input
                        size="large"
                        placeholder="Tìm kiếm hóa đơn"
                        prefix={<SearchOutlined />}
                        onChange={(e) => {
                            setBillCode(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div>
                    <Space direction="vertical" size={12}>
                        <RangePicker presets={rangePresets} onChange={onRangeChange} />
                    </Space>
                    <span style={{ margin: '0 20px' }}>Trạng thái
                        <Select
                            bordered={false}
                            style={{ width: '12%', borderBottom: '1px solid #ccc' }}
                            onChange={(e) => {
                                setStatus(e);
                                setCurrentPage(1);
                            }}
                            defaultValue={''}
                        >
                            <Select.Option value={''}>Tất cả</Select.Option>
                            <Select.Option value={'active'}>Chưa thanh toán</Select.Option>
                            <Select.Option value={'paid'}>Đã thanh toán</Select.Option>
                            <Select.Option value={'cancel'}>Đã huỷ</Select.Option>
                        </Select>
                    </span>
                    <span >Loại hóa đơn
                        <Select
                            style={{ width: '12%', borderBottom: '1px solid #ccc' }}
                            onChange={(e) => {
                                setBilType(e);
                                setCurrentPage(1);
                            }}
                            bordered={false}
                            defaultValue={''}
                        >
                            <Select.Option value={''}>Tất cả</Select.Option>
                            <Select.Option value={'In-store'}>Tại quầy</Select.Option>
                            <Select.Option value={'Online'}>Online</Select.Option>
                        </Select>
                    </span>
                </div>
            </section>

            <section className={styles.content}>
                <Table
                    dataSource={data}
                    columns={columns}
                    loading={loading}
                    loadingIndicator={<div>Loading...</div>}
                    pagination={{
                        showSizeChanger: true,
                        pageSizeOptions: [5, 10, 15, 20],
                        defaultPageSize: 5,
                        showLessItems: true,
                        style: { marginRight: "10px" },
                    }}
                />
            </section>
        </div>
    )
}

export default BillManagement
