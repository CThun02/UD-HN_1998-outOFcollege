import styles from "./ListDiscount.module.css";

function ListDiscount({ children }) {
  return (
    <table className={` ${styles.tableEdit}`}>
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên sản phẩm</th>
          <th scope="col"></th>
          <th scope="col">Giảm tối đa</th>
          <th scope="col">Điều kiện</th>
          <th scope="col">Áp dụng</th>
          <th scope="col">Hình thức</th>
          <th scope="col">Thời gian</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </table>
  );
}

export default ListDiscount;
