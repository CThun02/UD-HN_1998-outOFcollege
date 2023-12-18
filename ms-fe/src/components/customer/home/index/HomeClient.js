import { useContext, useEffect, useState } from "react";
import Banner from "../banner/Banner";
import Slider from "../slider/Slider";
import TypeCategory from "../type-category/TypeCategory";
import ImageTree from "../image/ImageTree";
import FirstPayBill from "../fisrt-pay/FirstPayBill";
import BestSellingAndNewProduct from "../best-selling-and-new-product/BestSellingProduct";
import { FloatButton, notification } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { NotificationContext } from "../../../element/notification/NotificationAuthen";
import SockJs from "../../../../service/SockJs";

const baseUrl = "http://localhost:8080/api/client/product";

function HomeClient() {
  const { code } = useParams();
  const [bestSellings, setBestSellings] = useState([]);
  const [newProducs, setNewProducts] = useState([]);
  const [apiNotification, contextHolder] = notification.useNotification();
  const { successMessage, clearNotification, context } =
    useContext(NotificationContext);

  useEffect(
    function () {
      let isCheck = true;
      async function notification() {
        if (successMessage !== "" && isCheck === true && context === "login") {
          apiNotification.success({
            message: `Success`,
            description: `${successMessage}`,
          });
          clearNotification();
        }
      }

      return () => {
        notification(true);
        isCheck = false;
      };
    },
    [successMessage, clearNotification, apiNotification, context]
  );

  useEffect(() => {
    async function getBestSellings() {
      try {
        const res = await axios.get(baseUrl + "/best-selling");
        const data = await res.data;
        console.log("data: ", data);
        setBestSellings(data);
      } catch (err) {
        console.log(err);
      }
    }

    return () => getBestSellings();
  }, []);

  useEffect(() => {
    async function getNewProduct() {
      try {
        const res = await axios.get(baseUrl + "/new-product");
        const data = await res.data;

        console.log("data: ", data);
        setNewProducts(data);
      } catch (err) {
        console.log(err);
      }
    }

    return () => getNewProduct();
  }, []);

  function handleScrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <SockJs
        setValues={setBestSellings}
        connectTo={"bestSellingProduct-topic"}
      />
      <SockJs setValues={setNewProducts} connectTo={"newProduct-topic"} />
      {contextHolder}
      <Slider />
      <Banner />
      <BestSellingAndNewProduct
        arrays={bestSellings}
        title={"Sản phẩm bán chạy nhất"}
      />
      <ImageTree />
      <TypeCategory />
      <FirstPayBill />
      <BestSellingAndNewProduct
        arrays={newProducs}
        title={"Sản phẩm mới nhất"}
      />
      <Link to={"/ms-shop/home"}>
        <FloatButton
          onClick={handleScrollTop}
          tooltip={<div>Kéo lên</div>}
          icon={<ArrowUpOutlined />}
        />
      </Link>
    </div>
  );
}

export default HomeClient;
