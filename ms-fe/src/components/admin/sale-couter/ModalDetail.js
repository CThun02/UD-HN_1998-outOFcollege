import { Modal, Table } from 'antd'
import React from 'react'
import styles from './ModalDetail.module.css'
import moment from 'moment/moment';
const ModalDetail = ({ isModalOpen, handleOk, handleCancel, timelineDetail, symbol }) => {
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
                if (symbol === 'Received') {
                    return status === '1'
                        ? 'Chờ xác nhận'
                        : status === '2'
                            ? 'Thanh toán thành công'
                            : status === '0' ? 'Đã hủy'
                                : status === '3' ? 'Yêu cầu trả hàng'
                                    : status === '4' ? 'Trả hàng thành công' : ""
                } else {
                    return status === '1'
                        ? 'Chờ xác nhận'
                        : status === '2'
                            ? 'Đã xác nhận'
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
                return createdDate
            }
        },
        {
            title: 'Người xác nhận',
            dataIndex: 'createdBy',
            key: 'createdBy',
            render: (createdBy) => {
                return <span>
                    {createdBy?.substring(createdBy.indexOf("_") + 1)} <br />
                    {createdBy?.substring(0, createdBy.indexOf("_"))}
                </span>
            }
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
                title={"Ghi chú hóa đơn"}
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
