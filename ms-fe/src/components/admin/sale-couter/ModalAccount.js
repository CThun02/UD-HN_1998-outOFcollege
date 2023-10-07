import { Modal, Table } from 'antd';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const ModalAccount = ({ visible, onCancel, cartId, render }) => {
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
    ]
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/api/admin/bill/customer`)
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    })
    return (
        <div>
            <Modal
                title="Tìm kiếm sản phẩm"
                key={cartId}
                open={visible}
                onCancel={onCancel}
                footer={null}
                width={2000}
            >
                <Table columns={columns} dataSource={data} />
            </Modal>
        </div>
    )
}

export default ModalAccount
