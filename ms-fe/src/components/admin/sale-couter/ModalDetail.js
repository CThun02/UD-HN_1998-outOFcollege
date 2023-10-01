import { Modal, Table } from 'antd'
import React from 'react'
import styles from './ModalDetail.module.css'
import moment from 'moment/moment';
const ModalDetail = ({ isModalOpen, handleOk, handleCancel, timelineDetail }) => {
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
            render: (status) => {
                return status === '1'
                    ? 'tạo hóa đơn'
                    : status === '2'
                        ? 'thanh toán thành công'
                        : status === '0' ? 'Đã hủy'
                            : ''
            }
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (createdDate) => {
                return moment(createdDate)
                    .format('DD/MM/YYYY HH:mm')
            }
        },
        {
            title: 'Người xác nhận',
            dataIndex: 'createdBy',
            key: 'createdBy'
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
        }
    ];

    return (
        <div >
            <Modal closeIcon={true}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className={styles.w}
            >
                <Table
                    columns={columns}
                    dataSource={timelineDetail}
                    pagination={false}
                    closeIcon />
            </Modal>
        </div>
    )
}

export default ModalDetail
