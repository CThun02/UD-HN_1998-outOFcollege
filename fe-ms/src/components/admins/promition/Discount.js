import styles from "./Discount.module.css";

function Discount({ data }) {
  const {
    id,
    discountCode,
    discountName,
    startDate,
    endDate,
    discountValue,
    discountMaxValue,
    discountMethod,
    discountCondition,
    status,
  } = data;

  return (
    <tr className={styles.trow}>
      <th scope="row">1</th>
      <td>{discountName}</td>
      <td>
        {discountValue} {`${discountMethod === "Money" ? "vnd" : "%"}`}
      </td>
      <td>
        {discountMaxValue} {`${discountMethod === "Money" ? "vnd" : "%"}`}
      </td>
      <td>{discountCondition}</td>
      <td>{discountMethod}</td>
      <td>
        {startDate} - {endDate}
      </td>
      <td>{`${status === "ACTIVE" ? "Kích hoạt" : "Hủy kích hoạt"}`}</td>
      <td>edit</td>
    </tr>
  );
}

export default Discount;
