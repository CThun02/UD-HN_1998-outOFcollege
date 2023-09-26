import { Tabs, Button, Table, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import styles from './Bill.module.css';
import ModalProduct from './ModalProduct';

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
                <div className={styles.tabContent}>
                    <div className={styles.cartContainer}>
                        <h2>Giỏ hàng</h2>
                        <Button type='primary'
                            className={styles.addButton}
                            onClick={showModal}>Thêm giỏ hàng</Button>
                    </div>
                    <div className={styles.separator}></div>
                    <Table dataSource={data} columns={columns} />
                    <ModalProduct visible={isModalVisible} onCancel={handleCancel} />
                </div>
            </Tabs.TabPane>
        ));
    };

    return (
        <>
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                className={styles.bill}
            >
                {renderTabContent()}
            </Tabs>
        </>
    );
};

export default Bill;