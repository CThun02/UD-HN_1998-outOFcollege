import React, { useEffect, useState } from "react";
import ButtonCRUD from "../button-crud/ButtonCRUD";
import { Link } from "react-router-dom";

export default function AccountForm() {
  return (
    <div className="container">
      <table className="table mt-5 text-center align-self-center">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Tên khách hàng</th>
            <th scope="col">Giới tính</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {/* {products &&
          products.map((item) => {
            return (
              <tr key={item.productDetailId}>
                <th scope="row">1</th>
                <td>
                  <img
                    alt="Tạm thời chưa có gì"
                    src=""
                    className={`d-inline-block ${styles.imgTable}`}
                  ></img>
                </td>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    type="submit"
                    className={`${
                      item.status === "Active"
                        ? styles.btnStatusActive
                        : styles.btnStatusUnActive
                    } pt-1 pb-1 ps-2 pe-2`}
                  >
                    {item.status === "Active"
                      ? "Kinh Doanh"
                      : "Ngừng kinh doanh"}
                  </button>
                </td>
                <td>
                  <Link
                    to={`/controller/v1/admin/product/update/${item.productDetailId}`}
                  >
                    <ButtonCRUD icon={faPencilAlt} className={styles.btnRUD} />
                  </Link>
                  <Link to="/controller/v1/admin/product/update">
                    <ButtonCRUD icon={faTrash} className={styles.btnRUD} />
                  </Link>
                  <Link to="/controller/v1/admin/product/update">
                    <ButtonCRUD icon={faEye} className={styles.btnRUD} />
                  </Link>
                </td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
}
