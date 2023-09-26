import React, { useEffect, useState } from 'react';
import { Modal, Input, Select, Button, Table } from 'antd';
import styles from './ModalProduct.module.css';
import axios from 'axios';

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
                <div>
                    <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                        <Input
                            placeholder="Tìm kiếm"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            style={{ marginRight: '8px', width: '650px' }}
                        />
                    </div>
                    <div className={styles.selectContainer}>
                        <Select defaultValue="option1" className={styles.select}>
                            <Option value="option1">Option 1</Option>
                            <Option value="option2">Option 2</Option>
                            <Option value="option3">Option 3</Option>
                        </Select>
                        <Select defaultValue="option1" className={styles.select}>
                            <Option value="option1">Option 1</Option>
                            <Option value="option2">Option 2</Option>
                            <Option value="option3">Option 3</Option>
                        </Select>
                        <Select defaultValue="option1" className={styles.select}>
                            <Option value="option1">Option 1</Option>
                            <Option value="option2">Option 2</Option>
                            <Option value="option3">Option 3</Option>
                        </Select>
                        <Select defaultValue="option1" className={styles.select}>
                            <Option value="option1">Option 1</Option>
                            <Option value="option2">Option 2</Option>
                            <Option value="option3">Option 3</Option>
                        </Select>
                        <Select defaultValue="option1" className={styles.select}>
                            <Option value="option1">Option 1</Option>
                            <Option value="option2">Option 2</Option>
                            <Option value="option3">Option 3</Option>
                        </Select>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        scroll={{ y: 400 }}
                        pagination={false}
                    />
                </div>
            </Modal>
        </>
    );
};

export default ModalProduct;