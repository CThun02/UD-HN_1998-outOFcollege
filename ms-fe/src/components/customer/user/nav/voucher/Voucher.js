import { Col, Collapse, Input, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './Voucher.module.css'
import axios from 'axios'
import numeral from 'numeral';
import moment from 'moment';
const image = "/vouchers/voucher_img.png";

const Voucher = () => {

    const [voucherCode, setVoucherCode] = useState('')
    const [vouchers, setVouchers] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/api/client/vouchers/tktest?voucherCode=${voucherCode}`)
            .then(response => setVouchers(response.data))
            .catch(err => console.log(err))
    }, [voucherCode])

    const items = vouchers.map((item, index) => ({
        key: `${item.id}`,
        label: (
            <div>
                <Row>
                    <Col span={12}>
                        <img src={image} alt={item.voucherName} />
                    </Col>
                    <Col span={12} className={styles.padding}>
                        <h3 className={styles.fontWeight500}>
                            {`Giảm ${numeral(item.voucherValue).format("0,0")}`}
                            {`${item.voucherMethod === "vnd" ? "đ" : "%"}`}
                        </h3>
                        <h3 className={styles.fontWeight400}>
                            Đơn tối thiểu {item.voucherCondition}đ{" "}
                            {`${item.voucherMethod === "%"
                                ? "Giảm tối đa " + item.voucherValueMax + "đ"
                                : ""
                                }`}
                        </h3>
                        <h4 className={`${styles.fontWeight400} ${styles.color}`}>
                            HSD: {moment(item.endDate).format("DD.MM.YYYY")}
                        </h4>
                    </Col>
                </Row>
            </div>
        ),
        children: (
            <div style={{ marginTop: '-40px' }}>
                <p>Voucher Code: {item.voucherCode}</p>
                <p>Start Date: {moment(item.startDate).format("DD.MM.YYYY")}</p>
                <p>End Date: {moment(item.endDate).format("DD.MM.YYYY")}</p>
            </div>
        ),
    }));

    return (
        <div className={styles.content}>
            <div className={styles.width}>
                <Input size='large' placeholder='Nhập mã giảm giá'
                    onChange={(e) => setVoucherCode(e.target.value)} />
                <div>
                    <Row gutter={[16, 16]}>
                        {items.map((item) => (
                            <Col span={8} key={item.key}>
                                <Collapse expandIconPosition="right" ghost expandIcon={() => null}>
                                    <Collapse.Panel header={item.label} key={item.key} style={{ border: '1px solid #d0f1ff', marginTop: '5px' }}>
                                        {item.children}
                                    </Collapse.Panel>
                                </Collapse>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

        </div>
    )
}

export default Voucher
