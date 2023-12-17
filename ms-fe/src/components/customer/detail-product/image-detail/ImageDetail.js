import { Carousel } from "antd";

function ImageDetail({ paths }) {
  return (
    <>
      <Carousel  style={{maxWidth:"300px"}} autoplay>
        {paths?.map((item) => (
          <img src={item.path} alt="product" key={item.id} />
        ))}
      </Carousel>
    </>
  );
}

export default ImageDetail;
