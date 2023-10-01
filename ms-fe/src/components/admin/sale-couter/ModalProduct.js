import React, { useEffect, useState } from 'react';
import { Modal, Input, Select, Button, Table } from 'antd';
import styles from './ModalProduct.module.css';
import axios from 'axios';
import ProductDetails from '../product/ProductDetails';

const { Option } = Select;

const ModalProduct = ({ visible, onCancel }) => {
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState([]);



    const columns = [
        {
            title: 'STT',
            // dataIndex: 'STT',
            key: 'STT',
            render: (_, record) => {
                return data.indexOf(record) + 1;
            }
        },
        {
            title: 'Ảnh',
            dataIndex: 'imgDefault',
            key: 'imgDefault',
            render: (_, record) => {
                return <img src={record.imgDefault} alt='bug' key={record.imgDefault} />
            }
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'brandName',
            key: 'brandName',
        },
        {
            title: 'Thể loại',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Mẫu',
            key: 'patternName',
            dataIndex: 'patternName',

        },
        {
            title: 'Dáng áo',
            key: 'formName',
            dataIndex: 'formName',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="primary"
                    style={{ backgroundColor: "white", color: 'blue' }}
                    key={record.productId}>
                    Chọn
                </Button>
            ),
        },
    ];

    useEffect(() => {
        axios.get("http://localhost:8080/api/admin/bill/product")
            .then((response) => {
                setData(response.data);
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <Modal
                title="Tìm kiếm sản phẩm"
                open={visible}
                onCancel={onCancel}
                className={styles.modalSize}
                footer={null}
            >
                <ProductDetails />
            </Modal>
        </>
    );
};

export default ModalProduct;