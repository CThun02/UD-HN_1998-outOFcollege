import React from 'react'
import './css/style.css'
const GetAllBill = () => {

    return (
        <section className="full-screen-bg">
            <div className='mt-5 container-color'>
                <div className="row mb-5">
                    <div className="col-6">
                        <input placeholder='search' className='form-control w-50' />
                    </div>
                    <div className="col-6">
                        <div className="d-flex justify-content-end">
                            <a href="/create-bill" className="btn btn-primary">Tạo hóa đơn</a>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col">Ngày tạo</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>ảnh</td>
                            <td>tên</td>
                            <td>giá</td>
                            <td>số lượng</td>
                            <td>Tổng tiền</td>
                            <td>Ngày tạo</td>
                            <td>Thao tác</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default GetAllBill
