import { Tabs, Button, Table, Space, Tag, Divider, Row, Col, Input, Switch, Segmented } from 'antd';
import React, { useRef, useState } from 'react';
import styles from './Bill.module.css';
import ModalProduct from './ModalProduct';
import { AppstoreOutlined, BarsOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const initialItems = [
    {
        label: 'Tab 1',
        key: '1',
    },
    {
        label: 'Tab 2',
        key: '2',
    },
    {
        label: 'Tab 3',
        key: '3',
    },
];

const Bill = () => {

    const columns = [
        {
            title: 'STT',
            key: 'stt',
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button>delete</Button>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: '`John Brown`',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            tags: ['cool', 'teacher'],
        },
    ];
    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onChange = (newActiveKey) => {
        setActiveKey(newActiveKey);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({
            label: 'New Tab',
            key: newActiveKey,
        });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    const renderTabContent = () => {
        return items.map((item) => (
            <Tabs.TabPane key={item.key} tab={item.label}>
                <div className={styles.tabContent} >
                    <div className={styles.cartContainer}>
                        <h2>Giỏ hàng</h2>
                        <Button type='primary'
                            className={styles.addButton}
                            onClick={showModal}>Thêm giỏ hàng</Button>
                    </div>
                    <Divider className={styles.blackDivider} style={{ marginTop: '10px' }} />
                    <Table dataSource={data} columns={columns} />
                    <ModalProduct visible={isModalVisible} onCancel={handleCancel} />
                </div>

                <div className={styles.lstAccount}>
                    <Row>
                        <Col span={12}>
                            <h2>Tài khoản</h2>
                        </Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <Button style={{ color: "blue" }}>Chọn tài khoản</Button>
                        </Col>
                    </Row>
                    <Divider className={styles.blackDivider} style={{ marginTop: '10px' }} />
                    <Row>
                        <Col span={6}>
                            <h3>Tên khách hàng</h3>
                        </Col>
                        <Col span={12}>
                            <Tag color="gray" style={{ borderRadius: "15px", padding: '2px 6px' }}>Khách lẻ</Tag>
                        </Col>
                    </Row>
                </div>

                <div className={styles.lstAccount}>
                    <h2 style={{ textAlign: "left" }}>Thông tin thanh toán</h2>
                    <Divider className={styles.blackDivider} style={{ marginTop: '3px' }} />
                    <Row>
                        <Col span={15}>

                        </Col>
                        <Col span={9}>
                            <Switch />
                            <span style={{ marginLeft: "5px" }}>Giao hàng</span>
                            <br />
                            <Input style={{ width: '200px' }}
                                placeholder='Mã giảm giá' />
                            <Button style={{ color: 'blue', marginTop: '10px', marginLeft: '10px' }}
                                className={styles.font}
                            >Chọn mã giảm giá</Button>
                            <Row style={{ marginTop: '10px' }}>
                                <Col span={12}>
                                    <span style={{ fontSize: '16px', display: 'block' }}>Tiền hàng</span>
                                    <span style={{ fontSize: '16px', display: 'block' }}>Giảm giá</span>
                                    <span style={{ fontSize: '16px', display: 'block' }}>Tổng số tiền</span>
                                    <span style={{ fontSize: '16px', display: 'block' }}>Khách cần trả</span>
                                    <span style={{ fontSize: '16px', display: 'block' }}>Tiền thừa trả khách</span>
                                </Col>
                                <Col span={12}>
                                    <span style={{ fontSize: '16px', display: 'block' }}>3.000.000</span>
                                    <span style={{ fontSize: '16px', display: 'block' }}>0</span>
                                    <span style={{ color: 'red', fontSize: '16px', display: 'block' }}>3.000.000</span>
                                    <input className={styles.input} />
                                    <span style={{ fontSize: '16px', display: 'block' }}>3.000.000</span>
                                </Col>
                                <div>
                                    {/* <Segmented
                                        options={[
                                            {
                                                label: 'List',
                                                value: 'List',
                                                icon: <BarsOutlined />,
                                            },
                                            {
                                                label: 'Kanban',
                                                value: 'Kanban',
                                                icon: <AppstoreOutlined />,
                                            },
                                        ]}
                                    /> */}
                                </div>
                                <div style={{ marginTop: '30px' }}>
                                    <Button style={{ backgroundColor: '#212121', color: 'white' }}>
                                        Xác nhận thanh toán
                                    </Button>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </div >
            </Tabs.TabPane>
        ));
    };

    return (
        <>
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey}
                className={styles.bill}
                onEdit={onEdit}
            >
                {renderTabContent()}
            </Tabs>
        </>
    );
};

export default Bill;