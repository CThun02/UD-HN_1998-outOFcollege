/* eslint-disable jsx-a11y/alt-text */
import styles from "./ProductAdmin.module.css";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
function ProductAdminImage() {
  const [fileNames, setFileNames] = useState([]);
  const { productId } = useParams();
  const [render, renderChange] = useState(null);
  const apiFile = "http://localhost:8080/admin/api/product/files/";
  const url = function url(fileName) {
    return apiFile + productId + "/" + fileName;
  };
  function upload(files) {
    console.log(files);
    var form = new FormData();
    for (let index = 0; index < files.length; index++) {
      form.append("files", files[index]);
    }
    axios
      .post(apiFile + productId, form, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        setFileNames((prevFileNames) => [...prevFileNames, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function deleteImg(fileName) {
    axios
      .delete(apiFile + productId + "/" + fileName)
      .then((response) => {
        renderChange(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    axios
      .get(apiFile + productId)
      .then((response) => {
        setFileNames(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [productId, render]);
  return (
    <div className={`${styles.radiusFrame} mt-5 col-lg-10 offset-md-1`}>
      <h1 className="text-center p-5">Thêm ảnh sản phẩm</h1>
      <div className="p-5">
        <div className="row">
          {fileNames &&
            fileNames.map((fileName) => {
              return (
                <div className="col-3">
                  <div className=" position-relative">
                    <Link
                      to="#"
                      className={`link-dark position-absolute me-2 end-0 ${styles.btnClose}`}
                    >
                      <FontAwesomeIcon
                        icon={faClose}
                        cursor={"pointer"}
                        onClick={() => deleteImg(fileName)}
                      ></FontAwesomeIcon>
                    </Link>
                    <img src={url(fileName)} className={styles.imgProduct} />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="text-center mt-5">
          <label htmlFor="imageInput" className={styles.uploadLabel}>
            <input
              type="file"
              id="imageInput"
              onChange={(event) => upload(event.target.files)}
              className={styles.inputFile}
              multiple
            />
            <FontAwesomeIcon
              icon={faPlus}
              className={styles.btnUploadImg}
              cursor={"pointer"}
            ></FontAwesomeIcon>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ProductAdminImage;
