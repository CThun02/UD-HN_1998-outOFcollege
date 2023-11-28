import React from 'react'
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { Modal } from 'antd';
import { FaRegFileAlt, FaTimes, FaTruck } from 'react-icons/fa';
import { CheckCircleOutlined } from '@ant-design/icons';

const TimelineCustom = ({ timelines, open, handleCancel }) => {
    const handleOk = () => {
        console.log(1)
    }

    return (
        <div>
            <Modal width={1000} open={open} onOk={handleOk} onCancel={handleCancel}
                footer={false}
            >
                <Timeline minEvents={6} placeholder >
                    {timelines}
                    {timelines &&
                        timelines.map((data) => (
                            <TimelineEvent
                                color={data.status === "0" ? "#FF0000" : "#00cc00"}
                                icon={
                                    data.status === "1" ? FaRegFileAlt
                                        : data.status === "0" ? FaTimes
                                            : data.status === "2" ? FaRegFileAlt
                                                : data.status === "3" ? FaTruck
                                                    : data.status === "4" ? FaTimes
                                                        : data.status === "5" ? FaTimes
                                                            : data.status === "6" ? FaRegFileAlt
                                                                : null
                                }
                                title={
                                    data.status === "0" ? (
                                        <h3>Đã hủy</h3>
                                    ) : data.status === "1" ? (
                                        <h3>Chờ xác nhận</h3>
                                    ) : data.status === "2" ? (
                                        <h3>Đã xác nhận</h3>
                                    ) : data.status === "3" ? (
                                        <h3>
                                            Đã đóng gói & <br /> đang được giao
                                        </h3>
                                    ) : data.status === "4" ? (
                                        <h3>Giao hàng thành công</h3>
                                    ) : data.status === "5" ? (
                                        <h3>Yêu cầu trả hàng</h3>
                                    ) : data.status === "6" ? (
                                        <h3>Trả hang thành công</h3>
                                    ) : (
                                        <h3>.</h3>
                                    )
                                }
                                subtitle={data.createdDate}
                            />
                        ))}
                </Timeline>
            </Modal>
        </div>
    )
}

export default TimelineCustom
