import { useEffect, useState } from "react";
import Banner from "../banner/Banner";
import Slider from "../slider/Slider";
import TypeCategory from "../type-category/TypeCategory";
import ImageTree from "../image/ImageTree";
import FirstPayBill from "../fisrt-pay/FirstPayBill";
import BestSellingAndNewProduct from "../best-selling-and-new-product/BestSellingProduct";
import { FloatButton } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

const baseUrl = "http://localhost:8080/api/admin/product";

function HomeClient() {
  const [bestSellings, setBestSellings] = useState([]);
  const [newProducs, setNewProducts] = useState([]);

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

    getBestSellings();
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

    getNewProduct();
  }, []);

  function handleScrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Slider />
      <Banner />
      <BestSellingAndNewProduct
        arrays={bestSellings}
        title={"Best Selling Products"}
      />
      <ImageTree />
      <TypeCategory />
      <FirstPayBill />
      <BestSellingAndNewProduct arrays={newProducs} title={"New Products"} />
      <Link to={"/ms-shop/home"}>
        <FloatButton
          onClick={handleScrollTop}
          tooltip={<div>Back to top</div>}
          icon={<ArrowUpOutlined />}
        />
      </Link>
    </div>
  );
}

export default HomeClient;
