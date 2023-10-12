import { Button, Modal, Table } from 'antd';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const ModalAccount = ({ visible, onCancel, cartId, render }) => {
    const [loading, setLoadding] = useState(true);
    const [renderThis, setRenderThis] = useState(null);
    var cart = JSON.parse(localStorage.getItem(cartId));

    const add = (value) => {
        cart.account = value;
        localStorage.setItem(cartId, JSON.stringify(cart));
        render(Math.random)
        console.log(onCancel())
    }

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'fullname',
            key: 'fullname'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => {
                return gender === true ? 'Nam' : 'Nữ'
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => {
                return (
                    <div>
                        <Button onClick={() => add(record)}>Thêm</Button>
                    </div>
                )
            }
        },
    ]

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/api/admin/bill/customer`)
            .then((response) => {
                setData(response.data);
                setLoadding(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [renderThis])
    return (
        <div>
            <Modal
                title="Tìm kiếm khách hàng"
                key={cartId}
                open={visible}
                onCancel={() => {
                    onCancel();
                    setRenderThis(visible);
                }}
                footer={null}
                width={1000}
            >
                <Table pagination={false} columns={columns} dataSource={data} loading={loading} />
            </Modal>
        </div>
    )
}

export default ModalAccount
