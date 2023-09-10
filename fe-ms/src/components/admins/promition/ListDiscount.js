import styles from "./ListDiscount.module.css";

function ListDiscount({ children }) {
  return (
    <table className={` ${styles.tableEdit}`}>
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
      <tbody>{children}</tbody>
    </table>
  );
}

export default ListDiscount;
