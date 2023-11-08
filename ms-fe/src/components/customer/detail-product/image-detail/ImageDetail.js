import { Carousel } from "antd";

function ImageDetail({ paths }) {
  return (
    <>
      <Carousel autoplay>
        {paths?.map((item) => (
          <img src={item.path} alt="product" key={item.id} />
        ))}
      </Carousel>
    </>
  );
}

export default ImageDetail;
