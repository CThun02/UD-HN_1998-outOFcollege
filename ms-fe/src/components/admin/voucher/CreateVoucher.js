import styles from "./CreateVoucher.module.css";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function CreateVoucher() {
  return (
    <div className={styles.createVoucher}>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
    </div>
  );
}

export default CreateVoucher;
