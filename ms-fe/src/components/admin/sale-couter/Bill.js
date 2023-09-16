import React from 'react'
import { Button, Space, Table, Tag } from 'antd';
import { Input } from 'antd';
import styles from "./Bill.module.css"
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Bill = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a href='#1'>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a href='#1'>Invite {record.name}</a>
                    <a href='#1'>Delete</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    return (
        <div className={styles.bill}>
            <div className={styles.header}>
                <div >
                    <Input
                        placeholder="Tìm hóa đơn"
                        prefix={<SearchOutlined />}
                        className={styles.headerLeft}
                    />
                </div>
                <div className={styles.headerRight}>
                    <Link to="/admin/counter-sales/bill" type="primary" className={styles.btn} >
                        <Button type='primary'>Tạo hóa đơn</Button>
                    </Link>
                </div>
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default Bill
