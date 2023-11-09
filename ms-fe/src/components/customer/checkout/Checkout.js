import React, { useEffect, useState, } from 'react'
import styles from './Checkout.module.css'
import { Button, Col, Input, Modal, Radio, Row, Select, Space, notification } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import axios from 'axios'
import moment from 'moment/moment'
import numeral from 'numeral'
import TextArea from 'antd/es/input/TextArea'
import FloatingLabels from '../../element/FloatingLabels/FloatingLabels'
import * as yup from 'yup';


const Checkout = (props) => {
    const navigate = useNavigate();
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    // const [selectedProvince, setSelectedProvince] = useState('')
    const [productDetails, setProductDetails] = useState([])
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedWard, setSelectedWard] = useState('')
    const [leadtime, setLeadtime] = useState(null)
    const [shippingFee, setShippingFee] = useState(null)
    const [error, setError] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)
    const [render, setRender] = useState(null)


    const handleProvincesChange = (e) => {
        formData.city = e
        formData.district = ''
        formData.ward = ''
        setDistricts([])
        setWards([])
        fetchDistrict(e?.substring(e.indexOf("|") + 1))
        setSelectedDistrict(null)
        setSelectedWard(null)
        setLeadtime(null)
        setShippingFee(null)
    }

    const handleDistrictChange = (e) => {
        formData.district = e
        formData.ward = ''
        setWards([])
        setSelectedDistrict(e?.substring(e.indexOf("|") + 1))
        fetchWard(e?.substring(e.indexOf("|") + 1))
        setSelectedWard(null)
        setLeadtime(null)
        setShippingFee(null)
    }

    const handleWardChange = (e) => {
        formData.ward = e
        setSelectedWard(e?.substring(e.indexOf("|") + 1))
    }

    const fetchProvince = async () => {
        await axios
            .get(
                `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
                {
                    headers: {
                        token: "0f082cbe-5110-11ee-a59f-a260851ba65c",
                    },
                }
            )
            .then((res) => setProvinces(res.data.data))
            .catch((err) => console.log(err));
    };

    const fetchDistrict = async (value) => {
        if (value) {
            await axios
                .get(
                    `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${value}`,
                    {
                        headers: {
                            token: "0f082cbe-5110-11ee-a59f-a260851ba65c",
                        },
                    })
                .then((response) => {
                    setDistricts(response.data.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const fetchWard = async (value) => {
        if (value) {
            try {
                const response = await axios.get(
                    `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${value}`,
                    {
                        headers: {
                            token: `0f082cbe-5110-11ee-a59f-a260851ba65c`,
                        },
                    }
                );

                const wards = response.data.data;
                setWards(wards);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleShippingOrderLeadtime = (toDistrictId, toWardCode) => {
        const values = {
            from_district_id: 3440,
            from_ward_code: "13010",
            to_district_id: Number(toDistrictId),
            to_ward_code: `${toWardCode}`,
            service_id: 53321,
        };

        if (toDistrictId && toWardCode) {
            axios
                .post(
                    "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime",
                    values,
                    {
                        headers: {
                            token: "0f082cbe-5110-11ee-a59f-a260851ba65c",
                            shop_id: "4534109",
                        },
                    }
                )
                .then((response) => {
                    const leadtimeTimestamp = response.data.data.leadtime;
                    const leadtimeMoment = moment.unix(leadtimeTimestamp);
                    setLeadtime(
                        moment(leadtimeMoment._d).format("YYYY-MM-DDTHH:mm:ss.SSS")
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleShippingFee = (insuranceValue, toDistrictId, toWardCode) => {
        let service_id = 53321
        const values = {
            service_id: service_id,
            insurance_value: insuranceValue,
            coupon: null,
            from_district_id: 3440,
            to_district_id: Number(toDistrictId),
            to_ward_code: toWardCode,
            height: 15,
            length: 15,
            weight: 1000,
            width: 15,
        };

        if (insuranceValue && toDistrictId && toWardCode) {
            axios
                .post(
                    "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
                    values,
                    {
                        headers: {
                            token: "0f082cbe-5110-11ee-a59f-a260851ba65c",
                            shop_id: "4534109",
                        },
                    }
                )
                .then((response) => {
                    setShippingFee(response.data.data.total);
                })
                .catch((error) => {
                    console.log("Lỗi khi gọi API lần 1:", error);
                    service_id = 53322;
                    values.service_id = service_id;
                    axios
                        .post(
                            "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
                            values,
                            {
                                headers: {
                                    token: "0f082cbe-5110-11ee-a59f-a260851ba65c",
                                    shop_id: "4534109",
                                },
                            }
                        )
                        .then((response) => {
                            setShippingFee(response.data.data.total);
                        })
                        .catch((err) => {
                            console.log(values)
                            console.log("Lỗi khi gọi API lần 2:", err);
                        });
                });
        }
    };

    const generateRandomBillCode = () => {
        let result = "";
        const characters = "ABCDEF0123456789";

        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return "HD_" + result;
    }

    const [formData, setFormData] = useState({
        bill_code: generateRandomBillCode(),
        billType: 'Online',
        paymentDetailId: 1,
        price: 0,
        priceReduce: 0,
        fullName: '',
        phoneNumber: '',
        city: '',
        district: '',
        ward: '',
        addressDetail: '',
        note: '',
        lstBillDetailRequest: [],
    })

    const validate = yup.object().shape({
        fullName: yup.string().required('Tên không được để trống'),
        phoneNumber: yup.string()
            .required('Số điện thoại không được để trống')
            .matches(/^0\d{9}$/,
                'Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số'),
        city: yup.string().required('Thành phố không được để trống'),
        district: yup.string().required('Quận huyện không được để trống'),
        ward: yup.string().required('Phường xã không được để trống'),
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bill = {
            billCode: generateRandomBillCode(),
            price: totalPrice,
            priceReduce: 0,
            paymentDetailId: formData.paymentDetailId,
            billType: "Online",
            symbol: "Shipping",
            status: "Unpaid",
            note: formData.note,
            lstBillDetailRequest: formData.lstBillDetailRequest,
            transactionCode: formData.paymentDetailId === 2 ? '' : null,
            voucherCode: null,
        }

        const billAddress = {
            fullName: formData.fullName,
            sdt: formData.phoneNumber,
            city: formData.city,
            district: formData.district,
            ward: formData.ward,
            descriptionDetail: formData.addressDetail,
        };

        if (formData.paymentDetailId === 2) {
            axios.get(`http://localhost:8080/api/client/pay`, {
                params: {
                    price: 550000,
                }
            }).then((response) => {
                window.location.href = `${response.data}`
            }).catch((error) => {
                console.log(error)
            })
        }

        try {
            await validate.validate(formData, { abortEarly: false });
            setError({})
        } catch (errors) {
            const validationErrors = {};
            errors.inner.forEach((err) => {
                validationErrors[err.path] = err.message;
            });
            setError(validationErrors);
            return;
        }
        Modal.confirm({
            title: "Xác nhận thanh toán",
            content: "Bạn có chắc chắn muốn thanh toán?",
            async onOk() {
                for (let i = 0; i < productDetails?.length; i++) {
                    const billDetail = {
                        productDetailId: productDetails[i].data.productDetailId,
                        price: productDetails[i].data.colorAndSizeAndQuantity.priceProductMin,
                        quantity: productDetails[i].quantity,
                    };
                    formData.lstBillDetailRequest.push(billDetail)
                }
                try {
                    const response = await axios.post(
                        "http://localhost:8080/api/admin/bill",
                        bill
                    );
                    const responseAddress = await axios.post(
                        "http://localhost:8080/api/admin/address",
                        billAddress
                    );
                    await axios.post(
                        "http://localhost:8080/api/admin/delivery-note",
                        {
                            billId: response.data.id,
                            addressId: responseAddress.data.id,
                            shipDate: leadtime ?? null,
                            shipPrice: shippingFee ?? null,
                        }
                    );

                    notification.success({
                        message: "Thông báo",
                        description: "Thanh toán thành công",
                        duration: 2,
                    });
                } catch (error) {
                    console.log(error);
                }
            },
        });
    };

    const getAllCarts = () => {
        let carts = JSON.parse(localStorage.getItem('checkout'))
        console.log(carts)
        setProductDetails(carts)
        let totalPrice = 0;
        for (let i = 0; i < carts?.length; i++) {
            totalPrice +=
                carts[i].data.colorAndSizeAndQuantity.priceProductMin *
                carts[i].quantity
        }
        setTotalPrice(totalPrice)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProvince();
        fetchDistrict();
        fetchWard();
        handleShippingOrderLeadtime(selectedDistrict, selectedWard);
        handleShippingFee(100, selectedDistrict, selectedWard);

        getAllCarts()
    }, [selectedDistrict, selectedWard, render])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Row style={{ paddingTop: '50px' }}>
                    <Col span={14}>
                        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
                            THANH TOÁN
                        </h1>
                        <Row>
                            <Col span={13}>
                                <Row style={{ marginBottom: '5px' }}>
                                    <Col span={18}>
                                        <span style={{ fontSize: '20px', fontWeight: 500 }}>
                                            Thông tin đơn hàng
                                        </span>
                                    </Col>
                                    <Col span={6} style={{ paddingTop: 5 }}>
                                        <span style={{ fontSize: '15px', fontWeight: 500 }}>
                                            <UserOutlined />Đăng nhập
                                        </span>
                                    </Col>
                                </Row>

                                {/* form */}
                                <Row>
                                    <Col className={styles.mb} span={24}>
                                        <FloatingLabels
                                            label="Họ tên"
                                            zIndex={true}
                                            value={formData.fullName}
                                        >
                                            <Input
                                                size='large'
                                                name='fullName'
                                                onChange={handleChange}
                                                allowClear
                                            />
                                            {error.fullName && <div className={styles.errorText}>{error.fullName}</div>}
                                        </FloatingLabels>
                                    </Col>
                                    <Col className={styles.mb} span={24}>
                                        <FloatingLabels
                                            label="Số điện thoại"
                                            zIndex={true}
                                            value={formData.phoneNumber}
                                        >
                                            <Input
                                                size='large'
                                                name='phoneNumber'
                                                onChange={handleChange}
                                                allowClear
                                            />
                                            {error.phoneNumber && <div className={styles.errorText}>{error.phoneNumber}</div>}
                                        </FloatingLabels>
                                    </Col>
                                    <Col className={styles.mb} span={24}>
                                        <FloatingLabels
                                            label="Tỉnh/thành phố"
                                            zIndex={true}
                                            value={formData.city}
                                        >
                                            <Select
                                                showSearch
                                                style={{
                                                    height: 45,
                                                    width: 380
                                                }}
                                                optionFilterProp="children"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                value={formData.city}
                                                allowClear
                                                onChange={(e) => handleProvincesChange(e)}
                                                options={provinces.map((province) => ({
                                                    value: province.ProvinceName + '|' + province.ProvinceID,
                                                    label: province.ProvinceName,
                                                }))}
                                            />
                                            {error.city && <div className={styles.errorText}>{error.city}</div>}
                                        </FloatingLabels>
                                    </Col>
                                    <Col className={styles.mb} span={24}>
                                        <FloatingLabels
                                            label="Quận/huyện"
                                            zIndex={true}
                                            value={formData.district}
                                        >
                                            <Select
                                                showSearch
                                                style={{
                                                    height: 45,
                                                    width: 380,
                                                }}
                                                value={formData.district}
                                                optionFilterProp="children"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                onChange={(e) => handleDistrictChange(e)}
                                                options={districts?.map((district) => ({
                                                    value: district.DistrictName + '|' + district.DistrictID,
                                                    label: district.DistrictName,
                                                }))}
                                                allowClear
                                            />
                                            {error.district && <div className={styles.errorText}>{error.district}</div>}
                                        </FloatingLabels>
                                    </Col>
                                    <Col className={styles.mb} span={24}>
                                        <FloatingLabels
                                            label="Phường xã"
                                            zIndex={true}
                                            value={formData.ward}
                                        >
                                            <Select
                                                showSearch
                                                style={{
                                                    height: 45,
                                                    width: 380,
                                                }}
                                                value={formData.ward}
                                                optionFilterProp="children"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                allowClear
                                                onChange={(e) => handleWardChange(e)}
                                                options={wards?.map((ward) => ({
                                                    value: ward.WardName + '|' + ward.WardCode,
                                                    label: ward.WardName,
                                                }))}
                                            />
                                            {error.ward && <div className={styles.errorText}>{error.ward}</div>}
                                        </FloatingLabels>
                                    </Col>
                                    <Col className={styles.mb} span={24}>
                                        <FloatingLabels
                                            label="Địa chỉ chi tiết"
                                            zIndex={true}
                                            value={formData.addressDetail}
                                        >
                                            <Input
                                                size='large'
                                                name='addressDetail'
                                                onChange={handleChange}
                                                allowClear
                                            />
                                        </FloatingLabels>
                                    </Col>
                                    <Col className={styles.mb} span={24}>
                                        <FloatingLabels
                                            label="Ghi chú"
                                            zIndex={true}
                                            value={formData.note}
                                        >
                                            <TextArea rows={4}
                                                name='note'
                                                onChange={handleChange}
                                            />
                                        </FloatingLabels>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={10} style={{ marginLeft: '20px' }}>
                                <span style={{ fontSize: '20px', fontWeight: 500, }}>
                                    Vận chuyển
                                </span>
                                <div style={{
                                    marginTop: '5px',
                                    border: '1px solid rgba(175, 175, 175, .34)',
                                    padding: '20px 10px',
                                    borderRadius: '5px',
                                    height: 60,
                                    width: '110%'
                                }}>
                                    < span style={{ fontWeight: 500 }}> Thời gian nhận hàng dự kiến:</span>
                                    <span style={{ marginLeft: '10px' }}>
                                        {leadtime
                                            ? moment(leadtime).format("DD/MM/YYYY")
                                            : ""}
                                    </span>
                                </div>
                                <div style={{
                                    marginTop: '20px',
                                    border: '1px solid rgba(175, 175, 175, .34)',
                                    padding: '10px',
                                    width: '110%'
                                }}>
                                    <Radio.Group name='paymentDetailId' onChange={handleChange} value={formData.paymentDetailId}>
                                        <Space direction='vertical'>
                                            <Radio value={1} style={{ marginBottom: 15 }}>
                                                <span style={{ fontWeight: 500 }}>Thanh toán khi nhận hàng</span>
                                                {formData.paymentDetailId === 1 && <div>
                                                    Bạn sẽ thanh toán khi nhận được hàng
                                                </div>}
                                            </Radio>
                                            <Radio value={2}>
                                                <span style={{ fontWeight: 500 }}>
                                                    Thanh toán trưc tuyến
                                                </span>
                                                {formData.paymentDetailId === 2 && <div>
                                                    Bạn sẽ thanh toán bằng hình thức chuyển khoản
                                                </div>}
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={10}>
                        <div style={{ border: '1px solid rgba(175, 175, 175, .34)', width: 'auto', height: '700px', padding: ' 20px', marginLeft: 40 }}>
                            <h1 style={{ marginBottom: '10px' }}>Đơn hàng</h1>
                            <hr />
                            <div style={{ maxHeight: '300px', overflowY: 'auto', }}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className={styles.visuallyHidden}>Ảnh sản phẩm</th>
                                            <th className={styles.visuallyHidden}>Mô tả</th>
                                            <th className={styles.visuallyHidden}>Đơn giá</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <Space style={{ width: '100%' }} direction='vertical' size={16}>
                                            {console.log(productDetails)}
                                            {productDetails && productDetails?.map((productDetail) => (
                                                <tr>
                                                    <div style={{ width: '100%' }}>
                                                        <Space style={{ width: '100%', borderBottom: '1px solid #ccc', padding: '8px 8px 10px 8px' }} direction='horizontal' size={16}>
                                                            <div className={styles.productThumbnail}>
                                                                <div className={styles.productThumbnailWrapper}>
                                                                    <img
                                                                        src={productDetail.data.images[0].path} alt="" className={styles.productThumbnailImage} />
                                                                </div>
                                                                <span className={styles.productThumbnailQuantity}>{productDetail.quantity}</span>
                                                            </div>
                                                            <div style={{ width: 256 }}>
                                                                <span >
                                                                    {productDetail.data.productName}
                                                                </span>
                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <div
                                                                        style={{
                                                                            height: 20,
                                                                            width: 20,
                                                                            borderRadius: '50%',
                                                                            backgroundColor: productDetail.data.colorAndSizeAndQuantity.colors[0].colorCode,
                                                                        }}
                                                                    ></div>/
                                                                    <span>{productDetail.data.colorAndSizeAndQuantity.sizes[0].sizeName}</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {numeral(productDetail.data.colorAndSizeAndQuantity.priceProductMin)
                                                                    .format('0,0') + 'đ'}
                                                            </div>
                                                        </Space>
                                                    </div>
                                                </tr>
                                            ))}
                                        </Space>
                                    </tbody>
                                </table>
                            </div>
                            <div style={{ borderTop: '1px solid rgba(175,175,175,.34)', padding: '10px' }}>
                                <Button type='primary'>Chọn mã giảm giá</Button>
                            </div>
                            <div style={{ borderTop: '1px solid rgba(175,175,175,.34)', padding: '10px' }}>
                                <table style={{ width: '100%', fontSize: '16px' }} >
                                    <thead>
                                        <tr>
                                            <td><span className={styles.visuallyHidden}>Mô tả</span></td>
                                            <td><span className={styles.visuallyHidden}>Giá tiền</span></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ marginBottom: '100px' }} >
                                            <td className={styles.textLeft}>
                                                Tạm tính
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                {numeral(totalPrice).format('0,0') + 'đ'}
                                            </td>
                                        </tr>

                                        <tr  >
                                            <td className={styles.textLeft}>
                                                Phí vận chuyển
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                {numeral(shippingFee).format('0,0 đ')}
                                            </td>
                                        </tr>

                                        <tr  >
                                            <td className={styles.textLeft}>
                                                Giảm giá
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                {numeral(shippingFee).format('0,0 đ')}
                                            </td>
                                        </tr>

                                    </tbody>

                                    <tfoot style={{ borderTop: '100px solid red' }} >
                                        <tr>
                                            <th className={styles.textLeft} style={{ borderTop: '1px solid rgba(175, 175, 175, .34)' }}>
                                                Tổng cộng
                                            </th>
                                            <td style={{ textAlign: 'right', borderTop: '1px solid rgba(175, 175, 175, .34)' }} >{numeral(totalPrice + shippingFee).format('0,0') + 'đ'}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div>
                                <Link to="" style={{ textAlign: 'left' }}> {'< Quay về giỏ hàng'}</Link>
                                <Button type='primary' style={{ width: '100px', height: '40px', marginLeft: '150px' }} onClick={handleSubmit}>
                                    Đặt hàng
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div >
        </div >
    )
}
export default Checkout
