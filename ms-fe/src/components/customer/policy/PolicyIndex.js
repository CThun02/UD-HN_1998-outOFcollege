import { Col, Menu, Row } from 'antd'
import React from 'react'
import styles from "./PoliCy.module.css"

const PolicyIndex = () => {
  return (
    <Row>
        <Col span={20} offset={2} className={styles.index}>
            <h1 style={{textAlign:"center", marginBottom:"60px"}}>Chính sách cửa hàng</h1>
            <Row>
                <Col span={4}>
                    <Menu
                        mode="inline"
                        className={styles.sideBar__menu}
                        onClick={(event) => {
                        }}
                        items={[
                        {
                            label: <h3>Chính sách mua hàng</h3>,
                            key: "policyShopping",
                        },
                        {
                            label: <h3>Chính sách trả hàng</h3>,
                            key: "policyReturn",
                        },
                        {
                            label: <h3>Chính sách bảo mật</h3>,
                            key: "policySecurity",
                        },
                        {
                            label: <h3>Chính sách vận chuyển</h3>,
                            key: "policyShipping",
                        },
                        {
                            label: <h3>Điều khoản và điều kiện</h3>,
                            key: "policyRules",
                        },
                        {
                            label: <h3>Chính sách khuyến mại</h3>,
                            key: "policydiscount",
                            children: [
                            {
                                label: "Phiếu giảm giá",
                                key: "voucher",
                            },
                            {
                                label: "Giảm giá sản phẩm",
                                key: "promotion",
                            },
                            ],
                        },
                        ]}
                    />
                </Col>
            </Row>
        </Col>
    </Row>
  )
}

export default PolicyIndex