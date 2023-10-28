import { useState } from "react";
import Banner from "../banner/Banner";
import Slider from "../slider/Slider";
import TypeCategory from "../type-category/TypeCategory";
import ImageTree from "../image/ImageTree";
import FirstPayBill from "../fisrt-pay/FirstPayBill";
import BestSellingAndNewProduct from "../best-selling-and-new-product/BestSellingProduct";
import { FloatButton } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function HomeClient() {
  const [bestSellings, setBestSellings] = useState([]);
  const [newProduces, setNewProducts] = useState([]);

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
        data={bestSellings}
        title={"Best Selling Products"}
      />
      <ImageTree />
      <TypeCategory />
      <FirstPayBill />
      <BestSellingAndNewProduct data={newProduces} title={"New Products"} />
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
