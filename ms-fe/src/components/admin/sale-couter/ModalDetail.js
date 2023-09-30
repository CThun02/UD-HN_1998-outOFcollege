import { Modal, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ModalDetail = ({ isModalOpen, handleOk, handleCancel }) => {

    const [timelinesDetail, setTimelinesDetail] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/api/admin/bill/1/timeline')
            .then((response) => {
                setTimelinesDetail(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            render: (_, record, index) => {
                return index + 1;
            }
        },
        {
            title: 'Thao tác',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'Người xác nhận',
            dataIndex: 'createdBy',
            key: 'createdBy',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
        }
    ];

    return (
        <Modal closeIcon={true}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <Table
                columns={columns}
                dataSource={timelinesDetail}
                pagination={false}
                closeIcon />
        </Modal>
    )
}

export default ModalDetail
