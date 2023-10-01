import { Tabs, Button, Table, Space, Tag, Divider, Row, Col, Input, Switch, Segmented, Form, Select } from 'antd';
import React, { useRef, useState } from 'react';
import styles from './Bill.module.css';
import ModalProduct from './ModalProduct';
import logoGhn from '../../../Assets/img/logo/logo_ghn.png'
import { DeleteOutlined, DollarOutlined, SearchOutlined, SwapOutlined } from '@ant-design/icons';
import axios from 'axios';

const Bill = () => {
    // danh sách table
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
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        href='#1'
                        key={record.key}
                    ></Button>
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
    const [switchChange, setSwitchChange] = useState(false)
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const fetchProvinces = async () => {
        await axios
            .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
                {
                    headers: {
                        token: '0f082cbe-5110-11ee-a59f-a260851ba65c',
                    }
                })
            .then(res =>
                // console.log(res.data.data)
                setProvinces(res.data.data)
            )
            .catch(err =>
                console.log(err)
            )
    }

    fetchProvinces();

    const handleProvinceChange = async (value) => {
        await axios
            .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${value}`, {
                headers: {
                    token: '0f082cbe-5110-11ee-a59f-a260851ba65c',
                }
            })
            .then((response) => {
                setDistricts(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDistrictChange = async (value) => {
        console.log(value)
        await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${value}`,
            {
                headers: {
                    token: `0f082cbe-5110-11ee-a59f-a260851ba65c`
                }
            })
            .then(res => {
                setWards(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChangSwitch = (checked) => {
        setSwitchChange(checked)
    }
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
            < Tabs.TabPane key={item.key} tab={item.label} >
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
                            <Input prefix={<SearchOutlined />} placeholder='tìm kiếm tài khoản' style={{ width: '200px', marginRight: '20px' }} />
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

                <div className={styles.infoPayment}>
                    <h2 style={{ textAlign: "left" }}>Thông tin thanh toán</h2>
                    <Divider className={styles.blackDivider} style={{ marginTop: '3px' }} />
                    <Row>
                        <Col span={16}>
                            {switchChange && (
                                <Row>
                                    <Col span={10}>
                                        <span>
                                            <b style={{ color: 'red' }}>*</b> Họ và tên
                                        </span>
                                        <Input placeholder='nhập họ và tên' />
                                    </Col>
                                    <Col span={10} style={{ marginLeft: '40px' }}>
                                        <span>
                                            <b style={{ color: 'red' }}>*</b> Số điện thoại
                                        </span>
                                        <Input placeholder='nhập số điện thoại' />
                                    </Col>
                                </Row>
                            )}
                            {switchChange && (
                                <Row style={{ margin: '40px 0' }}>
                                    <Col span={7} >
                                        <span>
                                            <b style={{ color: 'red' }}>*</b> Tỉnh/thành phố
                                        </span>
                                        <br />
                                        <Select
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                (option?.label ?? "").includes(input)
                                            }
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? "")
                                                    .toLowerCase()
                                                    .localeCompare((optionB?.label ?? "").toLowerCase())
                                            }
                                            showSearch style={{ width: 200 }} onChange={handleProvinceChange}>
                                            {provinces.map((province) => (
                                                <Select.Option
                                                    label={province.ProvinceName}
                                                    key={province.ProvinceID}
                                                    value={province.ProvinceID}
                                                >
                                                    {province.ProvinceName}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col span={7}>
                                        <span>
                                            <b style={{ color: 'red' }}>*</b> Quận/huyện
                                        </span>
                                        <br />
                                        <Select style={{ width: 200 }} onChange={handleDistrictChange}>
                                            {districts.map((district) => (
                                                <Select.Option
                                                    key={district.DistrictID}
                                                    value={district.DistrictID}
                                                >
                                                    {district.DistrictName}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col span={7}>
                                        <span>
                                            <b style={{ color: 'red' }}>*</b> Phường/xã
                                        </span>
                                        <br />
                                        <Select style={{ width: 200 }}>
                                            {wards.map((ward) => (
                                                <Select.Option
                                                    key={ward.WardCode}
                                                    value={ward.WardCode}
                                                >
                                                    {ward.WardName}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Col>
                                </Row>
                            )}
                            {switchChange && (
                                <Row>
                                    <Col span={16}>
                                        <span>Địa chỉ cụ thể</span>
                                        <Input placeholder='Nhập địa chỉ cụ thể' />
                                    </Col>
                                    <Col span={6} style={{ marginLeft: '30px' }}>
                                        <img src={logoGhn} alt='an sẽ' style={{ width: '90px', height: '80px' }} />
                                    </Col>
                                </Row>
                            )}
                        </Col>
                        <Col span={8}>
                            <Switch onChange={handleChangSwitch} />
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
                                <div style={{ marginTop: '20px' }}>
                                    <Button icon={<DollarOutlined />} className="cash-button">
                                        Tiền
                                    </Button>
                                    <Button style={{ margin: '0 10px' }} icon={<SwapOutlined />} className="cash-button">
                                        Chuyển khoản
                                    </Button>
                                    <Button icon={<DollarOutlined />} className="cash-button">
                                        Cả hai
                                    </Button>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <Button type='primary' style={{ width: '350px', height: '40px' }}>
                                        Xác nhận thanh toán
                                    </Button>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </div >
            </ Tabs.TabPane>
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