import { Modal, Table } from 'antd'
import React from 'react'
import styles from './ModalDetail.module.css'
import moment from 'moment/moment';
const ModalDetail = ({ isModalOpen, handleOk, handleCancel, timelineDetail, billType }) => {
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
                if (billType === 'In-store') {
                    return status === '1'
                        ? 'Chờ xác nhận'
                        : status === '2'
                            ? 'Thanh toán thành công'
                            : status === '0' ? 'Đã hủy'
                                : ''
                } else {
                    return status === '1'
                        ? 'Chờ xác nhận'
                        : status === '2'
                            ? 'Chờ xác nhận'
                            : status === '3' ? 'Đã giao đóng gói & đang được giao'
                                : status === '4' ? 'Giao hàng thành công' :
                                    status === '0' ? 'Đã hủy'
                                        : '#'
                }
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
