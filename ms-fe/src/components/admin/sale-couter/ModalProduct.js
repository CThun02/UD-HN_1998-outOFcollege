import React, { useState } from 'react';
import { Modal, Input, Select, Button, Table } from 'antd';
import styles from './ModalProduct.module.css';


const columns = [
    {
        title: 'Ảnh',
        dataIndex: 'img',
        key: 'img',
    },
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Giá',
        key: 'price',
        dataIndex: 'price',

    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Button type="primary" style={{ backgroundColor: "white", color: 'blue' }}>
                Chọn
            </Button>
        ),
    },
];
const data = [
    {
        key: '1',
        img: 'J',
        id: 32,
        name: 'New York No. 1 Lake Park',
        price: 177,
    },
    {
        key: '1',
        img: 'J',
        id: 32,
        name: 'New York No. 1 Lake Park',
        price: 177,
    },
    {
        key: '1',
        img: 'J',
        id: 32,
        name: 'New York No. 1 Lake Park',
        price: 177
    },
];
const { Option } = Select;

const ModalProduct = ({ visible, onCancel }) => {
    const [searchInput, setSearchInput] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };
    const handleSearch = () => {
        // Xử lý tìm kiếm
    };

    const handleReset = () => {
        // Xử lý làm mới
    };

    return (
        <Modal
            title="Tìm kiếm sản phẩm"
            visible={visible}
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
                    <Button type="primary" onClick={handleSearch} style={{ marginRight: '10px' }}>
                        Tìm kiếm
                    </Button>
                    <Button type="primary" onClick={handleReset} style={{ backgroundColor: '#FFA216' }}>
                        Làm mới
                    </Button>
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
                    onRow={(record) => ({
                        onClick: () => handleSelectItem(record),
                    })} />
                <Modal
                    visible={modalVisible}
                    onCancel={handleModalClose}
                    footer={null}
                >
                    {selectedItem && (
                        <>
                            <h2>Chi tiết sản phẩm</h2>
                            <p>ID: {selectedItem.id}</p>
                            <p>Tên sản phẩm: {selectedItem.name}</p>
                            <p>Giá: {selectedItem.price}</p>
                            {/* Thêm thông tin chi tiết khác tại đây */}
                        </>
                    )}
                </Modal>
            </div>
        </Modal>
    );
};

export default ModalProduct;