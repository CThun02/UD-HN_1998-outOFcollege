import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Tag } from 'antd';
import { Input } from 'antd';
import styles from "./Bill.module.css"
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Bill = () => {
    const [data, setData] = useState([])
    const handleDelete = (record) => {
        const id = record.billDetailId;
        console.log(id)
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/admin/bill')
            .then(response => {
                setData(response.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])
    const columns = [
        {
            title: 'STT',
            // dataIndex: 'STT',
            key: 'STT',
            render: (_, record) => {
                return data.indexOf(record) + 1;
            }
        },
        {
            title: 'Ảnh',
            dataIndex: 'imgDefault',
            key: 'imgDefault',
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (_, record) => record.price * record.quantity,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createDate',
            key: 'createDate',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: (_, record) => {
                const tagColor = record.status === 'active' ? 'red' : 'green';
                return <Tag color={tagColor}>{record.status}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        className={styles.btnEdit}
                        href='#1'></Button>
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        className={styles.btnDelete}
                        href='#1'
                        onClick={() => handleDelete(record)}></Button>
                </Space>
            ),
        },
    ];
    return (
        <div className={styles.bill}>
            <div className={styles.header}>
                <div >
                    <Input
                        placeholder="Tìm hóa đơn"
                        prefix={<SearchOutlined />}
                        className={styles.headerLeft}
                    />
                </div>
                <div className={styles.headerRight}>
                    <Link to="/admin/counter-sales/bill" type="primary" className={styles.btn} >
                        <Button type='primary' >Tạo hóa đơn</Button>
                    </Link>
                </div>
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default Bill
