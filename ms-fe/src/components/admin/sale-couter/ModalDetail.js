import { Modal, Table } from 'antd'
import React from 'react'

const ModalDetail = ({ isModalOpen, handleOk, handleCancel }) => {
    const columns = [
        {
            title: 'STT',
            key: 'stt',
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            key: 'action',
        },
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Người xác nhận',
            dataIndex: 'useConfirm',
            key: 'useConfirm',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
        }
    ];

    return (
        <div >
            <Modal closeIcon={false} style={{ width: '1000px' }} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Table columns={columns} style={{ width: '1000px' }} />
            </Modal>
        </div>
    )
}

export default ModalDetail
