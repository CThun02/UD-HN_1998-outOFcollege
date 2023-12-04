import { QrcodeOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, notification } from 'antd';
import React from 'react'
import QRReader from '../../../service/QRReader';
import { useState } from 'react';
import styles from './FollowOrder.module.css'
import logoOOC from "../../../Assets/img/logo/logo_OOC.svg";
import { useNavigate } from 'react-router-dom';

const FollowOrder = () => {
    const [isModalQR, setIsModalQR] = useState(false);
    const [billCode, setBillCode] = useState("");
    const navigate = useNavigate()

    const searchBill = (billCode) => {
        if (billCode) {
            navigate("/ms-shop/bill/" + billCode);
        } else {
            notification.error({
                message: "Thông báo",
                description: "Không tìm thấy hóa đơn",
            });
        }
    }

    return (
        <>
            <QRReader
                visible={isModalQR}
                onCancel={() => setIsModalQR(false)}
                title={"Tìm kiếm hóa đơn"}
                setData={searchBill}
            />
            <div className={styles.returnIndex}>
                <img alt="" style={{ width: "12%" }} src={logoOOC} />
                <h2 style={{ textAlign: "center" }}>Tìm kiếm đơn hàng</h2>
                <Input
                    placeholder="Nhập mã hóa đơn đơn hàng"
                    className={styles.filter_inputSearch}
                    size="large"
                    onChange={(e) => setBillCode(e.target.value.trim())}
                />
                <div style={{ marginTop: "20px" }}>
                    <Space>
                        <Button
                            onClick={() => {
                                searchBill(billCode);
                            }}
                            type="primary"
                            size="large"
                        >
                            <SearchOutlined /> Tìm kiếm
                        </Button>
                        <Button
                            onClick={() => setIsModalQR(true)}
                            type="primary"
                            size="large"
                        >
                            <QrcodeOutlined /> Quét QR
                        </Button>
                    </Space>
                </div>
            </div>
        </>
    )
}

export default FollowOrder
