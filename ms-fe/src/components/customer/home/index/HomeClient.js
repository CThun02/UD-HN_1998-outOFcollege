import { useState } from "react";
import Banner from "../banner/Banner";
import Slider from "../slider/Slider";
import TypeCategory from "../type-category/TypeCategory";
import ImageTree from "../image/ImageTree";
import FirstPayBill from "../fisrt-pay/FirstPayBill";
import BestSellingAndNewProduct from "../best-selling-and-new-product/BestSellingProduct";

function HomeClient() {
  const [bestSellings, setBestSellings] = useState([]);
  const [newProduces, setNewProducts] = useState([]);

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
    </div>
  );
}

export default HomeClient;
