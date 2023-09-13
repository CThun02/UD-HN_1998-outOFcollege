import styles from "./AccountAdmin.module.css";
import ButtonCRUD from "../button-crud/ButtonCRUD";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  faEye,
  faMinus,
  faPencilAlt,
  faPlus,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "antd/dist/antd.css";
function AccountAdminCustomerTable() {
  const api = "http://localhost:8080/account/api/view";
  const [customer, customerChange] = useState(null);
  const [page, pageChange] = useState(0);
  const [pageNumberToTal, pageNumberToTalChange] = useState(0);

  const next = function () {
    if (page >= pageNumberToTal - 1) {
      pageChange(0);
    } else {
      pageChange(page + 1);
    }
  };

  const prev = function () {
    if (page <= 0) {
      pageChange(pageNumberToTal - 1);
    } else {
      pageChange(page - 1);
    }
  };

  useEffect(() => {
    axios
      .get(api + "/data?page=" + page)
      .then((response) => {
        customerChange(response.data);
      })
      .catch((error) => {
        console.warn(error.message);
      });
    axios
      .get(api + "/total")
      .then((response) => {
        pageNumberToTalChange(response.data);
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }, [page]);

  return (
    <div>
      <table className="table mt-5 text-center align-self-center">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Tên Khách hàng</th>
            <th scope="col">Giới tính</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {customer &&
            customer.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      alt="Chua co gi"
                      src=""
                      className={`d-inline-block ${styles.imgTable}`}
                    ></img>
                  </td>
                  <td>{item.fullName}</td>
                  <td>{item.gender}</td>
                  <td>{item.createAt}</td>
                  <td>
                    <button
                      type="submit"
                      className={`${
                        item.status === "Active"
                          ? styles.btnStatusActive
                          : styles.btnStatusUnactive
                      } pt-1 pb-1 ps-2 pe-2`}
                    >
                      {item.status === "Active"
                        ? "Kích Hoạt"
                        : "Ngừng Kích Hoạt"}
                    </button>
                  </td>
                  <td>
                    <Link to={`/controller/v1/admin/account/update/${item.id}`}>
                      <ButtonCRUD
                        icon={faPencilAlt}
                        className={styles.btnCRUD}
                      />
                    </Link>
                    <Link to="/controller/v1/admin/product/update">
                      <ButtonCRUD icon={faTrash} className={styles.btnCRUD} />
                    </Link>
                    <Link to="/controller/v1/admin/product/update">
                      <ButtonCRUD icon={faEye} className={styles.btnCRUD} />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="col-12">
        <Link to="/controller/v1/admin/customer/create">
          <ButtonCRUD className={styles.btnCreate} icon={faPlus} />
        </Link>
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <ul className={`p-0 ${styles.pagination}`}>
                <li>
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="ps-2"
                    onClick={prev}
                  ></FontAwesomeIcon>
                </li>
                <li className={styles.pageNumber}>
                  <input
                    type={"text"}
                    className="text-center"
                    value={page + 1}
                    onChange={(event) => {
                      pageChange(event.target.value);
                    }}
                  />
                </li>
                <li>
                  <FontAwesomeIcon
                    onClick={next}
                    icon={faPlus}
                    className="pe-2"
                  ></FontAwesomeIcon>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountAdminCustomerTable;
