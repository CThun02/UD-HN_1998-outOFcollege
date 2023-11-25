import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Input, Row, Select, Space, notification } from "antd";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import styles from "./FilterProductsDetails.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import FloatingLabels from "../FloatingLabels/FloatingLabels";
import { SearchOutlined } from "@ant-design/icons";

const baseUrl = "http://localhost:8080/api/client/product";
const baseUrlItem = "http://localhost:8080/api/admin";

function FilterProductsDetails({ setProductsDetails, productsId }) {
  //filter
  const [buttonsId, setButtonsId] = useState("all");
  const [materialsId, setMaterialsId] = useState("all");
  const [collarsId, setCollarsId] = useState("all");
  const [sleevesId, setSleevesId] = useState("all");
  const [shirtsTailsType, setShirtsTailsType] = useState("all");
  const [sizes, setSizes] = useState("all");
  const [colors, setColors] = useState("all");
  const [searchText, setSearchText] = useState(null);

  //get data components
  const [dataButtons, setDataButtons] = useState([]);
  const [dataMaterialsId, setDataMaterialsId] = useState([]);
  const [dataCollarsId, setDataCollarsId] = useState([]);
  const [dataSleevesId, setDataSleevesId] = useState([]);
  const [dataShirtsTailsType, setDataShirtsTailsType] = useState([]);
  const [dataSizes, setDataSizes] = useState([]);
  const [dataColors, setdataColors] = useState([]);
  const [apiNotification, contextHolder] = notification.useNotification();

  useEffect(() => {
    async function getButtons() {
      try {
        const res = await axios.get(baseUrlItem + "/button");
        const data = await res.data;
        setDataButtons(data);
      } catch (e) {
        const status = e?.response?.data?.status;
        if (status === 403) {
          apiNotification.error({
            message: "Lỗi",
            description: "Bạn không có quyền xem nội dung này",
          });
          return;
        }
      }
    }

    async function getMaterials() {
      try {
        const res = await axios.get(baseUrlItem + "/material");
        const data = await res.data;
        setDataMaterialsId(data);
      } catch (e) {
        const status = e?.response?.data?.status;
        if (status === 403) {
          apiNotification.error({
            message: "Lỗi",
            description: "Bạn không có quyền xem nội dung này",
          });
          return;
        }
      }
    }

    async function getCollars() {
      try {
        const res = await axios.get(baseUrlItem + "/collar");
        const data = await res.data;
        setDataCollarsId(data);
      } catch (e) {
        const status = e?.response?.data?.status;
        if (status === 403) {
          apiNotification.error({
            message: "Lỗi",
            description: "Bạn không có quyền xem nội dung này",
          });
          return;
        }
      }
    }

    async function getSleeves() {
      try {
        const res = await axios.get(baseUrlItem + "/sleeve");
        const data = await res.data;
        setDataSleevesId(data);
      } catch (e) {
        const status = e?.response?.data?.status;
        if (status === 403) {
          apiNotification.error({
            message: "Lỗi",
            description: "Bạn không có quyền xem nội dung này",
          });
          return;
        }
      }
    }

    async function getShirtTails() {
      try {
        const res = await axios.get(baseUrlItem + "/shirt-tail");
        const data = await res.data;
        setDataShirtsTailsType(data);
      } catch (e) {
        const status = e?.response?.data?.status;
        if (status === 403) {
          apiNotification.error({
            message: "Lỗi",
            description: "Bạn không có quyền xem nội dung này",
          });
          return;
        }
      }
    }

    async function getSizes() {
      try {
        const res = await axios.get(baseUrlItem + "/size");
        const data = await res.data;
        setDataSizes(data);
      } catch (e) {
        const status = e?.response?.data?.status;
        if (status === 403) {
          apiNotification.error({
            message: "Lỗi",
            description: "Bạn không có quyền xem nội dung này",
          });
          return;
        }
      }
    }

    async function getColors() {
      try {
        const res = await axios.get(baseUrlItem + "/color");
        const data = await res.data;
        setdataColors(data);
      } catch (e) {
        const status = e?.response?.data?.status;
        if (status === 403) {
          apiNotification.error({
            message: "Lỗi",
            description: "Bạn không có quyền xem nội dung này",
          });
          return;
        }
      }
    }

    return () => {
      getButtons();
      getMaterials();
      getCollars();
      getSleeves();
      getShirtTails();
      getSizes();
      getColors();
    };
  }, []);

  function changeData(value) {
    if (value === "all") {
      return null;
    } else {
      return value;
    }
  }

  useEffect(() => {
    console.log("data: ", productsId);
    async function filterListProductsDetails() {
      const filter = {
        idProducts: changeData(productsId),
        idButtons: changeData(buttonsId),
        idMaterials: changeData(materialsId),
        idCollars: changeData(collarsId),
        idSleeves: changeData(sleevesId),
        idShirtTails: changeData(shirtsTailsType),
        idSizes: changeData(sizes),
        idColors: changeData(colors),
        searchText: searchText,
      };

      try {
        const res = await axios.post(
          baseUrl + "/by-product-details-dto",
          filter
        );

        const data = await res.data;

        setProductsDetails(data);
        console.log("data: ", data);
      } catch (err) {
        const status = err?.response?.data?.status;
        if (status === 403) {
          apiNotification.error({
            message: "Lỗi",
            description: "Bạn không có quyền xem nội dung này",
          });
          return;
        }
      }
    }

    filterListProductsDetails();
  }, [
    searchText,
    productsId,
    buttonsId,
    materialsId,
    collarsId,
    sleevesId,
    shirtsTailsType,
    sizes,
    colors,
    setProductsDetails,
  ]);

  return (
    <div className={styles.filter}>
      <Space size={20} style={{ width: "100%" }} direction="vertical">
        <Row>
          <Space size={10} className={styles.color}>
            <i>
              <FontAwesomeIcon icon={faFilter} />
            </i>

            <h2>Thêm sản phẩm</h2>
          </Space>
        </Row>

        <Row>
          <Col span={5}>
            <Input
              className={styles.input}
              size="large"
              placeholder="Nhập tên hoặc mã"
              prefix={<SearchOutlined />}
              width={"20%"}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>

          <Col span={1} />
          <Col span={5}>
            <Space style={{ width: "100%" }} direction="vertical">
              <FloatingLabels label="Cúc áo" name="buttonsId" value={buttonsId}>
                <Select
                  className={styles.selectedItem}
                  size="large"
                  placeholder={null}
                  onChange={(e) => setButtonsId(e)}
                  style={{ width: "100%" }}
                  value={buttonsId}
                  options={[
                    { label: "Tất cả", value: "all" },
                    ...dataButtons.map((e) => ({
                      label: e.buttonName,
                      value: e.id,
                    })),
                  ]}
                />
              </FloatingLabels>
            </Space>
          </Col>

          <Col span={1} />
          <Col span={5}>
            <Space style={{ width: "100%" }} direction="vertical">
              <FloatingLabels
                label="Chất liệu"
                name="materialsId"
                value={materialsId}
              >
                <Select
                  className={styles.selectedItem}
                  size="large"
                  placeholder={null}
                  onChange={(e) => setMaterialsId(e)}
                  value={materialsId}
                  style={{ width: "100%" }}
                  options={[
                    { label: "Tất cả", value: "all" },
                    ...dataMaterialsId.map((e) => ({
                      label: e.materialName,
                      value: e.id,
                    })),
                  ]}
                />
              </FloatingLabels>
            </Space>
          </Col>

          <Col span={1} />
          <Col span={5}>
            <Space style={{ width: "100%" }} direction="vertical">
              <FloatingLabels label="Cổ áo" name="collarsId" value={collarsId}>
                <Select
                  className={styles.selectedItem}
                  size="large"
                  placeholder={null}
                  onChange={(e) => setCollarsId(e)}
                  value={collarsId}
                  style={{ width: "100%" }}
                  options={[
                    { label: "Tất cả", value: "all" },
                    ...dataCollarsId.map((e) => ({
                      label: e.collarTypeName,
                      value: e.id,
                    })),
                  ]}
                />
              </FloatingLabels>
            </Space>
          </Col>
        </Row>

        <Row>
          <Col span={5}>
            <Space style={{ width: "100%" }} direction="vertical">
              <FloatingLabels label="Tay áo" name="sleevesId" value={sleevesId}>
                <Select
                  className={styles.selectedItem}
                  size="large"
                  placeholder={null}
                  onChange={(e) => setSleevesId(e)}
                  value={sleevesId}
                  style={{ width: "100%" }}
                  options={[
                    { label: "Tất cả", value: "all" },
                    ...dataSleevesId.map((e) => ({
                      label: e.sleeveName,
                      value: e.id,
                    })),
                  ]}
                />
              </FloatingLabels>
            </Space>
          </Col>

          <Col span={1} />
          <Col span={5}>
            <Space style={{ width: "100%" }} direction="vertical">
              <FloatingLabels
                label="Đuôi áo"
                name="shirtsTailsType"
                value={shirtsTailsType}
              >
                <Select
                  className={styles.selectedItem}
                  size="large"
                  placeholder={null}
                  onChange={(e) => setShirtsTailsType(e)}
                  value={shirtsTailsType}
                  style={{ width: "100%" }}
                  options={[
                    { label: "Tất cả", value: "all" },
                    ...dataShirtsTailsType.map((e) => ({
                      label: e.shirtTailTypeName,
                      value: e.id,
                    })),
                  ]}
                />
              </FloatingLabels>
            </Space>
          </Col>

          <Col span={1} />
          <Col span={5}>
            <Space style={{ width: "100%" }} direction="vertical">
              <FloatingLabels label="Kích cỡ" name="sizes" value={sizes}>
                <Select
                  className={styles.selectedItem}
                  size="large"
                  placeholder={null}
                  onChange={(e) => setSizes(e)}
                  value={sizes}
                  style={{ width: "100%" }}
                  options={[
                    { label: "Tất cả", value: "all" },
                    ...dataSizes.map((e) => ({
                      label: e.sizeName,
                      value: e.id,
                    })),
                  ]}
                />
              </FloatingLabels>
            </Space>
          </Col>

          <Col span={1} />
          <Col span={5}>
            <Space style={{ width: "100%" }} direction="vertical">
              <FloatingLabels label="Màu sắc" name="colors" value={colors}>
                <Select
                  className={styles.selectedItem}
                  size="large"
                  placeholder={null}
                  onChange={(e) => setColors(e)}
                  value={colors}
                  style={{ width: "100%" }}
                  options={[
                    { label: "Tất cả", value: "all" },
                    ...dataColors.map((e) => ({
                      label: e.colorName,
                      value: e.id,
                    })),
                  ]}
                />
              </FloatingLabels>
            </Space>
          </Col>
        </Row>
      </Space>
    </div>
  );
}

export default FilterProductsDetails;
