import React, { useEffect, useState } from 'react';
import { Modal, Input, Select, Button, Table, Row, Col } from 'antd';
import styles from './ModalProduct.module.css';
import axios from 'axios';



const { Option } = Select;

const ModalProduct = ({ visible, onCancel }) => {
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const showModal = (product) => {
        setIsModalVisible(true);
        setSelectedProduct(product);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



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
                return <img src={record.imgDefault} alt='bug' />
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
                    onClick={() => showModal(record)}
                    key={record.key}>
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
            {
                selectedProduct && (
                    <Modal
                        title="Chi tiết sản phẩm"
                        open={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <Row style={{ height: '300px', width: '300px' }}>
                            <Col span={12}>
                                <img
                                    src={selectedProduct.img}
                                    alt='ảnh lỗi'
                                    style={{
                                        height: "100px",
                                        width: '100px'
                                    }} />
                            </Col>
                            <Col span={12}>

                            </Col>
                        </Row>
                    </Modal>
                )
            }
        </>
    );
};

export default ModalProduct;