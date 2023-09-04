import React from 'react';

const ProductModal = ({ showModal, handleCloseModal }) => {

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="modal-wrapper">
            {showModal && (
                <div className="modal-background" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={handleModalClick} >
                        <div className='model-header'>
                            <div className='modal-title'>Tìm kiếm sản phẩm</div>
                            <div className='row mh-content'>
                                <div className='col-6'>
                                    <input className='form-control ' placeholder='Tìm kiếm' />
                                </div>
                                <div className='col-2'>
                                    <button className='btn btn-primary'>Tìm kiếm</button>
                                </div>
                                <div className='col-3'>
                                    <button className='btn btn-warning'>Làm mới</button>
                                </div>
                            </div>
                            <div class="row select">
                                <div class="col-auto">
                                    <select class="form-select custom-select">
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                                <div class="col-auto">
                                    <select class="form-select custom-select">
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                                <div class="col-auto">
                                    <select class="form-select">
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                                <div class="col-auto">
                                    <select class="form-select">
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                                <div class="col-auto">
                                    <select class="form-select">
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <table className="table table-wrapper">
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
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ảnh tên</td>
                                    <td>số lượng</td>
                                    <td>Tổng tiền</td>
                                    <td>Thao tác</td>
                                </tr>
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
                </div>
            )}
        </div>
    );
};

export default ProductModal;