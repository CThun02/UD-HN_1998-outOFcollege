import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProductAdmin.module.css";

function ProductSizeColorAdminCreate(props) {
  var detailcolorsize = props.productDetailColorSizeDetail;

  //funciotn
  function closeTab() {
    document.getElementById("sizeColorDetailFrame").classList.add("d-none");
  }
  return (
    <div id="sizeColorDetailFrame" className="d-none">
      <div className={`${styles.maxWH}`}>
        <div
          style={{ height: "100vh" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div
            className={`col-5 ${styles.radiusFrame} ${styles.sizeColorFrame}`}
          >
            <div className="p-5">
              <div className="text-end">
                <FontAwesomeIcon
                  className={`link-dark ${styles.btnClose}`}
                  icon={faClose}
                  onClick={closeTab}
                ></FontAwesomeIcon>
              </div>
              <h3>Kích cỡ</h3>
              <h4>{detailcolorsize.sizeName}</h4>
              <table
                id={`size${detailcolorsize.sizeId}`}
                className={`table text-center align-self-center ${styles.idsize}`}
              >
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Màu sắc</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {detailcolorsize.listColor &&
                    detailcolorsize.listColor.map((color, index) => {
                      return (
                        <tr key={color.id} className={`size${color.colorId}`}>
                          <td>{index + 1}</td>
                          <td>
                            <div
                              className={`${styles.colorDisplay} d-inline-block`}
                              style={{
                                backgroundColor: color.colorId,
                              }}
                            ></div>
                          </td>
                          <td>
                            <ul className={`p-0 ${styles.pagination}`}>
                              <li className={`${styles.pageNumber} ps-5 pe-5`}>
                                {color.quantity}
                              </li>
                            </ul>
                          </td>
                          <td>
                            <ul className={`p-0 ${styles.pagination}`}>
                              <li className={`${styles.pageNumber} ps-5 pe-5`}>
                                {color.price}
                              </li>
                            </ul>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSizeColorAdminCreate;
