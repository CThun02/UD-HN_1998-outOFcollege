import React, { useState } from 'react';
import './css/style.css';
import ProductModal from './ProductModal';

function CreateBill() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <section className="full-screen-bg">
            <div className="container">
                <div className="row container-color mh-auto">
                    <div className="col-6">
                        <a href="/create-bill" className="btn btn-primary">
                            Danh sách
                        </a>
                    </div>
                    <div className="col-6">
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary" onClick={handleOpenModal}>
                                Thêm sản phẩm
                            </button>
                        </div>
                    </div>
                    <table className="table pt-5">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>ảnh tên</td>
                                <td>số lượng</td>
                                <td>Tổng tiền</td>
                                <td>Thao tác</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-5 container-color mh-auto">
                    <div className="row">
                        <div className="col-6" style={{ height: '10px' }}>
                            <h2>Tài khoản</h2>
                        </div>
                        <div className="col-6" style={{ height: '10px' }}>
                            <div className="d-flex justify-content-end">
                                <a href="#1" className="btn btn-primary">
                                    Chọn tài khoản
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="line mt-5"></div>
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>ảnh tên</td>
                                <td>số lượng</td>
                                <td>Tổng tiền</td>
                                <td>Thao tác</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-5 container-color mh-auto">
                    <div className="row">
                        <div className="col-6" style={{ height: '10px' }}>
                            <h2>Khách hàng</h2>
                        </div>
                        <div className="col-6" style={{ height: '10px' }}>
                            <div className="d-flex justify-content-end">
                                <a href="#1" className="btn btn-primary">
                                    Chọn khách hàng
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="line mt-5"></div>
                    <div className='mt-5'>
                        <h1>THông tin khách hàng</h1>
                        <div className='row'>
                            <div className='col-6'></div>
                            <div className='col-6'>
                                <div className='bill-inf'>
                                    <div className='bill-name'>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductModal showModal={showModal} handleCloseModal={handleCloseModal} />

        </section>
    );
}

export default CreateBill;