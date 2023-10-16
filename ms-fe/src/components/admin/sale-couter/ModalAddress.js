import { text } from '@fortawesome/fontawesome-svg-core'
import { Button, Modal, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ModalAddress = ({ isModalOpen, handleOk, handleCancel, username, render, selected, selectedAddress }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/admin/bill/customer/${username}/address`)
            .then((response) => {
                setData(response.data);
                setLoading(false)
            })
            .catch((error) => console.log(error))
    }, [username])

    const columns = [
        {
            title: '#',
            key: 'STT',
            render: (text, record, index) => {
                return index + 1
            }
        },
        {
            title: 'Địa chỉ',
            key: 'address',
            render: (text, record, index) => {
                return <>
                    {record.descriptionDetail + ' ' + record.ward + ' ' + record.district + ' ' + record.city}
                </>
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record, index) => {
                return (
                    <div>
                        <Button onClick={() => handleSelectAddress(record.id, index)}>Chọn</Button>
                    </div>
                )
            }
        },
    ]

    const handleSelectAddress = (id, index) => {
        selected(index);
        selectedAddress(id)
        handleCancel();
        render(Math.random)
    }

    return (
        <div>
            <Modal closeIcon={true}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={1000}
            >
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    loading={loading}
                    closeIcon />
            </Modal>
        </div>
    )
}

export default ModalAddress
