import React from 'react'
import styles from './CreateBill.module.css'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
const CreateBill = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <Link to="/admin/counter-sales">
                        <Button type="primary">Danh sách</Button>
                    </Link>
                </div>
                <div>
                    <Link to="/admin/counter-sales/bill" type="primary">
                        <Button type='primary'>Thêm sản phẩm</Button>
                    </Link>
                </div>
            </div>
            <div className={styles.listProduct}></div>
        </div>
    )
}

export default CreateBill
