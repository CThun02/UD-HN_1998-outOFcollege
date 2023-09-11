import { faPlus, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Promition.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ListDiscount from "./ListDiscount";
import Discount from "./Discount";
import DiscountCreate from "./DiscountCreate";

const urlBase = "http://localhost:8080/admin/api/promition";

function Promition() {
  const [discounts, setDiscounts] = useState([]);
  const [isDisplayCreate, setIsDisplayCreate] = useState(false);

  useEffect(function () {
    async function getDiscounts() {
      try {
        const res = await axios.get(urlBase + "/");
        const data = await res.data;

        setDiscounts(data.content === null ? null : data.content);
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        console.log("clean");
      }
    }

    getDiscounts();
  }, []);

  return (
    <>
      <div className={styles.promition}>
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <input type="text" placeholder="Tên chương trình..." />
              <button className={`btn btn-primary `}>Tìm kiếm</button>
              <button className={`btn btn-warning `}>
                <FontAwesomeIcon icon={faRotate} />
              </button>
              <button
                className={`btn btn-primary`}
                onClick={() => setIsDisplayCreate(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                Tạo chương trình
              </button>
            </div>

            <div className={`${styles.headerRight}`}>
              <div className={`${styles.status}`}>
                <label className={`${styles.editLabel}`}>Trạng thái</label>
                <select id="status">
                  <option>Tất cả</option>
                  <option>Đang kích hoạt</option>
                  <option>Hết hạn</option>
                  <option>Chuẩn bị diễn ra</option>
                  <option>Chuẩn bị kết thúc</option>
                </select>
              </div>

              <div className={`${styles.type}`}>
                <label className={`${styles.editLabel}`}>
                  Loại chương trình
                </label>
                <select id="type">
                  <option>Tất cả</option>
                  <option>Giảm theo hóa đơn</option>
                  <option>Giảm theo sản phẩm</option>
                </select>
              </div>

              <div className={`${styles.reduce}`}>
                <label className={`${styles.editLabel}`}>Giá trị giảm</label>
                <select id="reduce">
                  <option>Tất cả</option>
                  <option>Phần trăm</option>
                  <option>Giá sản phẩm</option>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <ListDiscount>
              {discounts.map((discount) => (
                <Discount data={discount} key={discount.id} />
              ))}
            </ListDiscount>
          </div>
          <div className={styles.footer}>
            <div className={`${styles.footerRight}`}>
              <label>
                <strong>Số bản ghi</strong>: 5
              </label>
              <label>
                <strong>Hiển thị</strong>:
              </label>
              <select>
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
          </div>
        </div>
        {isDisplayCreate ? (
          <DiscountCreate setIsDisplay={setIsDisplayCreate} />
        ) : null}
      </div>
    </>
  );
}

export default Promition;
