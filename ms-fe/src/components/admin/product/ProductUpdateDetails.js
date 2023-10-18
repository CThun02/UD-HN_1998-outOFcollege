import { useParams } from "react-router-dom";

const ProductUpdateDetails = () => {
  const api = "http://localhost:8080/api/admin/";
  const { productId } = useParams();
  return <>Update</>;
};

export default ProductUpdateDetails;
