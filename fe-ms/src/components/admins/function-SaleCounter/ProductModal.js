import React from 'react';

const ProductModal = ({ showModal, handleCloseModal }) => {

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="modal-wrapper">
            {showModal && (
                <div className="modal-background" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={handleModalClick}>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductModal;