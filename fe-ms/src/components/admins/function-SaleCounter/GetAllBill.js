import React, { useEffect, useState } from 'react'
import './css/style.css'
import { Link } from "react-router-dom";
import { getAll, createCart } from './service';

const GetAllBill = () => {
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        getAll(0)
            .then((response) => {
                setCartData(response.data.content);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <section className="full-screen-bg">
            <div className='mt-5 container-color'>
                <div className="row mb-5">
                    <div className="col-6">
                        <input placeholder='search' className='form-control w-50' type='search' />
                    </div>
                    <div className="col-6">
                        <div className="d-flex justify-content-end">
                            <Link to="/controller/v1/admin/create-bill" className="btn btn-primary">Tạo hóa đơn</Link>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Số sản phẩm</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col">Ngày tạo</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartData.map((item, index) => (
                            <tr key={item.cartId}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.quantity}</td>
                                <td>{item.productDetailName}</td>
                                <td>{item.price}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button className='btn btn-primary'>chỉnh sửa</button>|
                                    <button className='btn btn-warning'>xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default GetAllBill;