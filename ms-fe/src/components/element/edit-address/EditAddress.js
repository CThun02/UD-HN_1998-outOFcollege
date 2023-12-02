import { Col, Input, Modal, Row, Select, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import FloatingLabels from '../../element/FloatingLabels/FloatingLabels'
import * as yup from 'yup';
import axios from 'axios';
import moment from 'moment';
const EditAddress = ({
    isModalOpen,
    handleAddressOk,
    handleAddressCancel,
    render,
    addressId,
    billId,
    totalPrice
}) => {
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [error, setError] = useState({})
    const [leadtime, setLeadtime] = useState(null)
    const [shippingFee, setShippingFee] = useState(0)
    const [formData, setFormData] = useState({
        fullName: '',
        sdt: '',
        city: '',
        district: '',
        ward: '',
        descriptionDetail: '',
    })

    const CLIENTURL = `http://localhost:8080/api/client`

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = yup.object().shape({
        fullName: yup.string().required('Tên không được để trống'),
        sdt: yup.string()
            .required('Số điện thoại không được để trống')
            .matches(/^0\d{9}$/,
                'Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số'),
        city: yup.string().required('Thành phố không được để trống'),
        district: yup.string().required('Quận huyện không được để trống'),
        ward: yup.string().required('Phường xã không được để trống'),
    })

    const handleProvincesChange = (e) => {
        formData.city = e
        formData.district = ''
        formData.ward = ''
        setDistricts([])
        setWards([])
        fetchDistrict(e?.substring(e.indexOf("|") + 1))
    }

    const handleDistrictChange = (e) => {
        formData.district = e
        formData.ward = ''
        setWards([])
        fetchWard(e?.substring(e.indexOf("|") + 1))
    }

    const handleWardChange = (e) => {
        formData.ward = e
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
    const handleSubmit = async () => {
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

        await axios.put(`${CLIENTURL}/update-address/${addressId}`, formData).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error);
        })

        await axios.put(`${CLIENTURL}/update-delivery-note/${billId}`, {
            shipDate: leadtime,
            shipPrice: shippingFee
        }).catch((error) => {
            console.log(error);
        })
        notification.success({
            message: 'Thông báo',
            description: 'Sửa thông tin thành công',
            duration: 2
        })

        handleAddressCancel()
        render(Math.random)
        setFormData({})
    }

    useEffect(() => {
        axios.get(`${CLIENTURL}/address/${addressId}`)
            .then((response) => {
                let district =
                    response.data.district?.substring(0, response.data.district.indexOf("|"));
                let ward =
                    response.data.ward?.substring(0, response.data.ward.indexOf("|"));
                setFormData({
                    ...response.data,
                    district: district,
                    ward: ward
                })
            })
            .catch((error) => console.log(error))
        console.log(`formData`, formData)
    }, [])

    useEffect(() => {
        fetchProvince();
        fetchDistrict();
        fetchWard();
        let district = formData.district?.substring(1 + formData.district.indexOf("|"));
        let ward = formData.ward?.substring(1 + formData.ward.indexOf("|"));
        handleShippingOrderLeadtime(district, ward)
        handleShippingFee(totalPrice, district, ward)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressId, formData?.district, formData?.ward])

    return (
        <div>
            <Modal centered title="Tạo mới địa chỉ" open={isModalOpen} onOk={handleSubmit} onCancel={handleAddressCancel}>
                <Row>
                    <Col style={{ margin: '20px 0' }} span={24}>
                        <FloatingLabels
                            label="Họ tên"
                            zIndex={true}
                            value={formData.fullName}
                        >
                            <Input
                                name='fullName'
                                onChange={handleChange}
                                value={formData.fullName}
                                allowClear
                            />
                            {error.fullName && <div style={{
                                color: 'red',
                                padding: '5px'
                            }}>{error.fullName}</div>}
                        </FloatingLabels>
                    </Col>
                    <Col style={{ marginBottom: '20px' }} span={24}>
                        <FloatingLabels
                            label="Số điện thoại"
                            zIndex={true}
                            value={formData.sdt}
                        >
                            <Input
                                name={`sdt`}
                                onChange={handleChange}
                                value={formData.sdt}
                                allowClear
                            />
                            {error.sdt && <div style={{
                                color: 'red',
                                padding: '5px'
                            }}>{error.sdt}</div>}
                        </FloatingLabels>
                    </Col>
                    <Col style={{ marginBottom: '20px' }} span={24}>
                        <FloatingLabels
                            label="Tỉnh/thành phố"
                            zIndex={true}
                            value={formData.city}
                        >
                            <Select
                                showSearch
                                style={{
                                    height: 45,
                                    width: 465
                                }}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                name="city"
                                value={formData.city}
                                allowClear
                                onChange={(e) => {
                                    handleProvincesChange(e)
                                }}
                                options={provinces.map((province) => ({
                                    value: province.ProvinceName + '|' + province.ProvinceID,
                                    label: province.ProvinceName,
                                }))}
                            />
                            {error.city && <div style={{
                                color: 'red',
                                padding: '5px'
                            }}>{error.city}</div>}
                        </FloatingLabels>
                    </Col>
                    <Col style={{ marginBottom: '20px' }} span={24}>
                        <FloatingLabels
                            label="Quận/huyện"
                            zIndex={true}
                            value={formData.district}
                        >
                            <Select
                                showSearch
                                style={{
                                    height: 45,
                                    width: 465
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
                            {error.district && <div style={{
                                color: 'red',
                                padding: '5px'
                            }}>{error.district}</div>}
                        </FloatingLabels>
                    </Col>
                    <Col style={{ marginBottom: '20px' }} span={24}>
                        <FloatingLabels
                            label="Phường xã"
                            zIndex={true}
                            value={formData.ward}
                        >
                            <Select
                                showSearch
                                style={{
                                    height: 45,
                                    width: 465
                                }}
                                value={formData.ward}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                onChange={(e) => handleWardChange(e)}
                                allowClear
                                options={wards?.map((ward) => ({
                                    value: ward.WardName + '|' + ward.WardCode,
                                    label: ward.WardName,
                                }))}
                            />
                            {error.ward && <div style={{
                                color: 'red',
                                padding: '5px'
                            }}>{error.ward}</div>}
                        </FloatingLabels>
                    </Col>
                    <Col style={{ marginBottom: '20px' }} span={24}>
                        <FloatingLabels
                            label="Địa chỉ chi tiết"
                            zIndex={true}
                            value={formData.descriptionDetail}
                        >
                            <Input
                                name='descriptionDetail'
                                value={formData.descriptionDetail}
                                onChange={handleChange}
                                allowClear
                            />
                        </FloatingLabels>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default EditAddress
