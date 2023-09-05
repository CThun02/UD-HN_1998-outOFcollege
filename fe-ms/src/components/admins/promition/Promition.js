import { faPlus, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Promition.module.css";

function Promition() {
  return (
    <div className={styles.promition}>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <input type="text" placeholder="Tên chương trình..." />
            <button className={`btn btn-primary `}>Tìm kiếm</button>
            <button className={`btn btn-warning `}>
              <FontAwesomeIcon icon={faRotate} />
            </button>
            <button className={`btn btn-primary`}>
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
              <label className={`${styles.editLabel}`}>Loại chương trình</label>
              <select id="type">
                <option>Giảm theo hóa đơn</option>
                <option>Giảm theo sản phẩm</option>
              </select>
            </div>

            <div className={`${styles.reduce}`}>
              <label className={`${styles.editLabel}`}>Giá trị giảm</label>
              <select id="reduce">
                <option>Phần trăm</option>
                <option>Giá sản phẩm</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <table className={`table ${styles.tableEdit}`}>
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên chương trình</th>
                <th scope="col">Giá trị giảm</th>
                <th scope="col">Giảm tối đa</th>
                <th scope="col">Điều kiện</th>
                <th scope="col">Hình thức</th>
                <th scope="col">Thời gian</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Chuong trinh 1</td>
                <td>Noel</td>
                <td>5%</td>
                <td>Đơn hàng trên 1 triệu</td>
                <td>Hóa đơn</td>
                <td>08/08/2023 - 12/08/2023</td>
                <td>Kích hoạt</td>
                <td>edit</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Chuong trinh 2</td>
                <td>Noel</td>
                <td>5%</td>
                <td>Đơn hàng trên 1 triệu</td>
                <td>Hóa đơn</td>
                <td>08/08/2023 - 12/08/2023</td>
                <td>Kích hoạt</td>
                <td>edit</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Chuong trinh 3</td>
                <td>Noel</td>
                <td>5%</td>
                <td>Đơn hàng trên 1 triệu</td>
                <td>Hóa đơn</td>
                <td>08/08/2023 - 12/08/2023</td>
                <td>Kích hoạt</td>
                <td>edit</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Chuong trinh 4</td>
                <td>Noel</td>
                <td>5%</td>
                <td>Đơn hàng trên 1 triệu</td>
                <td>Hóa đơn</td>
                <td>08/08/2023 - 12/08/2023</td>
                <td>Kích hoạt</td>
                <td>edit</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Chuong trinh 5</td>
                <td>Noel</td>
                <td>5%</td>
                <td>Đơn hàng trên 1 triệu</td>
                <td>Hóa đơn</td>
                <td>08/08/2023 - 12/08/2023</td>
                <td>Kích hoạt</td>
                <td>edit</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.footer}>
          <div className={`${styles.footerRight}`}>
            <label>
              <strong>Tổng cộng</strong>: 5
            </label>
            <label>
              <strong>Số bản ghi</strong>:
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
    </div>
  );
}

export default Promition;
