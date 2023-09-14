import FloatingLabels from "../../element/FloatingLabels/FloatingLabels";
import { Form, Input } from "antd";

import styles from "./CreateVoucher.module.css";

function CreateVoucher() {
  return (
    <div className={styles.createVoucher}>
      <Form>
        <FloatingLabels label="Last Name" name="lastName">
          <Input size="large" />
        </FloatingLabels>
      </Form>
    </div>
  );
}

export default CreateVoucher;
