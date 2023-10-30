import { Checkbox, Divider, Space } from "antd";
import styles from "./ComponentsFilter.module.css";

function ComponentsFilter({ title, options, setValue, value }) {
  return (
    <>
      <Divider className={styles.divider} />
      <div className={styles.content}>
        <div className={styles.title}>
          <Space style={{ width: "100%" }} direction="vertical" size={10}>
            <h3 className={`${styles.textSize} ${styles.textColor}`}>
              {title}
            </h3>
            <div className={styles.radio}>
              <Checkbox.Group
                options={options}
                onChange={(e) => setValue(e)}
                value={value}
                className={styles.radioGroup}
              />
            </div>
          </Space>
        </div>
      </div>
    </>
  );
}

export default ComponentsFilter;
